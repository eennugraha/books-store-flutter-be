const transactionRoute = require("express").Router();
const TransactionController = require("../controllers/TransactionController");
const { auth } = require("../middlewares/auth");

transactionRoute.post("/cek", TransactionController.cek);
transactionRoute.get("/i", TransactionController.getTrans);

transactionRoute.get("/", auth, TransactionController.getMyActiveTransaction);

transactionRoute.post("/buy/:id", auth, TransactionController.buy);

module.exports = transactionRoute;
