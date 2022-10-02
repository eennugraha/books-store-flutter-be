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
      orderDate: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      bookStatus: DataTypes.INTEGER,
      deliveryStatus: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: function (cart, options) {
          cart.quantity = cart.quantity || 1;
          cart.bookStatus = cart.bookStatus || 0;
          cart.deliveryStatus = cart.deliveryStatus || 0;
        },
      },
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
