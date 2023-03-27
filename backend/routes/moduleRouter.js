const {
  createModuleController,
  getAllModulesController,
} = require("../controllers/moduleController");
const verifyToken = require("../middleware/verifyToken");

const moduleRouter = require("express").Router();

moduleRouter
  .route("/")
  .post(verifyToken, createModuleController)
  .get(verifyToken, getAllModulesController);

module.exports = moduleRouter;
