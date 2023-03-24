import { Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import * as yup from "yup";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";
import {
  Box,
  FormControl,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "react-query";
import { signUp } from "../../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import SnackBar from "../../../components/SnackBar";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/slices/authSlice";
import Loading from "../../../components/Loading";

const registerSchemaTeacher = yup.object().shape({
  fullName: yup.string().required("Obligatoire"),
  email: yup
    .string()
    .email("invalide email")
    .required("Obligatoire")
    .matches(
      /@uca\.ac\.ma$/,
      "Email doit contenir un domaine UCA (@uca.ac.ma)"
    ),
  picture: yup.string().required("Obligatoire"),
  password: yup
    .string()
    .required("Obligatoire")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])/,
      "Mot de passe doit contenir au moin une lettre minuscule, majuscule et un charactére spéciale !"
    ),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords doivent se ressambler")
    .required("Obligatoire"),
});

const registerSchemaStudent = yup.object().shape({
  fullName: yup.string().required("Obligatoire"),
  codeMassar: yup.string().required("Obligatoire"),
  cin: yup.string().required("Obligatoire"),
  phoneNumber: yup.number().positive().integer().required("Obligatoire"),
  password: yup
    .string()
    .required("Obligatoire")
    .matches(
      /^(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&])/,
      "Mot de passe doit contenir au moin une lettre minuscule, majuscule et un charactére spéciale !"
    ),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Obligatoire"),
});

const initialValuesRegisterTeacher = {
  fullName: "",
  email: "",
  picture: "",
  password: "",
  verifyPassword: "",
};

const initialValuesRegisterStudent = {
  fullName: "",
  codeMassar: "",
  cin: "",
  phoneNumber: "",
  password: "",
  verifyPassword: "",
};

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

function FormRegister() {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("");
  const [open, setOpen] = useState(false);
  const [eror, setEror] = useState("");
  const isTeacher = userType === "Teacher";
  const isStudent = userType === "Student";
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(signUp, {
    mutationKey: "signUp",
    onSuccess: (data) => {
      // console.log("====================================");
      // console.log(data.data);
      // console.log("====================================");
      navigate("/auth/verifycode");
      dispatch(authActions.signUp({ user: data.data, userType }));
    },
    onError: (error) => {
      // console.log("====================================");
      // console.log(error.response.data);
      // console.log("====================================");
      // return <SnackBar message={error.response.data} />;
      setEror(error.response.data.message);
      setOpen(true);
      console.log(error.response.data);
    },
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    let formData = new FormData();

    if (userType === "Teacher") {
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("image", picture);
    } else {
      formData = {
        fullName: values.fullName,
        codeMassar: values.codeMassar,
        cin: values.cin,
        phoneNumber: values.phoneNumber,
        password: values.password,
      };
    }
    mutate({ data: formData, userType });
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Formik
        initialValues={
          isTeacher
            ? initialValuesRegisterTeacher
            : initialValuesRegisterStudent
        }
        validationSchema={
          isTeacher ? registerSchemaTeacher : registerSchemaStudent
        }
        onSubmit={handleFormSubmit}
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
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                marginTop: 8,
                marginBottom: "30px",
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
                <AssignmentIndIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                S'inscrire
              </Typography>
            </Box>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4,minmax(0, 1fr))"
              sx={{
                "& : div": { gridColumn: { xs: "span 4", sm: undefined } },
              }}
            >
              <TextField
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <FormControl
                sx={{
                  gridColumn: "span 4",
                  marginLeft: "2%",
                }}
              >
                <FormLabel>Profession</FormLabel>
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
              </FormControl>
              {isTeacher && (
                <>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      gridColumn: "span 4",
                    }}
                  />
                  <Box
                    gridColumn="span 4"
                    border="1px solid black"
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setPicture(acceptedFiles[0]);
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border="2px dashed"
                          p="1rem"
                          sx={{
                            "&:hover": { cursor: "pointer" },
                          }}
                        >
                          <input {...getInputProps()} />
                          {values.picture ? (
                            <Typography>{values.picture.name}</Typography>
                          ) : (
                            <p>Add Picture Here</p>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              {isStudent && (
                <>
                  <TextField
                    label="Cin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cin}
                    name="cin"
                    error={Boolean(touched.cin) && Boolean(errors.cin)}
                    helperText={touched.cin && errors.cin}
                    sx={{
                      gridColumn: "span 2",
                    }}
                  />
                  <TextField
                    label="Code Massar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.codeMassar}
                    name="codeMassar"
                    error={Boolean(touched.massar) && Boolean(errors.massar)}
                    helperText={touched.massar && errors.massar}
                    sx={{
                      gridColumn: "span 2",
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={
                      Boolean(touched.phoneNumber) &&
                      Boolean(errors.phoneNumber)
                    }
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{
                      gridColumn: "span 4",
                    }}
                  />
                </>
              )}
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                label="Confirm Password"
                type="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.verifyPassword}
                name="verifyPassword"
                error={
                  Boolean(touched.verifyPassword) &&
                  Boolean(errors.verifyPassword)
                }
                helperText={touched.verifyPassword && errors.verifyPassword}
                sx={{
                  gridColumn: "span 2",
                }}
              />
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(4,minmax(0, 1fr))">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, p: "0.5rem", gridColumn: "span 4" }}
              >
                {isLoading ? <Loading /> : "Se connecter"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
        <Link href="#" variant="body2" onClick={() => navigate("/auth/login")}>
          {"Vous avez déja un comptre? Se Connecter"}
        </Link>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />

      {open && <SnackBar message={eror} open={open} />}
    </Box>
  );
}
export default FormRegister;
