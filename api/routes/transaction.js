const transactionRoute = require("express").Router();
const TransactionController = require("../controllers/TransactionController");
const { auth } = require("../middlewares/auth");

transactionRoute.get("/", auth, TransactionController.getMyActiveTransaction);

module.exports = transactionRoute;
