const {
  createModuleController,
  getAllModulesController,
  getStatistiquesModuleController,
  getNotesModuleController,
  addStudentToModuleController,
  getAllStudentsInModuleController,
  addNoteModuleController,
  updateNoteModuleController,
  getModuleInfoController,
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

moduleRouter.route("/:moduleId").get(verifyToken, getModuleInfoController);

moduleRouter
  .route("/:moduleId/students")
  .get(verifyToken, getAllStudentsInModuleController)
  .post(verifyToken, addStudentToModuleController);

moduleRouter
  .route("/:moduleId/pubs")
  .get(verifyToken, getAllPubController)
  .post(
    verifyToken,
    // verifyAuthorizationTeacher,
    fileUpload.single("file"),
    createPubController
  );

moduleRouter
  .route("/:moduleId/statistiques")
  .get(verifyToken, getStatistiquesModuleController);

moduleRouter
  .route("/:moduleId/notes")
  .post(verifyToken, addNoteModuleController)
  .put(verifyToken, updateNoteModuleController)
  .get(verifyToken, getNotesModuleController);

module.exports = moduleRouter;
