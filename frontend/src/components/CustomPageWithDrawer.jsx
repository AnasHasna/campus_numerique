import { Box, Toolbar } from "@mui/material";
import CustomDrarwer from "./CustomDrarwer";

function CustomPageWithDrawer({ children }) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CustomDrarwer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </div>
  );
}

export default CustomPageWithDrawer;
