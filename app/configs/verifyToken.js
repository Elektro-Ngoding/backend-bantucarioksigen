const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  const token = req.header("token");
  const id = req.header("user");
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
