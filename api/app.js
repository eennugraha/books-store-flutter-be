require("dotenv").config;

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// untuk menyimpan image multer
app.use("/assets", express.static("assets"));
// app.use("../fe/public/images/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`App is listening on port number ${port}`);
});
