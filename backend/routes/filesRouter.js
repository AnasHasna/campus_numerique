const {
  addFileToModuleController,
  getAllFilesInModuleController,
} = require("../controllers/filesController");
const { fileUpload } = require("../middleware/fileUpload");
const verifyToken = require("../middleware/verifyToken");

const filesRouter = require("express").Router();

moduleRouter
  .route("/:moduleId")
  .post(verifyToken, fileUpload.single("file"), addFileToModuleController)
  .get(verifyToken, getAllFilesInModuleController);

module.exports = filesRouter;
