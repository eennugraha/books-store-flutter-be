const wishlistRoutes = require("express").Router();
const WishlistController = require("../controllers/WishListController");
const { auth } = require("../middlewares/auth");

wishlistRoutes.get("/", auth, WishlistController.getMyWishlist);
wishlistRoutes.post("/add", auth, WishlistController.add);
wishlistRoutes.delete("/:id", WishlistController.delete);

module.exports = wishlistRoutes;
