const { transaksi, user, book, cart } = require("../models");

class TransactionController {
  static async getMyActiveTransaction(req, res) {
    try {
      const userId = +req.userData.id;
      let transactions = await cart.findAll({
        where: { userId: userId, isPaid: 1 },
        include: [user, book],
      });

      //   for (let i = 0; i < transactions.length; i++) {
      //     transactions[i].quantity * transactions[i].book.price;
      //   }

      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getTrans(req, res) {
    try {
      let trans = await transaksi.findAll();
      res.json(trans);
    } catch (err) {
      res.json(err);
    }
  }

  static async buy(req, res) {
    try {
      const userId = +req.userData.id;

      // ubah syarat id nya supaya update status sekaligus banyak
      const id = +req.params.id;
      const { isPaid, quantity } = req.body;
      const currentDate = new Date();
      let result = await cart.update(
        {
          isPaid,
          paidDate: currentDate,
          quantity,
        },
        { where: { id } }
      );
      res.json(result);

      //   const noTime = new Date(
      //     currentDate.getFullYear(),
      //     currentDate.getMonth(),
      //     currentDate.getDate()
      //   );
      const numRandom = Math.floor(Math.random() * 100);
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomCharacter =
        alphabet[Math.floor(Math.random() * alphabet.length)];

      const trCode = `${userId}/${numRandom}/${randomCharacter}`;

      //   let result2 = await cart.findOne({
      //     where: { id },
      //     include: [book],
      //   });

      //   let totalPay = result2.quantity * result2.book.price;

      //   let result3 = await transaction.create({
      //     transactionCode: trCode,
      //     totalPayment: totalPay,
      //     cartId: id,
      //     sentDate: null,
      //   });
      //   console.log(result3);
      //   res.json(result3);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async cek(req, res) {
    try {
      //   const id = req.params.id;
      //   const numRandom = Math.floor(Math.random() * 100);
      //   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      //   const randomCharacter =
      //     alphabet[Math.floor(Math.random() * alphabet.length)];

      //   const trCode = `hehge`;
      const { cartId, transactionCode } = req.body;
      let result = await transaction.create({
        transactionCode,
        cartId,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = TransactionController;
