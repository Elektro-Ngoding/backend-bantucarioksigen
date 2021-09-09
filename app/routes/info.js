const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/list-resiko", async (req, res) => {
  try {
    const data = await axios
      .get(
        `http://inarisk2.bnpb.go.id/api/get-list-risiko/${req.body.latitude}/${req.body.longitude}`
      )
      .then((result) => {
        res.json(result.data);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
