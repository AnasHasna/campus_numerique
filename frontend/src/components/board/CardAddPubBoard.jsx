import { Avatar, Card, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

function CardAddPubBoard() {
  const [isHover, setIsHover] = useState(false);

  const handleClickCard = () => {
    setIsHover(!isHover);
    console.log(isHover);
  };

  return (
    <Card
      onClick={handleClickCard}
      sx={{
        pr: 2,
        pl: 2,
        pt: 1.3,
        pb: 1.3,
        "&:hover": {
          backgroundColor: "lightgrey",
          cursor: "pointer",
        },
      }}
    >
      <Stack direction="row">
        <Avatar
          sx={{
            mr: 2,
            backgroundColor: "blueviolet",
          }}
        />
        <Typography
          sx={{
            fontSize: "1rem",
            color: "grey",
            display: "flex",
            alignItems: "center",
          }}
        >
          Annoncer quelque chose a votre classe
        </Typography>
      </Stack>
    </Card>
  );
}

export default CardAddPubBoard;
