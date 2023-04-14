import { Grid } from "@mui/material";
import React from "react";
import CardModule from "./CardModule";

function AllModulesStudent(props) {
  return (
    <Grid container spacing={2}>
      {props.modules.map((e, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={e}>
          <CardModule module={props.modules[index]} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AllModulesStudent;
