import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { resetPassword } from "../../../redux/api/authApi";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { userType, user } = useSelector((state) => state.auth);

  const resetSchemaPassword = yup.object().shape({
    newPassword: yup
      .string()
      .required("Obligatoire")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])/,
        "Mot de passe doit contenir au moin une lettre minuscule, majuscule et un charactére spéciale!"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords doivent se ressambler")
      .required("Obligatoire"),
  });

  const initialValuesPasswords = {
    newPassword: "",
    confirmPassword: "",
  };

  const { isLoading, mutate } = useMutation(resetPassword, {
    mutationKey: "resetPassword",

    onSuccess: (data) => {
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {},
  });

  const handleSubmit = (values) => {
    mutate({ newPassword: values.newPassword, userType, id: user._id });
  };

  return (
    <Formik
      initialValues={initialValuesPasswords}
      validationSchema={resetSchemaPassword}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form>
          <Box
            display="grid"
            gap="20px"
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Nouveau Mot de Passe"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword}
              name="newPassword"
              error={
                Boolean(touched.newPassword) && Boolean(errors.newPassword)
              }
              helperText={touched.newPassword && errors.newPassword}
              sx={{
                gridColumn: "span 2",
              }}
            />
            <TextField
              label="Confirmer Mot de Passe"
              type="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              name="confirmPassword"
              error={
                Boolean(touched.confirmPassword) &&
                Boolean(errors.confirmPassword)
              }
              helperText={touched.confirmPassword && errors.confirmPassword}
              sx={{
                gridColumn: "span 2",
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                mt: 3,
                mb: 2,
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Change Mot de passe"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordPage;
