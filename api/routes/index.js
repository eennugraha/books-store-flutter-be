const route = require("express").Router();

route.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
  });
});

const adminRoutes = require("./admin");

route.use("/api/admins", adminRoutes);

module.exports = route;
