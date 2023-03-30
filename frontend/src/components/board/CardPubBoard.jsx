import {
  Avatar,
  backdropClasses,
  Box,
  Card,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Paper from "@mui/icons-material/StickyNote2Outlined";

function CardPubBoard() {
  return (
    <Card
      sx={{
        pr: 2,
        pl: 2,
        pt: 1.3,
        pb: 1.3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
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
              Lakhel El Hassan a publié un nouveau support de cours : Corrigé -
              Série N° 4 de T.D. d'Algèbre 2
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "grey",
              }}
            >
              16 juin 2021 (Modification : 7 juil. 2021)
            </Typography>
          </Stack>
        </Box>
        <IconButton>
          <Icon>
            <MenuOutlinedIcon />
          </Icon>
        </IconButton>
      </Stack>
    </Card>
  );
}

export default CardPubBoard;
