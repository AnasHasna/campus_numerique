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
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { forgetPassword } from "../../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/slices/authSlice";
import SnackBar from "../../../components/SnackBar";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [open, setOpen] = useState(false);
  const [eror, setEror] = useState("");

  const hanldeGoToLogin = () => {
    navigate("/auth/login");
  };

  const { isLoading, mutate } = useMutation(forgetPassword, {
    mutationKey: "forgetPassword",
    onSuccess: (data) => {
      dispatch(authActions.forgetPassword({ user: data.data, userType }));

      navigate("/auth/verifycode");
    },
    onError: (error) => {
      setEror(error.response.data.message);
      setOpen(true);
    },
  });

  const handleSubmit = (values) => {
    mutate({ ...values, userType });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
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
            Veuillez choisir le type de compte que vous souhaitez réinitialiser
            le
          </p>
          <Formik
            initialValues={
              userType === "Teacher"
                ? initialValuesTechear
                : initialValuesStudent
            }
            validationSchema={
              userType === "Teacher"
                ? validateTeacherSchema
                : validateStudentSchema
            }
            onSubmit={(values, { setSubmitting }) => {
              setEmail(values.email);
              setCin(values.cin);
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleChange(e);
                      }}
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
                      onChange={(e) => {
                        handleChange(e);
                        setCin(e.target.value);
                      }}
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
      {open && <SnackBar message={eror} open={open} />}
    </div>
  );
}

export default ForgetPasswordPage;
