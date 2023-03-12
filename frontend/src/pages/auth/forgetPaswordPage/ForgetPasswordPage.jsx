import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { forgertPassword } from "../../../redux/api/authApi";

const initialValuesTechear = {
  email: "",
};
const initialValuesStudent = {
  cin: "",
};

const validateStudentSchema = yup.object().shape({
  cin: yup.string().required("CIN Obligatoire"),
});

const validateTeacherSchema = yup.object().shape({
  email: yup.string().email("Invalide Email").required("Email Obligatoire"),
});

function ForgetPasswordPage() {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const hanldeGoToLogin = () => {
    navigate("/auth/login");
  };

  const { isLoading, mutate } = useMutation(forgertPassword, {
    mutationKey: "forgertPassword",
    onSuccess: (data) => {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
    },
    onError: (error) => {
      console.log("====================================");
      console.log(error.response.data);
      console.log("====================================");
    },
  });

  const handleSubmit = (values) => {
    mutate({ ...values, userType });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          padding: "20px",
        }}
      >
        <h1>Trouvez votre compte </h1>
        <Divider />
        <p>
          Veuillez choisir le type de compte que vous souhaitez réinitialiser le
        </p>
        <Formik
          initialValues={
            userType === "Teacher" ? initialValuesTechear : initialValuesStudent
          }
          validationSchema={
            userType === "Teacher"
              ? validateTeacherSchema
              : validateStudentSchema
          }
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
          }}
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
            <Form>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={userType}
                onChange={(e) => {
                  values.email = "";
                  values.cin = "";
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
              {userType === "Teacher" && (
                <div>
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    error={errors.email && touched.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.email}
                  />
                </div>
              )}
              {userType === "Student" && (
                <div>
                  <TextField
                    fullWidth
                    type="cin"
                    name="cin"
                    error={errors.cin && touched.cin}
                    label="CIN/Code Massar"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              )}
              <Divider />
              <Stack
                direction="row"
                spacing={2}
                mt={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={hanldeGoToLogin}
                >
                  Annuler
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    userType === "Teacher" ? !values.email : !values.cin
                  }
                  type="submit"
                  onClick={handleSubmit}
                >
                  Rechercher
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}

export default ForgetPasswordPage;
