import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { primaryColor } from "../../utils/colors";
import { useSelector } from "react-redux";

const pages = [
  { page: "Cours", route: "/cours" },
  { page: "TDS", route: "/tds" },
  { page: "EXAMENS", route: "/examens" },
];
const settings = [
  { setting: "Profile", route: "profile" },
  { setting: "Account", route: "account" },
  { setting: "Dashboard", route: "dashboard" },
  { setting: "Logout", route: "Logout" },
];

function MyAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // get the user from store
  const { user } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleGoToRoute = (e, page) => {
    e.preventDefault();
    navigate(page);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: primaryColor }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/" style={{ textDecoration: "none", display: "flex" }}>
            <AdbIcon
              sx={{
                display: { xs: user ? "none" : "flex", md: "flex" },
                mr: 1,
                color: "white",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: user ? "none" : "flex", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: user ? "none" : "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: user ? "flex" : "none" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: user === null ? "none" : "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.page}
                  onClick={(e) => {
                    handleCloseNavMenu();
                    handleGoToRoute(e, page.page);
                  }}
                >
                  <Typography textAlign="center" variant="6">
                    {page.page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            sx={{ display: { xs: user ? "flex" : "none", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: user ? "flex" : "none", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: user === null ? "none" : "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.page}
                onClick={(e) => {
                  handleCloseNavMenu();
                  handleGoToRoute(e, page.page);
                }}
                sx={{ my: 1, color: "white", display: "block", fontSize: 16 }}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box display={user !== null ? "none" : "flex"}>
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
            <Box display={user !== null ? "flex" : "none"}>
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
                  <MenuItem key={setting.setting} onClick={handleCloseUserMenu}>
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
