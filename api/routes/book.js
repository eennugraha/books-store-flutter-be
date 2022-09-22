const bookRoutes = require("express").Router();
const BookController = require("../controllers/BookController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

bookRoutes.get("/", BookController.getAllBooks);
bookRoutes.post("/add", auth, upload.single("image"), BookController.add);
bookRoutes.put("/:id", auth, upload.single("image"), BookController.edit);
bookRoutes.delete("/:id", auth, BookController.delete);
bookRoutes.get("/book/:id", BookController.getBookInfo);

module.exports = bookRoutes;
