const { wishlist, user, book } = require("../models");

class WishlistController {
  static async getMyWishlist(req, res) {
    try {
      const userId = +req.userData.id;
      let wishlists = await wishlist.findAll({
        where: { userId: userId },
        include: [user, book],
      });
      res.status(200).json(wishlists);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      const userId = +req.userData.id;
      const { bookId } = req.body;
      let result = await wishlist.create({
        bookId,
        userId,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await wishlist.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json(`Wishlist with id: ${id} has been deleted!`)
        : res.status(404).json(`Wishlist with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = WishlistController;
