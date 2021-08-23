const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOURI,
  { useUnifiedTopology: true },
  { useNewUrlParser: true }
);

const ShopSchema = mongoose.Schema({
  id_mitra: {
    type: String,
    required: true,
  },
  namaToko: {
    type: String,
    required: true,
  },
  data: {
    public_id: {
      type: String,
      required: true,
    },
    namaBarang: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    product_url: {
      type: String,
      required: true,
    },
    provinsi: {
      type: String,
      require: true,
    },
    kota: {
      type: String,
      required: true,
    },
    report: {
      type: Number,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
    updated_date: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model("shop", ShopSchema);
