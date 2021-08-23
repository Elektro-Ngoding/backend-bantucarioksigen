require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const port = process.env.PORT || 3005;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataOksigen = require("./app/routes/bantucarioksigen");
const auth = require("./app/routes/auth/index");
const verifyToken = require("./app/configs/verifyToken");
const shop = require("./app/routes/shop")

app.get("/", (req, res) => {
  res.send("bantucari oksigen");
});
app.use("/dataoksigen", dataOksigen);
app.use("/auth", auth);
app.use("/verifyToken", verifyToken);
app.use("/product", shop)
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
