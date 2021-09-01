const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  const token = req.cookies.user.token;
  const id_mitra = req.cookies.user.id_mitra;
  const role = req.cookies.user.role;
  if (!token)
    return res.json({
      status: 404,
      message: "acces denied",
    });
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    res.json({
      userLogIn: true,
      userId: verified._id,
      id_mitra: id_mitra,
      role: role,
      iat: verified.iat,
    });
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "invalid Token",
    });
  }
});
module.exports = router;
