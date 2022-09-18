"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      author.hasMany(models.book);
    }
  }
  author.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Name cannot be empty!",
          },
        },
      },
      dateOfBirth: DataTypes.DATE,
      city: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: function (author, options) {
          author.dateOfBirth = author.dateOfBirth || "1900-01-01";
          author.city = author.city || "Please update city's name!";
          author.image = author.image || "https://via.placeholder.com/150";
        },
      },
      sequelize,
      modelName: "author",
    }
  );
  return author;
};
