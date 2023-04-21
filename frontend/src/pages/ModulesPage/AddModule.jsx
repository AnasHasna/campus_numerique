import {
  Box,
  Button,
  Card,
  Divider,
  Icon,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { LoadingButton } from "@mui/lab";

import { useMutation } from "react-query";
import { createModules } from "../../redux/api/moduleApi";
import { useSelector } from "react-redux";
import SnackBar from "../../components/SnackBar";

import AddIcon from "@mui/icons-material/Add";

const colors = [
  "#0096c7",
  "#c9ada7",
  "#fcbf49",
  "#52796f",
  "#4cc9f0",
  "#f72585",
  "#76c893",
  "#f9c74f",
  "#f3722c",
  "#f9844a",
  "#f8961e",
];

function AddModule(props) {
  const { user } = useSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const [values, setValues] = useState({
    name: "",
    identifiant: "",
    classe: "",
  });

  // generate random color
  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: "addModule",
    mutationFn: () => {
      return createModules(
        user._id,
        values.name,
        values.classe,
        values.identifiant,
        randomColor(),
        user.token
      );
    },
    onSuccess: (data) => {
      setSnackBarMessage(data.data.message);
      setSnackBarType("success");
      setOpenSnackBar(true);

      setOpenModal(false);
      setValues({
        name: "",
        identifiant: "",
        classe: "",
      });
      props.refetch();
    },
    onError: (err) => {
      setSnackBarMessage(err.response.data.message);
      setSnackBarType("error");
      setOpenSnackBar(true);
    },
  });

  const handleSubmit = () => {
    if (
      values.name.length < 3 ||
      values.identifiant.length < 8 ||
      values.name.length === 0 ||
      values.identifiant.length === 0 ||
      values.classe.length === 0 ||
      values.classe.length < 3
    ) {
      return;
    } else {
      mutate();
    }
  };

  return (
    <Box>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={snackBarMessage}
        type={snackBarType}
      />
      <Tooltip title="Ajouter un module">
        <Card
          onClick={() => {
            setOpenModal(true);
          }}
          sx={{
            width: "100%",
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: 1,
            boxShadow: 1,
            border: "1px dashed",
            borderColor: "primary.main",
          }}
        >
          <Icon
            sx={{
              fontSize: 60,
              color: "primary.main",
            }}
          >
            <AddIcon
              sx={{
                fontSize: 60,
                color: "primary.main",
              }}
            />
          </Icon>
        </Card>
      </Tooltip>
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <Stack spacing={2}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Ajouter un cours
          </Typography>

          <TextField
            margin="normal"
            name="module"
            required
            fullWidth
            id="module"
            label="Nom du Module"
            autoFocus
            error={values.name.length < 3 && values.name.length !== 0}
            helperText={
              values.name.length < 3 && values.name.length !== 0
                ? "Le nom du module doit contenir au moins 3 caractères"
                : ""
            }
            onChange={(handleChange) => {
              setValues({ ...values, name: handleChange.target.value });
            }}
          />
          <TextField
            margin="normal"
            name="classe"
            required
            fullWidth
            id="classe"
            label="Classe"
            autoFocus
            error={values.classe.length < 3 && values.classe.length !== 0}
            helperText={
              values.classe.length < 3 && values.classe.length !== 0
                ? "Le nom de la classe doit contenir au moins 3 caractères"
                : ""
            }
            onChange={(handleChange) => {
              setValues({ ...values, classe: handleChange.target.value });
            }}
          />
          <TextField
            margin="normal"
            name="id"
            required
            fullWidth
            id="id"
            label="Identifiant"
            autoFocus
            error={
              values.identifiant.length < 8 && values.identifiant.length !== 0
            }
            helperText={
              values.identifiant.length < 8 && values.identifiant.length !== 0
                ? "L'identifiant du module doit contenir au moins 8 caractères"
                : ""
            }
            onChange={(handleChange) => {
              setValues({ ...values, identifiant: handleChange.target.value });
            }}
          />
          <Divider />

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Annuler
            </Button>
            <LoadingButton
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
              loading={isLoading}
            >
              Créer un cours
            </LoadingButton>
          </Stack>
        </Stack>
      </CustomModal>
    </Box>
  );
}

export default AddModule;
