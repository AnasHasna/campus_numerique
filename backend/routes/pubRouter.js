const {
  createPubController,
  getAllPubController,
} = require("../controllers/pubController");
const {
  verifyAuthorizationTeacher,
} = require("../middleware/verifyAuthorization");
const verifyToken = require("../middleware/verifyToken");
const pubRouter = require("express").Router();

pubRouter
  .route("/")
  .get(verifyToken, verifyAuthorizationTeacher, getAllPubController)
  .post(verifyToken, verifyAuthorizationTeacher, createPubController);

module.exports = pubRouter;
