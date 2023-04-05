import { Avatar, Box, Card, Icon, Stack, Typography } from "@mui/material";
import Paper from "@mui/icons-material/StickyNote2Outlined";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, isBefore, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function CardPubBoard(props) {
  const navigate = useNavigate();

  const date = new Date(props.pub.createdAt);
  const now = new Date();

  const downloadLink = props.pub.file
    ? `http://localhost:5000/files/download/${props.pub.file._id}`
    : null;

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
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row">
          <Avatar
            sx={{
              mr: 2,
              backgroundColor: "blueviolet",
            }}
          >
            <Paper />
          </Avatar>
          <Stack>
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
        </Stack>
        {props.pub.file && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a
              href={downloadLink}
              onClick={(e) => {
                e.stopPropagation();
              }}
              download
            >
              <Icon
                sx={{
                  color: "grey",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                <FileDownloadIcon />
              </Icon>
            </a>
          </Box>
        )}
      </Stack>
    </Card>
  );
}

export default CardPubBoard;
