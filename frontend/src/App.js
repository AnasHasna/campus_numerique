import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import ChangePasswordPage from "./pages/auth/changePasswordPage/ChangePasswordPage";
import ForgetPasswordPage from "./pages/auth/forgetPaswordPage/ForgetPasswordPage";
import LoginPage from "./pages/auth/loginPage/LoginPage";
import RegisterPage from "./pages/auth/registerPage/RegisterPage";
import VerifyCodePage from "./pages/auth/verifyCodePage/VerifyCodePage";
import CoursPage from "./pages/CoursPage/CoursPage";
import ExamensPage from "./pages/ExamensPage/ExamensPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import TdsPages from "./pages/TdsPage/TdsPages";
import MyAppBar from "./pages/shared/AppBar";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MyAppBar />

          <Routes>
            <Route index element={<HomePage />} />
            <Route path="cours" element={<CoursPage />} />
            <Route path="tds" element={<TdsPages />} />
            <Route path="examens" element={<ExamensPage />} />
            <Route path="auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="verifycode" element={<VerifyCodePage />} />
              <Route path="forgetpassword" element={<ForgetPasswordPage />} />
              <Route path="changepassword" element={<ChangePasswordPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
