"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsTo(models.author);
      book.belongsTo(models.publisher);
      book.belongsTo(models.category);
      book.hasMany(models.cart);
      book.belongsToMany(models.user, { through: models.wishlist });
    }
  }
  book.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Title cannot be empty!",
          },
        },
      },
      synopsis: DataTypes.TEXT,
      publicationYear: DataTypes.DATE,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      publisherId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: function (book, options) {
          book.synopsis = book.synopsis || "Please update book's synopsis!";
          book.publicationYear = book.publicationYear || "1900-01-01";
          book.stock = book.stock || 0;
          book.price = book.price || 0;
          book.image = book.image || "https://via.placeholder.com/150";
        },
      },
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
