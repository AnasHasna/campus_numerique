const {
  registerTeacherController,
  loginTeacherController,
  forgetPasswordTeacherController,
  verifyCodeTeacherController,
  changePasswordCodeTeacherController,
  updateTeacherController,
  updateTeacherImageController,
} = require("../controllers/teacherController");
const { photoUpload } = require("../middleware/fileUpload");
const verifyToken = require("../middleware/verifyToken");

const teacherRouter = require("express").Router();

teacherRouter.route("/:teacherId").put(verifyToken, updateTeacherController);

teacherRouter
  .route("/:teacherId/image")
  .put(verifyToken, photoUpload.single("image"), updateTeacherImageController);

teacherRouter.post(
  "/register",
  photoUpload.single("image"),
  registerTeacherController
);
teacherRouter.post("/login", loginTeacherController);
teacherRouter.post("/forgetpassword", forgetPasswordTeacherController);
teacherRouter.post("/verifycode", verifyCodeTeacherController);
teacherRouter.put("/changepassword", changePasswordCodeTeacherController);

module.exports = teacherRouter;
