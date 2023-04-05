import {
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import BuildIcon from "@mui/icons-material/Build";
import ListIcon from "@mui/icons-material/List";
import TableChartIcon from "@mui/icons-material/TableChart";
import AppsIcon from "@mui/icons-material/Apps";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import GroupIcon from "@mui/icons-material/Group";
import { useLocation, useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Boards",
    url: "boards",
    icon: <InboxIcon />,
  },
  {
    title: "Etudiants",
    url: "etudiants",
    icon: <GroupIcon />,
  },
  {
    title: "Cours",
    url: "cours",
    icon: <ListIcon />,
  },
  {
    title: "TDS",
    url: "tds",
    icon: <TableChartIcon />,
  },
  {
    title: "TPS",
    url: "tps",
    icon: <BuildIcon />,
  },
  {
    title: "Exams",
    url: "exams",
    icon: <InsertChartOutlinedIcon />,
  },
  {
    title: "Notes",
    url: "notes",
    icon: <AppsIcon />,
  },
  {
    title: "Statistiques",
    url: "statistiques",
    icon: <EqualizerIcon />,
  },
];

const drawerWidth = 200;

function CustomDrarwer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (url) => {
    const pathArray = location.pathname.split("/");
    pathArray.pop();
    pathArray.push(url);
    navigate(pathArray.join("/"));
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sections.map((e, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: location.pathname.includes(e.url)
                  ? "grey.300"
                  : "",
              }}
            >
              <ListItemButton
                selected={location.pathname === e.url}
                onClick={() => handleClick(e.url)}
              >
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText primary={e.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default CustomDrarwer;
