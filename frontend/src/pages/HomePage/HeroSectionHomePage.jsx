import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
      height: `calc(100vh - 80px)`,
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
    pt: 18,
  },
};

function HeroSectionHomePage() {
  return (
    <Box component="div" sx={styles.demoWrap }>
      <Container>
        <Stack direction="column" spacing={1} sx={styles.demoContent}>
          <Typography variant="h3" sx={{ color: black, fontWeight: "bold" }}>
            EDUCATION ONLINE
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: orange,
              alignItems: "center",
            }}
          >
            Empowering the Next Generation of Learners: Join the Online
            Classroom Revolution Today!
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
            Welcome to [Website Name], where teachers and students come together
            to learn, grow, and succeed. Our platform is designed to provide a
            seamless, interactive learning experience that will help you reach
            your full potential. Whether you're a teacher looking to enhance
            your students' education or a student eager to expand your
            knowledge, [Website Name] is the perfect place to start.
          </Typography>
          <Stack direction="row" pt={7}>
            <Box>
              <Button
                sx={{ color: "white", width: "120px", mr: "14px" }}
                variant="contained"
              >
                Login
              </Button>
              <Button
                sx={{ color: "black", width: "120px" }}
                variant="outlined"
              >
                Sign Up
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default HeroSectionHomePage;
