import axios from "axios";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";

// SignUp user
const signUp = async ({ firstName, lastName, email, password }) => {
  const user = { firstName, lastName, email, password };
  return await axios.post("http://localhost:5000/auth/register", user);
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

export { signUp, login };
