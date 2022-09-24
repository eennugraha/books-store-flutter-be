const adminRoute = require("express").Router();
const AdminController = require("../controllers/AdminController");
const upload = require("../helpers/multer");
const { auth } = require("../middlewares/auth");

adminRoute.get("/", AdminController.getAllAdmins);
adminRoute.post(
  "/register",
  auth,
  upload.single("image"),
  AdminController.register
);
adminRoute.post("/login", AdminController.login);
adminRoute.put("/:id", auth, upload.single("image"), AdminController.update);
adminRoute.delete("/:id", auth, AdminController.delete);
adminRoute.get("/account/:id", auth, AdminController.getAdminInfo);

module.exports = adminRoute;
