const { book, author, publisher, category } = require("../models");
const fs = require("fs");

class BookController {
  static async getAllBooks(req, res) {
    try {
      let books = await book.findAll({
        include: [author, publisher, category],
      });
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      if (req.file) {
        const {
          title,
          synopsis,
          publicationYear,
          stock,
          price,
          authorId,
          publisherId,
          categoryId,
        } = req.body;
        const image = req.file.path;
        let result = await book.create({
          title,
          synopsis,
          publicationYear,
          stock,
          price,
          authorId,
          publisherId,
          categoryId,
          image,
        });
        res.status(201).json(result);
      } else {
        const {
          title,
          synopsis,
          publicationYear,
          stock,
          price,
          image,
          authorId,
          publisherId,
          categoryId,
        } = req.body;
        let result = await book.create({
          title,
          synopsis,
          publicationYear,
          stock,
          price,
          image,
          authorId,
          publisherId,
          categoryId,
        });
        res.status(201).json(result);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async edit(req, res) {
    try {
      if (req.file) {
        const id = +req.params.id;
        const {
          title,
          synopsis,
          publicationYear,
          stock,
          price,
          authorId,
          publisherId,
          categoryId,
        } = req.body;
        const image = req.file.path;

        let selectedData = await book.findByPk(id);

        if (selectedData === null) {
          res.status(404).json(`Book with id ${id} does not exist!`);
        }

        const imagePath = selectedData.image;

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file removed
        });

        let result = await book.update(
          {
            title,
            synopsis,
            publicationYear,
            stock,
            price,
            image,
            authorId,
            publisherId,
            categoryId,
          },
          { where: { id }, indivualHooks: true }
        );
        result[0] === 1
          ? res.status(200).json(`Book with id ${id} has been updated!`)
          : res.status(404).json(`Book with id ${id} does not exist! m`);
      } else {
        const id = +req.params.id;
        const {
          title,
          synopsis,
          publicationYear,
          stock,
          price,
          authorId,
          publisherId,
          categoryId,
        } = req.body;
        let result = await book.update(
          {
            title,
            synopsis,
            publicationYear,
            stock,
            price,
            authorId,
            publisherId,
            categoryId,
          },
          { where: { id }, individualHooks: true }
        );
        result[0] === 1
          ? res.status(200).json(`Book with id ${id} has been updated!`)
          : res.status(404).json(`Book with id ${id} does not exist! b`);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await book.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json(`Book with id: ${id} has been deleted!`)
        : res.status(404).json(`Book with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getBookInfo(req, res) {
    try {
      const id = +req.params.id;
      let result = await book.findByPk(id, {
        include: [author, publisher, category],
      });
      result !== null
        ? res.status(200).json(result)
        : res.status(404).json(`Book with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = BookController;
