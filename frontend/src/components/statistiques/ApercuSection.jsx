import { Box, Grid, Stack, Typography } from "@mui/material";
import CustomCardApercu from "../../components/statistiques/CustomCardApercu";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArticleIcon from "@mui/icons-material/Article";

function ApercuSection(props) {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #eaeaea",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          color: "#231942",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Aperçu
      </Typography>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <CustomCardApercu
            number={props.files.docs}
            text="Nombre de documents"
            backgroundColor="#606c38"
            icon={<ArticleIcon />}
          />
          <CustomCardApercu
            number={props.files.cours}
            text="Nombre de cours"
            backgroundColor="#e76f51"
            icon={<LocalLibraryIcon />}
          />
          <CustomCardApercu
            number={props.files.tds}
            text="Nombre de TDs"
            backgroundColor="#f4a261"
            icon={<BookmarksIcon />}
          />
          <CustomCardApercu
            number={props.files.exams}
            text="Nombre d'exams"
            backgroundColor="#e9c46a"
            icon={<AssignmentIcon />}
          />
          <CustomCardApercu
            number={props.files.tps}
            text="Nombre de Tps"
            backgroundColor="#264653"
            icon={<AssignmentIcon />}
          />
          <CustomCardApercu
            number={88}
            text="Nombre de telechargements"
            backgroundColor="#2a9d8f"
            icon={<CloudDownloadIcon />}
          />
        </Grid>
      </Box>
    </Stack>
  );
}

export default ApercuSection;
