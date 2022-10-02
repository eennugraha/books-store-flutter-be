const { transaction, cart } = require("../models");

class TransactionController {
  static async getMyActiveTransaction(req, res) {
    try {
      const userId = +req.userData.id;

      let transactions = await transaction.findAll({
        include: [cart],
      });
      res.status(200).json(transactions);

      // let uniqueTransaction = transactions.filter((item, index, objects) => {
      //   if (index === 0) {
      //     return item;
      //   } else if (
      //     item.transactionCode !== objects[index - 1].transactionCode
      //   ) {
      //     return item;
      //   }
      // });
      // res.status(200).json(uniqueTransaction);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = TransactionController;
