const authorRoute = require("express").Router();
const AuthorController = require("../controllers/AuthorController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

authorRoute.get("/", AuthorController.getAllAuthors);
authorRoute.post("/add", auth, upload.single("image"), AuthorController.add);
authorRoute.put("/:id", auth, upload.single("image"), AuthorController.edit);
authorRoute.delete("/:id", auth, AuthorController.delete);
authorRoute.get("/author/:id", AuthorController.getAuthorInfo);
authorRoute.get("/author/entry/:id", AuthorController.getAuthorBooks);

module.exports = authorRoute;
