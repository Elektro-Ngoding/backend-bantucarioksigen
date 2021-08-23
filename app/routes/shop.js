const express = require("express");
const router = express.Router();
const ShopModel = require("../models/ShopModel");

require("dotenv").config();
var cloudinary = require("cloudinary").v2;
var fs = require("fs");
const { STATUS_CODES } = require("http");
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

router.post("/", async (req, res) => {
  const pathname_url = req.body.data.image_url;

  cloudinary.uploader.upload(
    pathname_url.toString(),
    {
      folder: req.body.namaToko,
      resource_type: "image",
    },
    async (err, image) => {
      if (err) {
        return JSON.stringify(err);
      } else {
        const dataProduct = new ShopModel({
          id_mitra: req.body.id_mitra,
          namaToko: req.body.namaToko,
          data: {
            public_id: image.public_id,
            namaBarang: req.body.data.namaBarang,
            product_price: req.body.data.product_price,
            image_url: image.url,
            product_url: req.body.data.product_url,
            provinsi: req.body.data.provinsi,
            kota: req.body.data.kota,
            report: req.body.data.report,
          },
        });
        try {
          const dataOksigenPost = await dataProduct.save();
          res.status(200).json({
            status: 200,
            message: "success add new Product",
          });
        } catch (error) {
          res.status(500).json({
            message: error,
          });
        }
      }
    }
  );
});

router.get("/", async (req, res) => {
  try {
    const productList = await ShopModel.find();
    res.json(productList);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productUpdate = await ShopModel.updateOne({
      id_mitra: req.body.id_mitra,
      namaToko: req.body.namaToko,
      data: {
        namaBarang: req.body.data.namaBarang,
        image_url: req.body.data.image_url,
        product_url: req.body.data.product_url,
        provinsi: req.body.data.provinsi,
        kota: req.body.data.kota,
        report: req.body.data.report,
      },
    });
    res.json({
      status: 200,
      message: productUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const productDelete = await ShopModel.deleteOne({
      _id: req.params.id,
    });
    res.json({
      status: 200,
      message: productDelete,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/:id_mitra", async (req, res) => {
  try {
    const productDetail = await ShopModel.find({
      id_mitra: req.params.id_mitra,
    });
    res.json(productDetail);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
module.exports = router;
