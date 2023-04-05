import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { primaryColor } from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";

const settings = [
  { setting: "Compte", route: "profile" },
  { setting: "Paramètres", route: "dashboard" },
  { setting: "Se déconnecter", route: "Logout" },
];

function MyAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();

  // get the user from store
  const { user, isLogin } = useSelector((state) => state.auth);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleGoToRoute = (e, page) => {
    e.preventDefault();
    navigate(page);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  // check if location.pathname contains "auth"
  const isAuthRoute = location.pathname.includes("auth");

  return (
    <AppBar
      position={isAuthRoute ? "static" : "fixed"}
      sx={{
        backgroundColor: primaryColor,
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/" style={{ textDecoration: "none", display: "flex" }}>
            <AdbIcon
              sx={{
                display: { xs: user && isLogin ? "none" : "flex", md: "flex" },
                mr: 1,
                color: "white",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: user && isLogin ? "none" : "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Campus Numérique
            </Typography>
          </Link>

          <AdbIcon
            sx={{
              display: { xs: user && isLogin ? "flex" : "none", md: "none" },
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: user && isLogin ? "flex" : "none", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Campus Numérique
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Box display={user && isLogin ? "none" : "flex"}>
              <Button
                sx={{ color: "white", mr: 1 }}
                variant="contained"
                onClick={(e) => {
                  handleGoToRoute(e, "auth/login");
                }}
              >
                Se Connecter
              </Button>
              <Button
                sx={{ color: "white" }}
                variant="outlined"
                onClick={(e) => {
                  handleGoToRoute(e, "auth/register");
                }}
              >
                S'inscrire
              </Button>
            </Box>
            <Box display={isLogin === true ? "flex" : "none"}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting.route === "Logout") {
                        handleLogout();
                      }
                    }}
                  >
                    <Typography textAlign="center">
                      {setting.setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyAppBar;
