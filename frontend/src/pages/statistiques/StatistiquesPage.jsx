import { Stack } from "@mui/material";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";

import ApercuSection from "../../components/statistiques/ApercuSection";
import StudentsStatistiques from "../../components/statistiques/StudentsStatistiques";
import StatistiquesNotes from "../../components/statistiques/StatistiquesNotes";
import { useQuery } from "react-query";
import { getStatistiques } from "../../redux/api/moduleApi";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

function StatistiquePage() {
  const { isLoading, data } = useQuery({
    queryKey: "getStatistiques",
    queryFn: getStatistiques,
    onSuccess: (data) => {
      console.log(data.data.statistiques);
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <Stack direction="column" spacing={2}>
        <ApercuSection files={data.data.statistiques.files} />
        <StudentsStatistiques students={data.data.statistiques.students} />
        <StatistiquesNotes
          marks={data.data.statistiques.marks}
          students={data.data.statistiques.students}
        />
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default StatistiquePage;
