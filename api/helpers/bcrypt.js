const bcrypt = require("bcrypt");
const salt = +process.env.SALT_ROUND || 5;

const encryptPass = (data) => {
  return bcrypt.hashSync(String(data), salt);
};

const decryptPass = (data, hashPassword) => {
  return bcrypt.compareSync(String(data), hashPassword);
};

module.exports = {
  encryptPass,
  decryptPass,
};
