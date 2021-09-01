const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const { registerValidation } = require("../../configs/validation");
const {
  loginValidate,
  loginValidateRole,
} = require("../../configs/validation");
const bcrypt = require("bcrypt");

const AdminModel = require("../../models/AdminModel");
const OksigenModel = require("../../models/OksigenModel");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error)
    return res.status(400).json({
      message: error.detail[0].message,
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const dataAdminRegister = new AdminModel({
      id_mitra: req.body.id_mitra,
      username: req.body.username,
      password: hashPassword,
      role: req.body.role,
      verify: req.body.verify,
    });

    try {
      const dataAdmin = await dataAdminRegister.save();
      res.json(dataAdmin);
    } catch (error) {
      res.json([{ mesagge: error }]);
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error)
    return res.json({
      status: 400,
      message: error.detail[0].mesagge,
    });

  const user = await AdminModel.findOne({ username: req.body.username });

  if (!user)
    return res.json({
      status: 400,
      message: "username not found",
    });

  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd)
    return res.json({
      status: 400,
      message: "password anda salah",
    });
  const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_KEY);
  {
    req.body.remember
      ? //save expires 1 mounth
        res
          .cookie(
            "user",
            { token: token, id_mitra: user.id_mitra, role: user.role },
            {
              httpOnly: true,
              expires: new Date(Date.now() + 2304000 * 1000),
            }
          )
          .status(200)
          .json({
            role: user.role,
            verify: user.verify,
            status: 200,
            id_mitra: user.id_mitra,
          })
      : //save session
        res
          .cookie(
            "user",
            { token: token, id_mitra: user.id_mitra, role: user.role },
            {
              httpOnly: true,
              expires: new Date(Date.now() + 1800 * 1000),
            }
          )
          .status(200)
          .json({
            role: user.role,
            verify: user.verify,
            status: 200,
            id_mitra: user.id_mitra,
          });
  }
});

router.get("/logout", async (req, res) => {
  res
    .cookie("user", "none", {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 1000),
    })
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

router.get("/getMitra/:id", async (req, res) => {
  try {
    const dataMitraDetail = await AdminModel.findOne({
      id_mitra: req.params.id,
    });
    res.json(dataMitraDetail);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleteMitra = await AdminModel.deleteOne({
      id_mitra: req.params.id,
    });
    res.json(deleteMitra);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.put("/updateMitra/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateMitra = await AdminModel.findByIdAndUpdate(_id, req.body);
    res.json({
      status: updateMitra.status,
      message: "updateSuccess",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.put("/updatePasswordMitra/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const updateMitra = await AdminModel.findByIdAndUpdate(_id, {
      password: hashPassword,
    });

    res.json({
      status: updateMitra.status,
      message: "Success Change Password",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;
