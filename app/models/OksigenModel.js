const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOURI,
  { useUnifiedTopology: true },
  { useNewUrlParser: true }
);

const OksigenSchema = mongoose.Schema({
 _id: {
   type: String,
   required: true
 },
  namaToko: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  data: {
    provinsi: {
      type: String,
      require: true,
    },
    kota: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    kontak: {
      type: Number,
      required: true,
    },
    statusBuka: {
      type: String,
    },
    stokBarang: {
      type: String,
    },
    antrian: {
      type: String,
    },
    waktuBuka: {
      type: String,
    },
    waktuTutup: {
      type: String,
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

module.exports = mongoose.model("oksigen", OksigenSchema);
