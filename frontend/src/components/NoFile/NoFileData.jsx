import { Box } from "@mui/material";
import React from "react";

import Lottie from "lottie-react";
import noData from "../../static/lotties/no-file.json";

function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie animationData={noData} loop={true} />;
    </Box>
  );
}

export default LoadingPage;
