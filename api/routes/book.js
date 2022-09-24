const bookRoute = require("express").Router();
const BookController = require("../controllers/BookController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

bookRoute.get("/", BookController.getAllBooks);
bookRoute.post("/add", auth, upload.single("image"), BookController.add);
bookRoute.put("/:id", auth, upload.single("image"), BookController.edit);
bookRoute.delete("/:id", auth, BookController.delete);
bookRoute.get("/book/:id", BookController.getBookInfo);

module.exports = bookRoute;
