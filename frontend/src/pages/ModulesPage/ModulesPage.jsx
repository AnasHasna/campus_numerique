import CustomPageWithoutDrawer from "../../components/CustomPageWithoutDrawer";
import { Stack } from "@mui/material";
import AllModules from "./AllModules";
import { useSelector } from "react-redux";
import AddModule from "./AddModule";
import RejoindreModule from "./RejoindreModule";
import { useQuery } from "react-query";
import { useState } from "react";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getAllModules } from "../../redux/api/moduleApi";

function ModulesPage() {
  const { userType, user } = useSelector((state) => state.auth);

  const [modules, setModules] = useState([]);

  const { isLoading, refetch } = useQuery({
    queryKey: "modules",
    queryFn: () => {
      return getAllModules(user._id, userType, user.token);
    },

    onSuccess: (data) => {
      setModules(data.data.modules);
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithoutDrawer>
      <Stack spacing={2}>
        {userType === "Teacher" ? (
          <AddModule refetch={refetch} />
        ) : (
          <RejoindreModule />
        )}
        <AllModules modules={modules} />
      </Stack>
    </CustomPageWithoutDrawer>
  );
}

export default ModulesPage;
