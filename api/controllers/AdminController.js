const { admin } = require("../models");
const { decryptPass, encryptPass } = require("../helpers/bcrypt");
const { tokenGenerator, tokenVerifier } = require("../helpers/jsonwebtoken");
const fs = require("fs");
// const upload = require("../helpers/multer");

class AdminController {
  static async getAllAdmins(req, res) {
    try {
      let admins = await admin.findAll();
      res.status(200).json(admins);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res) {
    // tanpa upload image pas register
    // try {
    //   const { name, email, password, image } = req.body;
    //   let result = await admin.create({
    //     name,
    //     email,
    //     password,
    //     image,
    //   });
    //   res.status(201).json(result);
    // } catch (err) {
    //   res.status(500).json(err.errors[0].message);
    //   // console.log(err.errors[0].message);
    // }

    // ini kalo pake upload image pas register, tambahkan juga upload.single("image") di router nya
    try {
      if (req.file) {
        const { name, email, password } = req.body;
        const image = req.file.path;
        let result = await admin.create({
          name,
          email,
          password,
          image,
        });
        res.status(201).json(result);
      } else {
        const { name, email, password, image } = req.body;
        let result = await admin.create({
          name,
          email,
          password,
          image,
        });
        res.status(201).json(result);
      }
    } catch (err) {
      res.status(500).json(err.errors[0].message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let emailFound = await admin.findOne({
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

  static async update(req, res) {
    try {
      if (req.file) {
        const id = +req.params.id;
        const { name, email, password } = req.body;
        const image = req.file.path;

        let selectedAccount = await admin.findByPk(id);
        const imagePath = selectedAccount.image;

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file removed
        });
        if (password === undefined) {
          let result = await admin.update(
            {
              name,
              email,
              image,
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`Admin with id ${id} has been updated!`)
            : res.status(404).json(`Admin with id ${id} does not exist!`);
        } else {
          let result = await admin.update(
            {
              name,
              email,
              password: encryptPass(password),
              image,
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`Admin with id ${id} has been updated!`)
            : res.status(404).json(`Admin with id ${id} does not exist!`);
        }
      } else {
        const id = +req.params.id;
        const { name, email, password } = req.body;

        if (password === undefined) {
          let result = await admin.update(
            {
              name,
              email,
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`Admin with id ${id} has been updated!`)
            : res.status(404).json(`Admin with id ${id} does not exist!`);
        } else {
          let result = await admin.update(
            {
              name,
              email,
              password: encryptPass(password),
            },
            { where: { id } }
          );
          result[0] === 1
            ? res.status(200).json(`Admin with id ${id} has been updated!`)
            : res.status(404).json(`Admin with id ${id} does not exist!`);
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
      let selectedAccount = await admin.findByPk(id);

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

      // menghapus row di database
      let result = await admin.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json(`Admin with id: ${id} has been deleted!`)
        : res.status(404).json(`Admin with id: ${id} does not exist!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getAdminInfo(req, res) {
    try {
      const id = +req.params.id;
      let result = await admin.findByPk(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json(err);
    }
  }
}

module.exports = AdminController;
