const publisherRoute = require("express").Router();
const PublisherController = require("../controllers/PublisherController");
const { auth } = require("../middlewares/auth");

publisherRoute.get("/", PublisherController.getAllPublishers);
publisherRoute.post("/add", auth, PublisherController.add);
publisherRoute.put("/:id", auth, PublisherController.edit);
publisherRoute.delete("/:id", auth, PublisherController.delete);
publisherRoute.get(
  "/publisher/:id",
  auth,
  PublisherController.getPublisherInfo
);

module.exports = publisherRoute;
