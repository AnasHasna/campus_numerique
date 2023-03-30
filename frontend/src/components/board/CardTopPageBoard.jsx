import { Box, Card, Typography } from "@mui/material";
import React from "react";

function CardTopPageBoard() {
  return (
    <Card
      sx={{
        backgroundColor: "blueviolet",
        height: "230px",
        width: "100%",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h4" sx={{ color: "white" }}>
          Modulisation stockastique
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }}>
          Filiere GII1 2023
        </Typography>
      </Box>
    </Card>
  );
}

export default CardTopPageBoard;
