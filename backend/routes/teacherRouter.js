const {
  registerTeacherController,
  loginTeacherController,
  forgetPasswordTeacherController,
  verifyCodeTeacherController,
  changePasswordCodeTeacherController,
} = require("../controllers/teacherController");
const photoUpload = require("../middleware/fileUpload");

const teacherRouter = require("express").Router();

// teacherRouter.route("/:id").put().get().delete();

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