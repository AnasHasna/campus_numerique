const {
  createModuleController,
  getAllModulesController,
  getStatistiquesModuleController,
  getNotesModuleController,
  getAllStudentsInModuleController,
  addNoteModuleController,
  updateNoteModuleController,
  getModuleInfoController,
  rejectInvitationController,
  confirmInvitationController,
  getAllInvitationsController,
  SendInvitationToModuleController,
  getAllConversationsController,
  sendMessageController,
  getSingleChatController,
  searchModuleController,
  updateModuleController,
  deleteModuleController,
  exitFromModuleController,
  generateAutoIdController,
  addTaskController,
  getAllTasksController,
  getSingleTaskController,
  answerTaskController,
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
  .post(verifyToken, verifyAuthorizationTeacher, createModuleController);

moduleRouter.route("/all").post(verifyToken, getAllModulesController);

moduleRouter.route("/search").post(verifyToken, searchModuleController);
moduleRouter
  .route("/generateAutoId")
  .get(verifyToken, generateAutoIdController);

moduleRouter
  .route("/:moduleId")
  .get(verifyToken, getModuleInfoController)
  .put(verifyToken, updateModuleController)
  .delete(verifyToken, deleteModuleController);

moduleRouter
  .route("/:moduleId/exit")
  .post(verifyToken, exitFromModuleController);

moduleRouter
  .route("/:moduleId/students")
  .get(verifyToken, getAllStudentsInModuleController);

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

moduleRouter
  .route("/:moduleId/invitations")
  .get(verifyToken, getAllInvitationsController)
  .post(verifyToken, SendInvitationToModuleController);

moduleRouter
  .route("/:moduleId/invitations/:invitationId")
  .delete(verifyToken, rejectInvitationController)
  .post(verifyToken, confirmInvitationController);

// ======tasks
moduleRouter
  .route("/:moduleId/tasks")
  .post(verifyToken, fileUpload.single("file"), addTaskController)
  .get(verifyToken, getAllTasksController);

moduleRouter
  .route("/:moduleId/tasks/:taskId")
  .get(verifyToken, getSingleTaskController);

moduleRouter.post(
  "/:moduleId/tasks/:taskId/answer",
  verifyToken,
  fileUpload.single("file"),
  answerTaskController
);

// ======chats
moduleRouter
  .route("/:moduleId/chats")
  .post(verifyToken, getAllConversationsController);

moduleRouter
  .route("/:moduleId/chats/:chatId")
  .get(verifyToken, getSingleChatController)
  .post(verifyToken, sendMessageController);

module.exports = moduleRouter;
