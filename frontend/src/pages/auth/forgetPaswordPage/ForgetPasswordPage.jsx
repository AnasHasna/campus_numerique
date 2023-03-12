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
import { useNavigate } from "react-router-dom";

const initialValuesTechear = {
  email: "",
};
const initialValuesStudent = {
  cin: "",
};

function ForgetPasswordPage() {
  const [typeUser, setTypeUser] = useState("Teacher");
  const navigate = useNavigate();

  const hanldeGoToLogin = () => {
    navigate("/auth/login");
  };
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
            typeUser === "Teacher" ? initialValuesTechear : initialValuesStudent
          }
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email Obligatoire";
            }
            if (!values.cin) {
              errors.cin = "CIN Obligatoire";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
                value={typeUser}
                onChange={(e) => setTypeUser(e.target.value)}
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
              {typeUser === "Teacher" && (
                <div>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    error={errors.email && touched.email}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <ErrorMessage name="email" component="div" />
                </div>
              )}
              {typeUser === "Student" && (
                <div>
                  <TextField
                    type="cin"
                    name="cin"
                    error={errors.cin && touched.cin}
                    label="CIN/Code Massar"
                    helperText="Veuillez saisir votre CIN ou votre code massar"
                    onChange={(e) => {
                      setFieldValue("cin", e.target.value);
                    }}
                  />
                  <ErrorMessage name="cin" component="div" />
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
                    typeUser === "Teacher" ? !values.email : !values.cin
                  }
                  type="submit"
                  onClick={() => console.log("clicked")}
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
