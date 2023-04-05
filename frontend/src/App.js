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
import MyAppBar from "./pages/shared/AppBar";
import BoardPage from "./pages/board/BoardPage";
import StudentsPage from "./pages/StudentsPages/StudentsPage";
import TdsPages from "./pages/TdsPage/TdsPages";
import NotesPage from "./pages/NotesPage/NotesPage";
import StatistiquePage from "./pages/statistiques/StatistiquesPage";
import TpsPage from "./pages/TpsPage/TpsPage";

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
            <Route path="modules" element={<HomePage />} />
            <Route path="modules/:id">
              <Route index element={<BoardPage />} />
              <Route path="boards" element={<BoardPage />} />
              <Route path="etudiants" element={<StudentsPage />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="cours" element={<CoursPage />} />
              <Route path="tds" element={<TdsPages />} />
              <Route path="tps" element={<TpsPage />} />
              <Route path="exams" element={<ExamensPage />} />
              <Route path="statistiques" element={<StatistiquePage />} />
            </Route>
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
