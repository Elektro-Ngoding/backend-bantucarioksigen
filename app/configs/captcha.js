require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/", async (req, res) => {
  const secret = process.env.SECRET_KEY_CAPTCHA;
  const response = req.body.token;
  const ip = req.body.ip;
  const verify = await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}&remoteip=${ip}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      }
    )
    .then((data) => {
      res.json(data.data);
    })
    .catch((err) => {
      res.json({
        message: err.data,
      });
    });
});

module.exports = router;
