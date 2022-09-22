const route = require("express").Router();

route.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
  });
});

const adminRoutes = require("./admin");
const publisherRoutes = require("./publisher");
const authorRoutes = require("./author");
const categoryRoutes = require("./category");
const bookRoutes = require("./book");

route.use("/api/admins", adminRoutes);
route.use("/api/publishers", publisherRoutes);
route.use("/api/authors", authorRoutes);
route.use("/api/categories", categoryRoutes);
route.use("/api/books", bookRoutes);

module.exports = route;
