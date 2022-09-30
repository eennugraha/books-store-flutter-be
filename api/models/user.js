"use strict";
const { encryptPass } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.book, { through: models.wishlist });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Name cannot be empty!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Email cannot be empty!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Password cannot be empty!",
          },
        },
      },
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = encryptPass(user.password);
          user.address = user.address || "Please update your address!";
          user.phoneNumber =
            user.phoneNumber || "Please update your phone number!";
          user.image = user.image || "https://via.placeholder.com/150";
        },
        // beforeUpdate: function (user, options) {
        //   user.password = encryptPass(user.password);
        // },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
