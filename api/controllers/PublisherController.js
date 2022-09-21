const { publisher } = require("../models");

class PublisherController {
  static async getAllPublishers(req, res) {
    try {
      let publishers = await publisher.findAll();
      res.status(200).json(publishers);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      const name = req.body;
      let result = await publisher.create(name);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async edit(req, res) {
    try {
      const id = +req.params.id;
      const name = req.body;
      let result = await publisher.update(name, { where: { id } });

      result[0] === 1
        ? res.status(200).json(`Publisher with id ${id} has been updated!`)
        : res.status(404).json(`Publisher with id ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await publisher.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json(`Publisher with id: ${id} has been deleted!`)
        : res.status(404).json(`Publisher with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getPublisherInfo(req, res) {
    try {
      const id = +req.params.id;
      let result = await publisher.findByPk(id);
      result !== null
        ? res.status(200).json(result)
        : res.status(404).json(`Author with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = PublisherController;
