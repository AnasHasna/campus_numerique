import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CustomCardApercu from "./CustomCardApercu";

import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import WarningIcon from "@mui/icons-material/Warning";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function StatistiquesNotes(props) {
  const { max, min, avg } = props.marks;
  const { studentLessThan7, studentsNotValidated, studentsValidated } =
    props.students;
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
            number={avg ? avg : 0}
            text="Note Moyenne"
            backgroundColor="#606c38"
            icon={<BarChartIcon />}
          />
          <CustomCardApercu
            number={max ? max.mark : 0}
            text="Note Max"
            backgroundColor="#e76f51"
            enabled={true}
            icon={<TrendingUpIcon />}
          />
          <CustomCardApercu
            number={min ? min.mark : 0}
            text="Note Min"
            enabled={true}
            backgroundColor="#f4a261"
            icon={<TrendingDownIcon />}
          />
          <CustomCardApercu
            number={studentsNotValidated ? studentsNotValidated.length : 0}
            text="Nombre de notes inférieures à 12"
            enabled={true}
            backgroundColor="#e9c46a"
            icon={<WarningIcon />}
          />
          <CustomCardApercu
            number={studentsValidated ? studentsValidated.length : 0}
            text="Nombre de notes supérieures à 12"
            backgroundColor="#264653"
            enabled={true}
            icon={<ThumbUpIcon />}
          />
          <CustomCardApercu
            number={studentLessThan7 ? studentLessThan7.length : 0}
            text="Nombre de notes eliminatoires"
            backgroundColor="#2a9d8f"
            enabled={true}
            icon={<ThumbDownIcon />}
          />
        </Grid>
      </Box>
    </Stack>
  );
}

export default StatistiquesNotes;
