import React, { useState } from "react";
import CustomPageWithoutDrawer from "../../components/CustomPageWithoutDrawer";
import CustomModal from "../../components/CustomModal";
import { Box, Button, TextField } from "@mui/material";

function ModulesPage() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    module: "",
    id: "",
  });
  const onSubmit = (values) => {
    console.log("saliiiiiit");
    console.log(values);
  };

  return (
    <CustomPageWithoutDrawer>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Créer un cours
      </Button>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "1rem",
          mt: "1rem",
        }}
      >
        <CustomModal open={open} setOpen={setOpen}>
          <h3>Créer un cours</h3>

          <TextField
            margin="normal"
            name="module"
            required
            fullWidth
            id="module"
            label="Nom du Module (obligatoire)"
            autoFocus
            onChange={(handleChange) => {
              setValues({ ...values, module: handleChange.target.value });
            }}
            sx={{
              gridColumn: "span 4",
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
            onChange={(handleChange) => {
              setValues({ ...values, id: handleChange.target.value });
            }}
            sx={{
              gridColumn: "span 4",
            }}
          />
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              onSubmit(values);
              setOpen(false);
            }}
          >
            Créer un cours
          </Button>
        </CustomModal>
      </Box>
    </CustomPageWithoutDrawer>
  );
}

export default ModulesPage;
