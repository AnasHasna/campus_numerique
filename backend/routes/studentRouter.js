const {
  registerStudentController,
  forgetPasswordStudentController,
  verifyCodeStudentController,
  changePasswordCodeStudentController,
  loginStudentController,
} = require("../controllers/studentController");
const studentRouter = require("express").Router();

studentRouter.post("/register", registerStudentController);
studentRouter.post("/login", loginStudentController);
studentRouter.post("/forgetpassword", forgetPasswordStudentController);
studentRouter.post("/verifycode", verifyCodeStudentController);
studentRouter.put("/changepassword", changePasswordCodeStudentController);

module.exports = studentRouter;
