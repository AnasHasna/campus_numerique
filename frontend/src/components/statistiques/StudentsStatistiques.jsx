import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CustomCardApercu from "./CustomCardApercu";

import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import CancelIcon from "@mui/icons-material/Cancel";

function StudentsStatistiques(props) {
  const {
    students,
    studentLessThan7,
    studentsNotValidated,
    studentsValidated,
  } = props.students;

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
        Statistiques des étudiants
      </Typography>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <CustomCardApercu
            number={students ? students.length : 0}
            text="Elèves inscrits"
            backgroundColor="#bc4749"
            icon={<GroupIcon />}
          />
          <CustomCardApercu
            number={studentsValidated ? studentsValidated.length : 0}
            text="Elèves validés"
            backgroundColor="#a7c957"
            icon={<CheckCircleOutlineIcon />}
          />
          <CustomCardApercu
            number={studentLessThan7 ? studentLessThan7.length : 0}
            text="Elèves en rattrapage"
            backgroundColor="#6a994e"
            icon={<RestorePageIcon />}
          />
          <CustomCardApercu
            number={studentsNotValidated ? studentsNotValidated.length : 0}
            text="Elèves non validés"
            backgroundColor="#386641"
            icon={<CancelIcon />}
          />
        </Grid>
      </Box>
    </Stack>
  );
}

export default StudentsStatistiques;
