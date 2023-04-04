const {
  createModuleController,
  getAllModulesController,
} = require("../controllers/moduleController");
const {
  getAllPubController,
  createPubController,
} = require("../controllers/pubController");
const { fileUpload } = require("../middleware/fileUpload");
const {
  verifyAuthorizationTeacher,
} = require("../middleware/verifyAuthorization");
const verifyToken = require("../middleware/verifyToken");

const moduleRouter = require("express").Router();

moduleRouter
  .route("/")
  .post(verifyToken, verifyAuthorizationTeacher, createModuleController)
  .get(verifyToken, verifyAuthorizationTeacher, getAllModulesController);

moduleRouter
  .route("/:moduleId/pubs")
  .get(verifyToken, getAllPubController)
  .post(
    verifyToken,
    // verifyAuthorizationTeacher,
    fileUpload.single("file"),
    createPubController
  );

module.exports = moduleRouter;
