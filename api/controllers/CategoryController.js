const { category, book, author, publisher } = require("../models");

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      let categories = await category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      const { name } = req.body;
      let result = await category.create({
        name,
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async edit(req, res) {
    try {
      const id = +req.params.id;
      const { name } = req.body;
      let result = await category.update(
        { name },
        { where: { id }, individualHooks: true }
      );
      result[0] === 1
        ? res.status(200).json(`Category with id ${id} has been updated!`)
        : res.status(404).json(`Category with id ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await category.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json(`Category with id: ${id} has been deleted!`)
        : res.status(404).json(`Category with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getCategoryInfo(req, res) {
    try {
      const id = +req.params.id;
      let result = await book.findAll({
        where: { categoryId: id },
        include: [author, publisher, category],
      });
      result.length !== 0
        ? res.status(200).json(result)
        : res.status(404).json(`Book in this category is currently empty!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CategoryController;
