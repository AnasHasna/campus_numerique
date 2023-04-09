import React from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import CustomPersonMessages from "./CustomPersonMessages";

function MessagesPages() {
  return (
    <CustomPageWithDrawer>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          p: 2,
          zIndex: 998,
        }}
      >
        czcz
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            position: "fixed",
            right: 0,
            top: 100,
            bottom: 0,
            overflow: "auto",
            p: 2,
            zIndex: 999,
          }}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((item) => (
            <CustomPersonMessages key={item} />
          ))}
        </Stack>
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default MessagesPages;
