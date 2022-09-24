const userRoutes = require("express").Router();
const UserController = require("../controllers/UserController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

userRoutes.get("/", UserController.getAllUsers);
userRoutes.post("/register", upload.single("image"), UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.put("/:id", upload.single("image"), UserController.edit);
userRoutes.delete("/:id", UserController.delete);
userRoutes.get("/user/:id", UserController.getUserInfo);

module.exports = userRoutes;
