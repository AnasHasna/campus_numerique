import { Stack } from "@mui/material";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";

import ApercuSection from "../../components/statistiques/ApercuSection";
import StudentsStatistiques from "../../components/statistiques/StudentsStatistiques";
import StatistiquesNotes from "../../components/statistiques/StatistiquesNotes";
import { useQuery } from "react-query";
import { getStatistiques } from "../../redux/api/moduleApi";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

function StatistiquePage() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: "getStatistiques",
    queryFn: getStatistiques,
  });

  if (isLoading) return <LoadingPage />;

  console.log(data.data);

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
