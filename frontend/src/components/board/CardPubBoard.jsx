import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import Paper from "@mui/icons-material/StickyNote2Outlined";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, isBefore, subDays } from "date-fns";
import { fr } from "date-fns/locale";

function CardPubBoard(props) {
  const navigate = useNavigate();

  const date = new Date(props.pub.createdAt);
  console.log(props.pub.createdAt);
  console.log(date); // "2023-04-02T00:00:00.000Z"
  const now = new Date();

  let formattedDate;

  if (isBefore(date, subDays(now, 1))) {
    formattedDate = date.toLocaleDateString("fr-FR");
  } else {
    formattedDate = formatDistanceToNow(date, {
      addSuffix: true,
      locale: fr,
    });
  }

  const handleClick = () => {
    navigate(`/${props.pub._id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        pr: 2,
        pl: 2,
        pt: 1.3,
        pb: 1.3,
        "&:hover": {
          backgroundColor: "lightgrey",
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Avatar
          sx={{
            mr: 2,
            backgroundColor: "blueviolet",
          }}
        >
          <Paper />
        </Avatar>
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: "1rem",
              color: "black",
            }}
          >
            {props.pub.content}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "grey",
            }}
          >
            {formattedDate}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}

export default CardPubBoard;
