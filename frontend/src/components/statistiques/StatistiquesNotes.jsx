import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CustomCardApercu from "./CustomCardApercu";

import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import WarningIcon from "@mui/icons-material/Warning";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function StatistiquesNotes() {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #eaeaea",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          color: "#231942",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Statistiques des notes
      </Typography>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <CustomCardApercu
            number={12.3}
            text="Note Moyenne"
            backgroundColor="#606c38"
            icon={<BarChartIcon />}
          />
          <CustomCardApercu
            number={18}
            text="Note Max"
            backgroundColor="#e76f51"
            icon={<TrendingUpIcon />}
          />
          <CustomCardApercu
            number={6}
            text="Note Min"
            backgroundColor="#f4a261"
            icon={<TrendingDownIcon />}
          />
          <CustomCardApercu
            number={24}
            text="Nombre de notes inférieures à 10"
            backgroundColor="#e9c46a"
            icon={<WarningIcon />}
          />
          <CustomCardApercu
            number={21}
            text="Nombre de notes supérieures à 10"
            backgroundColor="#264653"
            icon={<ThumbUpIcon />}
          />
          <CustomCardApercu
            number={7}
            text="Nombre de notes eliminatoires"
            backgroundColor="#2a9d8f"
            icon={<ThumbDownIcon />}
          />
        </Grid>
      </Box>
    </Stack>
  );
}

export default StatistiquesNotes;
