"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class publisher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      publisher.hasMany(models.book);
    }
  }
  publisher.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Publisher's name cannot be empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "publisher",
    }
  );
  return publisher;
};
