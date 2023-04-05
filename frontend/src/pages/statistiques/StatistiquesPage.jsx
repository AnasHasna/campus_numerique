import { Stack } from "@mui/material";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";

import ApercuSection from "../../components/statistiques/ApercuSection";
import StudentsStatistiques from "../../components/statistiques/StudentsStatistiques";
import StatistiquesNotes from "../../components/statistiques/StatistiquesNotes";

function StatistiquePage() {
  return (
    <CustomPageWithDrawer>
      <Stack direction="column" spacing={2}>
        <ApercuSection />
        <StudentsStatistiques />
        <StatistiquesNotes />
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default StatistiquePage;
