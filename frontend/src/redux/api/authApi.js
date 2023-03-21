import axios from "axios";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";

// SignUp user
const signUp = async ({ data, userType }) => {
  console.log("====================================");
  console.log({ data, userType });
  console.log("====================================");
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
  console.log("====================================");
  console.log({ userType, email, cin });
  console.log("====================================");
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/forgetPassword`, {
      email,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/forgetPassword`, {
      cin,
    });
  }
};

export { signUp, login, forgetPassword };
