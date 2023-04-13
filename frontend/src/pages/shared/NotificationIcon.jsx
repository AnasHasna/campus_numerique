import { Badge, IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useSelector } from "react-redux";

function NotificationIcon() {
  const { user, isLogin, userType } = useSelector((state) => state.auth);

  return (
    <IconButton
      sx={{
        p: 0,
        color: "white",
      }}
      size="large"
    >
      <Badge color="secondary" badgeContent={8}>
        <NotificationsNoneIcon />
      </Badge>
    </IconButton>
  );
}

export default NotificationIcon;
