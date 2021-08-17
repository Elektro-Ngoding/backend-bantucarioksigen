const express = require("express");
const router = express.Router();
const OksigenModel = require("../models/OksigenModel");
const bcrypt = require("bcrypt");
const verifyToken = require("../configs/verifyToken");

router.post("/", async (req, res) => {
  const dataOksigen = new OksigenModel({
    _id: req.body._id,
    namaToko: req.body.namaToko,
    status: req.body.status,
    data: {
      provinsi: req.body.data.provinsi,
      kota: req.body.data.kota,
      alamat: req.body.data.alamat,
      kontak: req.body.data.kontak,
      statusBuka: req.body.data.statusBuka,
      stokBarang: req.body.data.stokBarang,
      antrian: req.body.data.antrian,
      waktuBuka: req.body.data.waktuBuka,
      waktuTutup: req.body.data.waktuTutup,
    },
  });

  try {
    const dataOksigenPost = await dataOksigen.save();
    res.json({
      status: 200,
      message: "success add mitra",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const dataOksigenGet = await OksigenModel.find();
    res.json(dataOksigenGet);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dataOksigenUpdate = await OksigenModel.updateOne({
      namaToko: req.body.namaToko,
      status: req.body.status,
      data: {
        provinsi: req.body.data.provinsi,
        kota: req.body.data.kota,
        alamat: req.body.data.alamat,
        kontak: req.body.data.kontak,
        statusBuka: req.body.data.statusBuka,
        stokBarang: req.body.data.stokBarang,
        antrian: req.body.data.antrian,
        waktuBuka: req.body.data.waktuBuka,
        waktuTutup: req.body.data.waktuTutup,
      },
    });
    res.json({
      status: 200,
      message: dataOksigenUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const dataOksigenDelete = await OksigenModel.deleteOne({
      _id: req.params.id,
    });
    res.json({
      status: 200,
      message: dataOksigenDelete,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dataOksigenDetail = await OksigenModel.findById({
      _id: req.params.id,
    });
    res.json(dataOksigenDetail);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
router.get("/testAuth", async (req, res) => {
  try {
    const dataOksigenGet = await OksigenModel.find();
    res.json(dataOksigenGet);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
module.exports = router;
