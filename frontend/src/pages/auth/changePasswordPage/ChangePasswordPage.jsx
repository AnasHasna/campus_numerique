import {
  TextField,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";

const ChangePasswordPage = () => {
  const initialValuesChangePassword = {
    password: "",
    verifyPassword: "",
    showNewPassword: false,
    showConfirmPassword: false,
  };

  const ChangePasswSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Obligatoire")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])/,
        "Mot de passe doit contenir au moin une lettre minuscule, majuscule et un charactére spéciale !"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords doivent se ressambler")
      .required("Obligatoire"),
  });

  const [values, setValues] = useState(false);

  const handleMouseDownPassword = (event) => {
    console.log("showpass ver 1");
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      validationSchema={ChangePasswSchema}
      onSubmit={handleSubmit}
      initialValues={initialValuesChangePassword}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        // handleClickShowConfirmPassword,
        // handleClickShowPassword,
        // handleMouseDownPassword,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <InputLabel htmlFor="new-password">
                Nouveau Mot de passe
              </InputLabel>
              <TextField
                name="showNewPassword"
                id="newpassword"
                value={values.showNewPassword}
                onChange={handleChange("newPassword")}
                type={values.showNewPassword ? "text" : "password"}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box mt={2}>
              <InputLabel htmlFor="confirm-password">
                Confirmer Mot de passe
              </InputLabel>
              <TextField
                name="confirmPassword"
                id="confirm-password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                type={values.showConfirmPassword ? "text" : "password"}
                error={
                  Boolean(touched.verifyPassword) &&
                  Boolean(errors.verifyPassword)
                }
                helperText={touched.verifyPassword && errors.verifyPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Change Mot de passe
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ChangePasswordPage;
