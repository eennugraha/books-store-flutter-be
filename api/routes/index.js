const route = require("express").Router();

route.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
  });
});

const adminRoutes = require("./admin");
const publisherRoutes = require("./publisher");
const authorRoutes = require("./author");

route.use("/api/admins", adminRoutes);
route.use("/api/publishers", publisherRoutes);
route.use("/api/authors", authorRoutes);

module.exports = route;
