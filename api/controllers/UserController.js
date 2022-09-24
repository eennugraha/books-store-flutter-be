const { user } = require("../models");
const fs = require("fs");
const { encryptPass, decryptPass } = require("../helpers/bcrypt");
const { tokenGenerator, tokenVerifier } = require("../helpers/jsonwebtoken");

class UserController {
  static async getAllUsers(req, res) {
    try {
      let users = await user.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res) {
    try {
      if (req.file) {
        const { name, email, password, address, phoneNumber } = req.body;
        const image = req.file.path;
        let result = await user.create({
          name,
          email,
          password,
          address,
          phoneNumber,
          image,
        });
        res.status(201).json(result);
      } else {
        const { name, email, password, address, phoneNumber, image } = req.body;
        let result = await user.create({
          name,
          email,
          password,
          address,
          phoneNumber,
          image,
        });
        res.status(201).json(result);
      }
    } catch (err) {
      // menghapus file gambar yg telah terupload
      const imagePath = err.errors[0].instance.image;
      fs.unlink(imagePath, (erro) => {
        if (erro) {
          console.error(erro);
          return;
        }
      });

      res.status(500).json(err.errors[0].message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let emailFound = await user.findOne({
        where: { email },
      });
      if (emailFound) {
        if (decryptPass(password, emailFound.password)) {
          let access_token = tokenGenerator(emailFound);
          res.status(200).json({
            access_token,
          });
          let verifyToken = tokenVerifier(access_token);
          console.log(verifyToken);
        } else {
          res.status(403).json({
            message: `Invalid password!`,
          });
        }
      } else {
        res.status(403).json({
          message: `Admin by ${email} does not exist!`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async edit(req, res) {
    try {
      if (req.file) {
        const id = +req.params.id;
        const { name, email, password, address, phoneNumber } = req.body;
        const image = req.file.path;

        let selectedData = await user.findByPk(id);

        // cek apakah data dengan id tersebut ada
        if (selectedData === null) {
          res.status(404).json(`User with id ${id} does not exist!`);
        }

        const imagePath = selectedData.image;

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file removed
        });

        if (password === undefined) {
          let result = await user.update(
            {
              name,
              email,
              address,
              phoneNumber,
              image,
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`User with id ${id} has been updated!`)
            : res.status(404).json(`User with id ${id} does not exist!`);
        } else {
          let result = await user.update(
            {
              name,
              email,
              password: encryptPass(password),
              address,
              phoneNumber,
              image,
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`User with id ${id} has been updated!`)
            : res.status(404).json(`User with id ${id} does not exist!`);
        }
      } else {
        const id = +req.params.id;
        const { name, email, password, address, phoneNumber } = req.body;

        if (password === undefined) {
          let result = await user.update(
            {
              name,
              email,
              address,
              phoneNumber,
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`User with id ${id} has been updated!`)
            : res.status(404).json(`User with id ${id} does not exist!`);
        } else {
          let result = await user.update(
            {
              name,
              email,
              password: encryptPass(password),
              address,
              phoneNumber,
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`User with id ${id} has been updated!`)
            : res.status(404).json(`User with id ${id} does not exist!`);
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      // menghapus file image bersangkutan
      let selectedAccount = await user.findByPk(id);

      if (selectedAccount !== null) {
        const imagePath = selectedAccount.image;
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file removed
        });
      }

      let result = await user.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json(`User with id: ${id} has been deleted!`)
        : res.status(404).json(`User with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getUserInfo(req, res) {
    try {
      const id = +req.params.id;
      let result = await user.findByPk(id);
      result !== null
        ? res.status(200).json(result)
        : res.status(404).json(`User with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
