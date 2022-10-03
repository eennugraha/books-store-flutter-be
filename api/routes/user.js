const userRoute = require("express").Router();
const TransactionController = require("../controllers/TransactionController");
const UserController = require("../controllers/UserController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

userRoute.get("/", UserController.getAllUsers);
userRoute.post("/register", upload.single("image"), UserController.register);
userRoute.post("/login", UserController.login);
userRoute.put("/:id", upload.single("image"), UserController.edit);
userRoute.delete("/:id", UserController.delete);
userRoute.get("/user/:id", UserController.getUserInfo);
userRoute.get(
  "/myactivetransaction",
  auth,
  TransactionController.getMyActiveTransaction
);

module.exports = userRoute;
