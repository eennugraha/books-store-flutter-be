const categoryRoutes = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const { auth } = require("../middlewares/auth");

categoryRoutes.get("/", CategoryController.getAllCategories);
categoryRoutes.post("/add", auth, CategoryController.add);
categoryRoutes.put("/:id", auth, CategoryController.edit);
categoryRoutes.delete("/:id", auth, CategoryController.delete);
categoryRoutes.get("/category/:id", CategoryController.getCategoryInfo);

module.exports = categoryRoutes;
