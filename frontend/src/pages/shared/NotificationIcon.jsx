import { Badge, Divider, IconButton, Stack, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useQuery } from "react-query";
import { getNotifications } from "../../redux/api/notificationsApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function NotificationIcon() {
  const { user } = useSelector((state) => state.auth);

  // const { isLoading, refetch } = useQuery({
  //   queryKey: "getNotifications",
  //   queryFn: () => {
  //     return getNotifications(user._id, user.token);
  //   },
  //   onSuccess: (data) => {
  //     console.log(data.data);
  //   },

  //   onError: (err) => {
  //     console.log(err);
  //   },
  //   refetchInterval: 2000,
  // });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{
          mt: 1.5,
          p: 0,
          color: "white",
        }}
        size="large"
        onClick={handleClick}
      >
        <Badge color="secondary" badgeContent={8}>
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "400px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack spacing={1} divider={<Divider />} ml={1} mr={1}>
          {[1, 2, 3, 4, 5].map((e) => (
            <Typography
              sx={{
                fontSize: "13px",
                color: "black",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                  cursor: "pointer",
                },
              }}
            >
              cznecz eczcz czcczecze,; czecpzc€czecze clkzc€clkzec zecln
            </Typography>
          ))}
          {[1, 2, 3, 4, 5].map((e) => (
            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                  cursor: "pointer",
                },
              }}
            >
              cznecz eczcz czcczecze,; czecpzc€czecze clkzc€clkzec zecln
            </Typography>
          ))}
        </Stack>
      </Menu>
    </div>
  );
}

export default NotificationIcon;
