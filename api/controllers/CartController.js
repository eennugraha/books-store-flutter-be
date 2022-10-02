const { cart, user, book, transaction } = require("../models");

class CartController {
  static async getMyCarts(req, res) {
    try {
      const userId = +req.userData.id;
      let carts = await cart.findAll({
        where: { userId: userId, bookStatus: 0 },
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

      const dataExist = await cart.findOne({
        where: { userId, bookId, bookStatus: 0 },
      });

      if (dataExist !== null) {
        let result = await cart.update(
          {
            quantity: 1 + dataExist.quantity,
          },
          { where: { userId, bookId } }
        );
        res.status(201).json(`Book quantity is increased in your cart!`);
      } else {
        let result = await cart.create({
          bookId,
          userId,
        });
        res.status(201).json(result);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async order(req, res) {
    try {
      const userId = req.userData.id;
      let i = 0;
      let result = "";
      const currentDate = new Date();

      while (req.body[`bookId.${i}`]) {
        const { bookStatus } = req.body;
        let bookId = req.body[`bookId.${i}`];
        const dataExist = await cart.findAll({
          where: { userId, bookId, bookStatus: 0, deliveryStatus: 0 },
        });

        if (dataExist) {
          result = await cart.update(
            {
              orderDate: currentDate,
              bookStatus,
            },
            { where: { userId, bookId } }
          );
        } else {
          result = await cart.update(
            {
              bookStatus,
            },
            { where: { userId, bookId } }
          );
        }
        i++;
      }
      // result[0] === 1
      //   ? res.status(200).json({
      //       message: `berhasil`,
      //     })
      //   : res.status(404).json({
      //       message: `Your cart is empty`,
      //     });

      if (result[0] === 1) {
        let orderedBooks = await cart.findAll({
          where: { userId, bookStatus: 1, deliveryStatus: 0 },
          include: [book],
        });

        // res.json(orderedBooks);
        // res.json(orderedBooks[0]);
        const dd = String(currentDate.getDate()).padStart(2, "0");
        const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
        const yyyy = currentDate.getFullYear();
        const seconds = String(currentDate.getSeconds());
        const minutes = String(currentDate.getMinutes());
        const hour = String(currentDate.getSeconds());
        const timeCode = `${yyyy}${mm}${dd}${hour}${minutes}${seconds}`;
        const numRandom = `${Math.floor(Math.random() * 100)}${Math.floor(
          Math.random() * 100
        )}${Math.floor(Math.random() * 100)}`;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomCharacter =
          alphabet[Math.floor(Math.random() * alphabet.length)];

        const trCode = `BS/${timeCode}/${userId}/${numRandom}/${randomCharacter}`;

        let subtotal = 0;
        for (let i = 0; i < orderedBooks.length; i++) {
          subtotal += orderedBooks[i].quantity * orderedBooks[i].book.price;
        }

        for (let i = 0; i < orderedBooks.length; i++) {
          let newTransaction = await transaction.create({
            cartId: orderedBooks[i].id,
            transactionCode: trCode,
            userId: userId,
            totalPayment: subtotal,
          });
        }

        res.json({ message: `masuk create` });
      } else {
        res.json({ message: `Gagal` });
      }
    } catch (err) {
      res.json(err);
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
