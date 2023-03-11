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

const registerSchemaTeacher = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  picture: yup.string().required("required"),
  password: yup.string().required("required"),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
});

const registerSchemaStudent = yup.object().shape({
  fullName: yup.string().required("required"),
  massar: yup.string().required("required"),
  cin: yup.string().required("required"),
  phoneNumber: yup.number().positive().integer().required("required"),
  password: yup.string().required("required"),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
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
  massar: "",
  cin: "",
  phoneNumber: "",
  password: "",
  verifyPassword: "",
};

function FormRegister() {
  const [userType, setUserType] = useState("");
  const isTeacher = userType === "Teacher";
  const isStudent = userType === "Student";
  // const isNonMobile = useMediaQuery("(min-width:600)");

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
        onSubmit={() => {}}
        initialValues={
          isTeacher
            ? initialValuesRegisterTeacher
            : initialValuesRegisterStudent
        }
        validationSchema={
          isTeacher ? registerSchemaTeacher : registerSchemaStudent
        }
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
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
                Sign in
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
                    label="Teacher"
                  />
                  <FormControlLabel
                    value="Student"
                    control={<Radio />}
                    label="Student"
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
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
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
                    value={values.massar}
                    name="massar"
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
                type="verifyPassword"
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
                sx={{ mt: 3, mb: 2, p: "0.5rem", gridColumn: "span 4" }}
                onClick={() => {
                  setUserType("");
                  resetForm();
                }}
              >
                {" "}
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
        <Link href="#" variant="body2">
          {"You have an account? Sign In"}
        </Link>
      </Box>
    </Box>
  );
}
export default FormRegister;
