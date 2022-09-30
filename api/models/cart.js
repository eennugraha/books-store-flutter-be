"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.hasOne(models.transaction);
      cart.belongsTo(models.book);
      cart.belongsTo(models.user);
    }
  }
  cart.init(
    {
      paidDate: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      isPaid: DataTypes.INTEGER,
      isSent: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: function (cart, options) {
          cart.quantity = cart.quantity || 1;
          cart.isPaid = cart.isPaid || 0;
          cart.isSent = cart.isSent || 0;
        },
      },
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
