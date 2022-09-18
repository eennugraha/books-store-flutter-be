const adminRoutes = require("express").Router();
const AdminController = require("../controllers/AdminController");
const upload = require("../helpers/multer");

adminRoutes.get("/", AdminController.getAllAdmins);
adminRoutes.post("/register", upload.single("image"), AdminController.register);
adminRoutes.post("/login", AdminController.login);
adminRoutes.put("/:id", upload.single("image"), AdminController.update);
adminRoutes.delete("/:id", AdminController.delete);
adminRoutes.get("/account/:id", AdminController.getAdminInfo);

module.exports = adminRoutes;
