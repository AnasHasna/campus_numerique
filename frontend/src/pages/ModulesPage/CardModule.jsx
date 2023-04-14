import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moduleActions } from "../../redux/slices/moduleSlice";

const colors = [
  "#0096c7",
  "#c9ada7",
  "#fcbf49",
  "#52796f",
  "#4cc9f0",
  "#f72585",
  "#76c893",
  "#f9c74f",
  "#f3722c",
  "#f9844a",
  "#f8961e",
];

function CardModule(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get the user from store
  const { user, userType } = useSelector((state) => state.auth);
  console.log(props);
  const [fullUrl, setFullUrl] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);

  const baseUrl = "http://localhost:5000/images/";

  React.useEffect(() => {
    if (userType === "Teacher") {
      setFileName(user.imageUrl.substring(user.imageUrl.lastIndexOf("\\") + 1));
      setFullUrl(baseUrl + fileName);
    }
  }, [userType, fileName, baseUrl]);

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const handleClickCard = () => {
    dispatch(moduleActions.selectModule(props.module));
    navigate(`${props.module._id}/boards`);
  };

  return (
    <Card
      onClick={handleClickCard}
      sx={{
        height: 100,
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        bgcolor: `${randomColor}70`,
        cursor: "pointer",

        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {props.module.name}
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {props.module.teacherId.fullName}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            3ème année
          </Typography>
        </Box>
        {userType === "Teacher" && (
          <Avatar
            alt={user.fullName}
            src={fullUrl}
            sx={{
              height: 50,
              width: 50,
              bgcolor: "white",
            }}
          />
        )}
      </Stack>
    </Card>
  );
}

export default CardModule;
