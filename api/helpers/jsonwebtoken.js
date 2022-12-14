const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE || "sample";

const tokenGenerator = (data) => {
  const { id, name, email, image } = data;
  return jwt.sign(
    {
      id,
      name,
      email,
      image,
    },
    secretCode
  );
};

const tokenVerifier = (data) => {
  return jwt.verify(data, secretCode);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
