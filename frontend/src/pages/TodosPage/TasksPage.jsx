import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { Typography } from "@mui/material";

import TableTasks from "./TableTasks";
import AddTask from "./AddTask";
import { useSelector } from "react-redux";

function TasksPage() {
  const { userType } = useSelector((state) => state.auth);
  return (
    <CustomPageWithDrawer>
      {userType === "Teacher" && <AddTask />}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Les tâches
      </Typography>
      <TableTasks />
    </CustomPageWithDrawer>
  );
}

export default TasksPage;
