const publisherRoutes = require("express").Router();
const PublisherController = require("../controllers/PublisherController");
const { auth } = require("../middlewares/auth");

publisherRoutes.get("/", PublisherController.getAllPublishers);
publisherRoutes.post("/add", auth, PublisherController.add);
publisherRoutes.put("/:id", auth, PublisherController.edit);
publisherRoutes.delete("/:id", auth, PublisherController.delete);
publisherRoutes.get(
  "/publisher/:id",
  auth,
  PublisherController.getPublisherInfo
);

module.exports = publisherRoutes;
