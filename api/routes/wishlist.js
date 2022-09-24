const wishlistRoute = require("express").Router();
const WishlistController = require("../controllers/WishListController");
const { auth } = require("../middlewares/auth");

wishlistRoute.get("/", auth, WishlistController.getMyWishlist);
wishlistRoute.post("/add", auth, WishlistController.add);
wishlistRoute.delete("/:id", auth, WishlistController.delete);

module.exports = wishlistRoute;
