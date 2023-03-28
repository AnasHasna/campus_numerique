const asyncHandler = require("express-async-handler");
const {
  validateAddStudent,
  Student,
  validateLoginStudent,
  validateForgetPasswordStudent,
  validateVerifyCodeStudent,
  validateUpdatedPasswordStudent,
  validateRegisterStudent,
} = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 * @description     register student
 * @router          /students/register
 * @method          POST
 * @access          public
 */

module.exports.registerStudentController = asyncHandler(async (req, res) => {
  await Student.deleteMany({});
  // validate data
  const { error } = validateRegisterStudent(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  const { fullName, cin, codeMassar, phoneNumber, password } = req.body;

  // check if email exist
  let student = await Student.findOne({ $or: [{ codeMassar }, { cin }] });
  if (student) {
    return res
      .status(400)
      .json({ status: false, message: "codeMassar or cin already exists" });
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // generate verify code Math.floor(Math.random() * (max - min + 1)) + min;
  const verifyCode = Math.floor(Math.random() * 90000) + 10000;

  // TODO: send it to whatsup

  // create new teacher and save it
  student = new Student({
    fullName,
    cin,
    codeMassar,
    phoneNumber,
    password: hashedPassword,
    verifyCode,
  });
  await student.save();

  student = await Student.findById(student._id)
    .select("-password")
    .select("-verifyCode");

  res.status(201).json({ status: true, student });
});

/**
 * @description     login student
 * @router          /students/login
 * @method          POST
 * @access          public
 */

module.exports.loginStudentController = asyncHandler(async (req, res) => {
  // validate data
  const { error } = validateLoginStudent(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }
  const { cin, codeMassar, password } = req.body;
  let student = await Student.findOne({ $or: [{ cin }, { codeMassar }] });
  if (!student) {
    return res
      .status(404)
      .json({ status: false, message: "Student not found" });
  }
  // check if the password is correct
  const passwordIsMatch = await bcrypt.compare(password, student.password);
  if (!passwordIsMatch) {
    return res
      .status(400)
      .json({ status: false, message: "password not correct" });
  }
  student = await Student.findById(student._id)
    .select("-password")
    .select("-verifyCode");
  // generate token for student
  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
  let result = { ...student.toObject(), token };
  res.status(200).json({ status: true, user: result });
});

/**
 * @description     Forget Password student
 * @router          /students/forgetpassword
 * @method          POST
 * @access          public
 */

module.exports.forgetPasswordStudentController = asyncHandler(
  async (req, res) => {
    // validate data
    const { error } = validateForgetPasswordStudent(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const { cin } = req.body;

    let student = await Student.findOne({ cin });
    if (!student) {
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    }
    // cin exist ===> generate code

    const verifyCode = Math.floor(Math.random() * 90000) + 10000;

    // TODO: send it to whatsap


    // change verify code ond DB
    await Student.findByIdAndUpdate(student._id, { $set: { verifyCode } });

    // send response to frontend
    res.status(200).json({ status: true, student });
  }
);

/**
 * @description     verify code student
 * @router          /students/verifyCode
 * @method          POST
 * @access          public
 */

module.exports.verifyCodeStudentController = asyncHandler(async (req, res) => {
  // validate data
  const { error } = validateVerifyCodeStudent(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }
  const { verifyCode, studentId } = req.body;
  let student = await Student.findById(studentId);
  if (student.verifyCode !== verifyCode) {
    return res.status(400).json({
      status: false,
      message: "Wrong verification code",
    });
  }
  student = await Student.findByIdAndUpdate(
    studentId,
    {
      $set: { isAccountVerified: true },
    },
    { new: true }
  );
  res.status(200).json({
    status: true,
  });
});

/**
 * @description     verify code student
 * @router          /students/changepassword
 * @method          PUT
 * @access          public
 */

module.exports.changePasswordCodeStudentController = asyncHandler(
  async (req, res) => {
    // validate data
    const { error } = validateUpdatedPasswordStudent(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const { studentId, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.findByIdAndUpdate(studentId, {
      $set: { password: hashedPassword },
    })
      .select("-password")
      .select("verifyCode");
    // generate token for student
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    student.token = token;
    // send response to client
    res.status(200).json({ status: true, user: student });
  }
);
