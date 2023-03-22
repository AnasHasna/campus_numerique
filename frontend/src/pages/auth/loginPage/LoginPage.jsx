import * as React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { login } from "../../../redux/api/authApi";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { authActions } from "../../../redux/slices/authSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [userType, setUserType] = useState("");
  const isTeacher = userType === "Teacher";
  const isStudent = userType === "Student";

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("stap 1 passed");
    let data = {};
    console.log("stap 2 passed");
    if (userType === "Teacher") {
      data = {
        email: values.email,
        password: values.password,
        userType: "Teacher",
      };
    } else {
      data = {
        cin: values.cin,
        password: values.password,
        userType: "Student",
      };
    }
    console.log("stap 3 passed");
    mutate(data);
    console.log("stap 4 passed");
  };

  const validateTeacherSchema = Yup.object({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    // password: Yup.string().required("Password is required"),
  });

  const initialValuesTeaacher = { email: "", password: "" };

  //////////////////////////: student

  const { isLoading, mutate } = useMutation(login, {
    mutationKey: "login",

    onSuccess: (data) => {
      dispatch(authActions.login(data.data.user));
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("====================================");
      console.log(error.response.data);
      console.log("====================================");
    },
  });

  const validateStudentSchema = Yup.object({
    cin: Yup.string("Enter your cin").required("cin is required"),
    // password: Yup.string().required("Password is required"),
  });

  const initialValuesStudent = { cin: "", password: "" };

  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      onChange={handleChange}
      initialValues={isTeacher ? initialValuesTeaacher : initialValuesStudent}
      validationSchema={
        isTeacher ? validateTeacherSchema : validateStudentSchema
      }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
        resetForm,
      }) => (
        <>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
              }}
            >
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Se connecter
            </Typography>

            <RadioGroup
              row
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
              }}
            >
              <FormControlLabel
                value="Teacher"
                control={<Radio />}
                label="Professeur"
              />
              <FormControlLabel
                value="Student"
                control={<Radio />}
                label="Etudiant"
              />
            </RadioGroup>
          </Box>
          {isStudent && (
            <Container component="main" maxWidth="xs">
              <CssBaseline />

              <Form
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cin"
                  label="CIN / Code Massar"
                  name="cin"
                  type="cin"
                  autoComplete="cin"
                  autoFocus
                  value={values.cin}
                  onChange={handleChange}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <ErrorMessage name="email" />

                <TextField
                  margin="normal"
                  fullWidth
                  required
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={values.password}
                  sx={{
                    gridColumn: "span 4",
                  }}

                  //component = {TextField}
                />
                <ErrorMessage name="password" />

                <br />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Se souvenir de moi"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "Connexion"}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link
                      variant="body2"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/auth/forgetpassword", { relative: true });
                      }}
                    >
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      variant="body2"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/auth/signup", { relative: true });
                      }}
                    >
                      Créer nouveau compte
                    </Link>
                  </Grid>
                </Grid>
                {/* </Form> */}
              </Form>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          )}

          {isTeacher && (
            <Container component="main" maxWidth="xs">
              <CssBaseline />

              <Form
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Address e-mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  sx={{
                    gridColumn: "span 4",
                  }}

                  //component = {TextField}
                />
                <ErrorMessage name="email" />

                <TextField
                  //helperText="Please enter your password"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={values.password}
                  sx={{
                    gridColumn: "span 4",
                  }}
                  //component = {TextField}
                />
                <ErrorMessage name="password" />

                <br />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Se souvenir de moi"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "Connexion"}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/auth/forgetpassword", { relative: true });
                      }}
                      variant="body2"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/auth/register", { relative: true });
                      }}
                      variant="body2"
                    >
                      Créer nouveau compte
                    </Link>
                  </Grid>
                </Grid>
                {/* </Form> */}
              </Form>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          )}
        </>
      )}
    </Formik>
  );
}