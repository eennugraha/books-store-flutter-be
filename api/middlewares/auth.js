const { tokenVerifier } = require("../helpers/jsonwebtoken");

const auth = (req, res, next) => {
  console.log("middle auth cok");
  const access_token = req.headers.access_token;
  if (access_token) {
    console.log("token ada");
    try {
      let verifyToken = tokenVerifier(access_token);
      req.userData = verifyToken;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Token tidak terautentikasi!",
      });
    }
  } else {
    res.status(404).json({
      message: "Access token tidak ditemukan!",
    });
  }
};

module.exports = { auth };
