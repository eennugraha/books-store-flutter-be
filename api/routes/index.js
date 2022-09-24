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
const userRoutes = require("./user");
const wishlistRoutes = require("./wishlist");

route.use("/api/admins", adminRoutes);
route.use("/api/publishers", publisherRoutes);
route.use("/api/authors", authorRoutes);
route.use("/api/categories", categoryRoutes);
route.use("/api/books", bookRoutes);
route.use("/api/users", userRoutes);
route.use("/api/wishlists", wishlistRoutes);

module.exports = route;
