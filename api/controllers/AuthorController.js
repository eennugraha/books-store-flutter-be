const { author, book, publisher, category } = require("../models");
const fs = require("fs");

class AuthorController {
  static async getAllAuthors(req, res) {
    try {
      let authors = await author.findAll();
      res.status(200).json(authors);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      if (req.file) {
        const { name, dateOfBirth, city } = req.body;
        const image = req.file.path;
        let result = await author.create({
          name,
          dateOfBirth,
          city,
          image,
        });
        res.status(201).json(result);
      } else {
        const { name, dateOfBirth, city, image } = req.body;
        let result = await author.create({
          name,
          dateOfBirth,
          city,
          image,
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
        const { name, dateOfBirth, city } = req.body;
        const image = req.file.path;

        let selectedData = await author.findByPk(id);

        // cek apakah data dengan id tersebut ada
        if (selectedData === null) {
          res.status(404).json(`Author with id ${id} does not exist!`);
        }

        const imagePath = selectedData.image;

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file removed
        });

        let result = await author.update(
          {
            name,
            dateOfBirth,
            image,
            city,
          },
          { where: { id }, individualHooks: true }
        );
        result[0] === 1
          ? res.status(200).json(`Author with id ${id} has been updated!`)
          : res.status(404).json(`Author with id ${id} does not exist!`);
      } else {
        console.log("masuk ke else cek");
        const id = +req.params.id;
        const { name, dateOfBirth, city } = req.body;
        let result = await author.update(
          {
            name,
            dateOfBirth,
            city,
          },
          { where: { id }, individualHooks: true }
        );
        result[0] === 1
          ? res.status(200).json(`Author with id ${id} has been updated!`)
          : res.status(404).json(`Author with id ${id} does not exist!`);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      let selectedData = await author.findByPk(id);

      // cek apakah data dengan id tersebut ada
      if (selectedData === null) {
        res.status(404).json(`Author with id ${id} does not exist!`);
      }

      const imagePath = selectedData.image;

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });

      let result = await author.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json(`Author with id: ${id} has been deleted!`)
        : res.status(404).json(`Author with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getAuthorInfo(req, res) {
    try {
      const id = +req.params.id;
      let result = await author.findByPk(id);
      result !== null
        ? res.status(200).json(result)
        : res.status(404).json(`Author with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getAuthorBooks(req, res) {
    try {
      const id = +req.params.id;
      let result = await book.findAll({
        where: { authorId: id },
        include: [publisher, category, author],
      });
      result.length !== 0
        ? res.status(200).json(result)
        : res.status(404).json(`Book by this author is currently empty!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = AuthorController;
