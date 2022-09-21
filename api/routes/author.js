const authorRoutes = require("express").Router();
const AuthorController = require("../controllers/AuthorController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

authorRoutes.get("/", AuthorController.getAllAuthors);
authorRoutes.post("/add", auth, upload.single("image"), AuthorController.add);
authorRoutes.put("/:id", auth, upload.single("image"), AuthorController.edit);
authorRoutes.delete("/:id", auth, AuthorController.delete);
authorRoutes.get("/author/:id", auth, AuthorController.getAuthorInfo);

module.exports = authorRoutes;
