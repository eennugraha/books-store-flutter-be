const categoryRoute = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const { auth } = require("../middlewares/auth");

categoryRoute.get("/", CategoryController.getAllCategories);
categoryRoute.post("/add", auth, CategoryController.add);
categoryRoute.put("/:id", auth, CategoryController.edit);
categoryRoute.delete("/:id", auth, CategoryController.delete);
categoryRoute.get("/category/:id", CategoryController.getCategoryInfo);

module.exports = categoryRoute;
