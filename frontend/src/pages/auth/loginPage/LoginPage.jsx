import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { login } from "../../../redux/api/authApi";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
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
  const [userType, setUserType] = useState("");
  const isTeacher = userType === "Teacher";
  const isStudent = userType === "Student";

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);

    if (userType === "Teacher") {
      data = {
        email: data.get("email"),
        password: data.get("password"),
        userType: "Teacher",
      };
    } else {
      data = {
        cin: data.get("cin"),
        password: data.get("password"),
        userType: "Student",
      };
    }
    mutate(data);
  };
  const validateTeacherSchema = Yup.object({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValuesTeaacher = { email: "", password: "" };

  //////////////////////////: student

  const { isLoading, mutate } = useMutation(login, {
    mutationKey: "login",

    onSuccess: (data) => {
      console.log("====================================");
      console.log(data.data);
      console.log("====================================");
    },
    onError: (error) => {
      console.log("====================================");
      console.log(error.response.data);
      console.log("====================================");
    },
  });

  const validateStudentSchema = Yup.object({
    cin: Yup.string("Enter your cin").required("cin is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValuesStudent = { cin: "", password: "" };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (isLoading) {
    return <div>isLoading</div>;
  }

  return (
    <Formik
      onSubmit={onSubmit}
      onChange={handleChange}
      initialValues={isTeacher ? initialValuesTeaacher : initialValuesStudent}
      validationSchema={
        isTeacher ? validateTeacherSchema : validateStudentSchema
      }
    >
      {(values, handleChange, handleSubmit) => (
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
              Se Connecter
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
                onSubmit={handleSubmit}
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* <Form  onSubmit={handleSubmit} > */}

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

                  //component = {TextField}
                />
                <ErrorMessage name="email" />

                <TextField
                  //helperText="Please enter your password"
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
                  onClick={handleSubmit}
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                >
                  Connexion
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Créer nouveau compte"}
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
                onSubmit={handleSubmit}
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* <Form  onSubmit={handleSubmit} > */}

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
                  onSubmit={handleSubmit}
                >
                  Connexion
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Créer nouveau compte"}
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
