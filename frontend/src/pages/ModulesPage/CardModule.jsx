import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moduleActions } from "../../redux/slices/moduleSlice";
import PoperCardModel from "./PoperCardModel";

function CardModule(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get the user from store
  const { userType } = useSelector((state) => state.auth);

  const [fullUrl, setFullUrl] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);

  const baseUrl = "http://localhost:5000/images/";

  React.useEffect(() => {
    setFileName(
      props.module.teacherId.imageUrl.substring(
        props.module.teacherId.imageUrl.lastIndexOf("\\") + 1
      )
    );
    setFullUrl(baseUrl + fileName);
  }, [userType, fileName, baseUrl]);

  const handleClickCard = () => {
    dispatch(moduleActions.selectModule(props.module));
    navigate(`${props.module._id}/boards`);
  };

  return (
    <Card
      onClick={handleClickCard}
      sx={{
        height: 150,
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        bgcolor: `${props.module.color}70`,
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
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {props.module.name}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
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
            {props.module.classe}
          </Typography>
        </Box>
        <Stack
          spacing={1}
          direction="column"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PoperCardModel module={props.module} refetch={props.refetch} />

          <Avatar
            alt={props.module.teacherId.fullName}
            src={fullUrl}
            sx={{
              height: 50,
              width: 50,
              bgcolor: "white",
            }}
          />
        </Stack>
      </Stack>
    </Card>
  );
}

export default CardModule;
