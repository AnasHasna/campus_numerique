import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BgHero from "../../static/images/bghero.jpg";
import { black, orange } from "../../utils/colors";

const styles = {
  demoWrap: {
    position: "relative",
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: `calc(100vh)`,
      opacity: { xs: 0.1, sm: 0.1, md: 0.3, lg: 1 },
      backgroundImage: `url(${BgHero})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 0",
      backgroundSize: "cover",
    },
  },
  demoContent: {
    position: "relative",
    width: { xs: "100%", sm: "100%", md: "50%", lg: "35%" },
    alignItems: { xs: "center", sm: "center", md: "start" },
    textAlign: { xs: "center", sm: "center", md: "start" },
    pt: 10,
  },
};

function HeroSectionHomePage() {
  const navigate = useNavigate();

  const handleClickSeConnect = (e) => {
    e.preventDefault();
    navigate("auth/login");
  };
  const handleClickSinscrire = (e) => {
    e.preventDefault();
    navigate("auth/register");
  };
  return (
    <Box component="div" sx={styles.demoWrap}>
      <Container>
        <Stack direction="column" spacing={1} sx={styles.demoContent}>
          <Typography variant="h3" sx={{ color: black, fontWeight: "bold" }}>
            EDUCATION
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: orange,
              alignItems: "center",
            }}
          >
            Autonomiser la prochaine génération d'apprenants : rejoignez la
            révolution des salles de classe en ligne dès aujourd'hui !
          </Typography>

          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.1,
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Bienvenue sur MonSite, la plateforme éducative en ligne ultime pour
            les enseignants et les élèves. Créez des salles de classe
            virtuelles, partagez des fichiers et des devoirs, et communiquez
            facilement avec vos élèves. Rejoignez-nous dès maintenant et
            découvrez comment Classroom peut transformer votre expérience
            d'apprentissage.
          </Typography>
          <Stack direction="row" pt={7}>
            <Box>
              <Button
                onClick={(e) => handleClickSeConnect(e)}
                sx={{ color: "white", mr: "14px" }}
                variant="contained"
              >
                Se Connecter
              </Button>
              <Button
                sx={{ color: "black", width: "120px" }}
                variant="outlined"
                onClick={(e) => handleClickSinscrire(e)}
              >
                S'inscrire
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default HeroSectionHomePage;
