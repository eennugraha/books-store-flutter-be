const adminRoutes = require("express").Router();
const AdminController = require("../controllers/AdminController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

adminRoutes.get("/", AdminController.getAllAdmins);
adminRoutes.post(
  "/register",
  auth,
  upload.single("image"),
  AdminController.register
);
adminRoutes.post("/login", AdminController.login);
adminRoutes.put("/:id", auth, upload.single("image"), AdminController.update);
adminRoutes.delete("/:id", auth, AdminController.delete);
adminRoutes.get("/account/:id", auth, AdminController.getAdminInfo);

module.exports = adminRoutes;
