"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user);
      transaction.belongsTo(models.cart);
    }
  }
  transaction.init(
    {
      totalPayment: DataTypes.INTEGER,
      transactionDate: DataTypes.DATE,
      transactionCode: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      cartId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
