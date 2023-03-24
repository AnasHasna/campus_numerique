const asyncHandler = require("express-async-handler");
const {
  validateRegisterTeacher,
  Teacher,
  validateLoginTeacher,
  validateUpdatedPasswordTeacher,
  validateVerifyCodeTeacher,
  validateForgetPasswordTeacher,
} = require("../models/teacherModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { JsonWebTokenError } = require("jsonwebtoken");
const sendMail = require("../utils/sendmail");

/**
 * @description     register teacher
 * @router          /teachers/register
 * @method          POST
 * @access          public
 */

module.exports.registerTeacherController = asyncHandler(async (req, res) => {
  // validate data
  const { error } = validateRegisterTeacher(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  const { fullName, email, password } = req.body;

  // check if email exist
  let teacher = await Teacher.findOne({ email });
  if (teacher) {
    return res
      .status(400)
      .json({ status: false, message: "Email déja utilisé" });
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // get the path to the image
  const imageUrl = path.join(__dirname, `../assets/${req.file.filename}`);

  // generate verify code Math.floor(Math.random() * (max - min + 1)) + min;
  const verifyCode = Math.floor(Math.random() * 90000) + 10000;

  // TODO: send it to email

  await sendMail(email, verifyCode);

  // create new teacher and save it
  teacher = new Teacher({
    fullName,
    email,
    password: hashedPassword,
    imageUrl,
    verifyCode,
  });
  await teacher.save();

  teacher = await Teacher.findById(teacher._id)
    .select("-password")
    .select("-verifyCode");

  res.status(201).json({ status: true, teacher });
});

/**
 * @description     login teacher
 * @router          /teachers/login
 * @method          POST
 * @access          public
 */

// create teacher login controller
module.exports.loginTeacherController = asyncHandler(async (req, res) => {
  const { error } = validateLoginTeacher(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  const { email, password } = req.body;
  let teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }
  const passwordIsMatch = await bcrypt.compare(password, teacher.password);
  if (!passwordIsMatch) {
    return res.status(400).json({
      status: false,
      message: "Password is incorrect",
    });
  }
  // generate token for teacher
  const accessToken = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
  teacher.token = accessToken;
  teacher = await Teacher.findById(teacher._id)
    .select("-password")
    .select("-verifyCode");
  res.status(200).json({ status: true, user: teacher });
});

/**
 * @description     Forget Password teacher
 * @router          /teachers/forgetpassword
 * @method          POST
 * @access          public
 */

module.exports.forgetPasswordTeacherController = asyncHandler(
  async (req, res) => {
    // validate data
    const { error } = validateForgetPasswordTeacher(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const { email } = req.body;

    let teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res
        .status(404)
        .json({ status: false, message: "Teacher not found" });
    }
    // email exist ===> generate code

    const verifyCode = Math.floor(Math.random() * 90000) + 10000;

    // TODO: send it to email

    // change verify code ond DB
    await Teacher.findByIdAndUpdate(teacher._id, { $set: { verifyCode } });

    // send response to frontend
    res.status(200).json({ status: true, id: teacher._id });
  }
);

/**
 * @description     verify code teacher
 * @router          /teachers/verifyCode
 * @method          POST
 * @access          public
 */

module.exports.verifyCodeTeacherController = asyncHandler(async (req, res) => {
  // validate data
  const { error } = validateVerifyCodeTeacher(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }
  const { verifyCode, teacherId } = req.body;

  const teacher = await Teacher.findById(teacherId);

  if (teacher.verifyCode != verifyCode) {
    return res.status(400).json({
      status: false,
      message: "Wrong verification code",
    });
  }

  await Teacher.findByIdAndUpdate(teacherId, {
    $set: { isAccountVerified: true },
  });

  res.status(200).json({
    status: true,
  });
});

/**
 * @description     verify code teacher
 * @router          /students/changepassword
 * @method          PUT
 * @access          public
 */

module.exports.changePasswordCodeTeacherController = asyncHandler(
  async (req, res) => {
    // validate data
    const { error } = validateUpdatedPasswordTeacher(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const { teacherId, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacher = await Teacher.findByIdAndUpdate(teacherId, {
      $set: { password: hashedPassword },
    })
      .select("-password")
      .select("-verifyCode");
    // generate token for Teacher
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
    teacher.token = token;
    // send response to client
    res.status(200).json({ status: true, user: teacher });
  }
);
