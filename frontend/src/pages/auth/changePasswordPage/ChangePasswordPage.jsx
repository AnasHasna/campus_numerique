import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const ChangePasswordPage = () => {
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <InputLabel htmlFor="new-password">Nouveau Mot de passe</InputLabel>
        <TextField
          id="new-password"
          type="password"
          value={values.newPassword}
          onChange={handleChange("newPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword("showNewPassword")}
                >
                  {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
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
          id="confirm-password"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword("showConfirmPassword")}
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
  );
};

export default ChangePasswordPage;
