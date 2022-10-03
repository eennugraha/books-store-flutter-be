const { transaction, cart } = require("../models");

class TransactionController {
  static async getMyActiveTransaction(req, res) {
    // untuk user nge cek transaksi nya sendiri
    try {
      const userId = +req.userData.id;

      let transactions = await transaction.findAll({
        where: { sentDate: null, userId: userId },
        include: [cart],
      });
      // res.status(200).json(transactions);

      let uniqueTransaction = transactions.filter((item, index, objects) => {
        if (index === 0) {
          return item;
        } else if (
          item.transactionCode !== objects[index - 1].transactionCode
        ) {
          return item;
        }
      });
      res.status(200).json(uniqueTransaction);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getAllTransactions(req, res) {
    // untuk admin nge cek semua transaksi
    try {
      let transactions = await transaction.findAll({
        include: [cart],
      });

      let uniqueTransaction = transactions.filter((item, index, objects) => {
        if (index === 0) {
          return item;
        } else if (
          item.transactionCode !== objects[index - 1].transactionCode
        ) {
          return item;
        }
      });
      res.status(200).json(uniqueTransaction);
    } catch (err) {
      res.json(err);
    }
  }

  static async acceptOrder(req, res) {
    try {
      const currentDate = new Date();
      const { trCode } = req.body;
      let result = await transaction.update(
        {
          sentDate: currentDate,
        },
        { where: { transactionCode: trCode } }
      );

      let result2 = await transaction.findAll({
        where: { transactionCode: trCode },
      });

      let result3;
      for (let i = 0; i < result2.length; i++) {
        result3 = await cart.update(
          {
            deliveryStatus: 1,
          },
          { where: { id: result2[i].cartId } }
        );
      }

      res.json(`masuk berhasil`);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = TransactionController;
