import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

function CustomPersonMessages() {
  return (
    <Stack
      direction="column"
      spacing={0.5}
      sx={{
        alignItems: "center",
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "#F2F2F2",
        },
      }}
    >
      <Avatar />
      <Typography
        variant="h6"
        sx={{
          color: "#071A2F",
          fontWeight: "bold",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Hassan bensaltana
      </Typography>
    </Stack>
  );
}

export default CustomPersonMessages;
