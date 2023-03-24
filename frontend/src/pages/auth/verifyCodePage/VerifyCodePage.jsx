import {
  Box,
  Divider,
  Card,
  TextField,
  Stack,
  Link,
  Button,
} from "@mui/material";
import * as yup from "yup";
import React from "react";
import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import { verifyCode } from "../../../redux/api/authApi";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SnackBar from "../../../components/SnackBar";

const initialValues = {
  verifyCode: "",
};
const validateSchema = yup.object().shape({
  verifyCode: yup.number().required("Entrer votre code de vérification"),
});

function VerifyCodePage() {
  const userType = useSelector((state) => state.auth.userType);
  const user = useSelector((state) => state.auth.user);
  const verificationType = useSelector((state) => state.auth.verificationType);
  const [open, setOpen] = useState(false);
  const [eror, setEror] = useState("");
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(verifyCode, {
    mutationKey: "verifyCode",
    onSuccess: (data) => {
      if (verificationType === "signUp") {
        navigate("/auth/login", { replace: true });
      } else {
        navigate("/auth/resetpassword", { replace: true });
      }
    },
    onError: (error) => {
      setEror(error.response.data.message);
      setOpen(true);
    },
  });
  const handleSubmit = (values) => {
    let _id = user._id;
    mutate({ ...values, userType, _id });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Card
          sx={{
            padding: "20px",
          }}
        >
          <h1>Entrer votre code de sécurité.</h1>
          <Divider />
          <p>
            Merci de vérifier que vous avez reçu un message avec votre.
            <br /> Celui-ci est composé de 5 chiffres.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
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
                <Stack
                  direction="row"
                  spacing={2}
                  mt={2}
                  sx={{
                    display: "flex",
                  }}
                >
                  <TextField
                    fullWidth
                    type="verifyCode"
                    name="verifyCode"
                    label="Code de vérification"
                    value={values.verifyCode}
                    error={errors.verifyCode && touched.verifyCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.verifyCode}
                  />
                  <p>
                    Nous avons envoyer votre code à:{" "}
                    {userType === "Teacher" ? user.email : user.phoneNumber}
                    <br />
                    <br /> Celui-ci est composé de 5 chiffres.
                  </p>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  spacing={2}
                  mt={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link>Code non reçu?</Link>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={2}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isLoading || !values.verifyCode}
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      {isLoading ? <Loading /> : "Continuer"}
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
      {open && <SnackBar message={eror} open={open} />}
    </>
  );
}

export default VerifyCodePage;
