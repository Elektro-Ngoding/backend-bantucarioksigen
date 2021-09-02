require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let cors = require("cors");
const app = express();
const port = process.env.PORT || 3005;
app.use(cors({ credentials: true, origin: process.env.SERVICE_CLIENT }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const dataOksigen = require("./app/routes/bantucarioksigen");
const auth = require("./app/routes/auth/index");
const verifyToken = require("./app/configs/verifyToken");
const shop = require("./app/routes/shop");
const resCAPTCHA = require("./app/configs/captcha");

app.get("/", (req, res) => {
  res.json([
    {
      message: "Welcome to api bantucari",
    },
  ]);
});

app.use("/dataoksigen", dataOksigen);
app.use("/auth", auth);
app.use("/verifyToken", verifyToken);
app.use("/product", shop);
app.use("/captcha", resCAPTCHA);
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
