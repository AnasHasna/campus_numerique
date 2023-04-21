import axios from "axios";

// SignUp user
const signUp = async ({ data, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/register`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return await axios.post(`http://localhost:5000/students/register`, data);
  }
};
// login Teacher
const login = async ({ email, password, cin, codeMassar, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/login`, {
      email,
      password,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/login`, {
      cin,
      codeMassar,
      password,
    });
  }
};

const forgetPassword = async ({ email, cin, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/forgetPassword`, {
      email,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/forgetpassword`, {
      cin,
    });
  }
};
const verifyCode = async ({ verifyCode, _id, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/verifyCode`, {
      verifyCode,
      teacherId: _id,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/verifyCode`, {
      verifyCode,
      studentId: _id,
    });
  }
};

const resetPassword = async ({ newPassword, userType, id }) => {
  if (userType === "Teacher") {
    return await axios.put("http://localhost:5000/teachers/changepassword", {
      teacherId: id,
      password: newPassword,
    });
  } else {
    return await axios.put(`http://localhost:5000/students/changepassword`, {
      studentId: id,
      password: newPassword,
    });
  }
};

const updateTeacher = async ({ id, data, token }) => {
  return await axios.put(`http://localhost:5000/teachers/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateStudent = async ({ id, data, token }) => {
  return await axios.put(`http://localhost:5000/students/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const changeTeacherPicture = async ({ id, data, token }) => {
  return await axios.put(`http://localhost:5000/teachers/${id}/image`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const resendCode = async (email, phoneNumber, userType) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/resendCode`, {
      email,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/resendCode`, {
      phoneNumber,
    });
  }
};

export {
  signUp,
  login,
  forgetPassword,
  verifyCode,
  resetPassword,
  updateTeacher,
  updateStudent,
  changeTeacherPicture,
  resendCode,
};
