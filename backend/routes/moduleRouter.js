const {
  createModuleController,
  getAllModulesController,
} = require("../controllers/moduleController");
const {
  verifyAuthorizationTeacher,
} = require("../middleware/verifyAuthorization");
const verifyToken = require("../middleware/verifyToken");

const moduleRouter = require("express").Router();

moduleRouter
  .route("/")
  .post(verifyToken, verifyAuthorizationTeacher, createModuleController)
  .get(verifyToken, verifyAuthorizationTeacher, getAllModulesController);

module.exports = moduleRouter;
