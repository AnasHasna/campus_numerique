import { useSelector } from "react-redux";
import HeroSectionHomePage from "./HeroSectionHomePage";
import { Box, Toolbar } from "@mui/material";

function HomePage() {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <div>
      {isLogin ? (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            Modules Page
          </Box>
        </Box>
      ) : (
        <HeroSectionHomePage />
      )}
    </div>
  );
}

export default HomePage;
