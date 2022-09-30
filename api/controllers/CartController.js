const { cart, user, book } = require("../models");

class CartController {
  static async getMyCarts(req, res) {
    try {
      const userId = +req.userData.id;
      let carts = await cart.findAll({
        where: { userId: userId, isPaid: 0 },
        include: [user, book],
      });
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      const userId = +req.userData.id;
      const { bookId } = req.body;
      let result = await cart.create({
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
      const userId = +req.userData.id;

      let result = await cart.destroy({
        where: { id, userId: userId },
      });
      result === 1
        ? res.status(200).json(`Cart with id: ${id} has been deleted!`)
        : res.status(404).json(`You don't have cart with id: ${id}`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CartController;
