import React, { useState } from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { Typography } from "@mui/material";

import TaskDetailsContent from "./TaskDetailsContent";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getSingleTask } from "../../redux/api/moduleApi";
import { useParams } from "react-router-dom";

function TaskDetailsPage() {
  const { userType, user } = useSelector((state) => state.auth);
  const [taskCompletion, setTaskCompletion] = useState([]);
  const [task, setTask] = useState(null);
  const { id: moduleId, taskId } = useParams();
  const { isLoading } = useQuery({
    queryKey: "taskDetail",
    queryFn: () => {
      return getSingleTask(moduleId, taskId, user.token);
    },
    onSuccess: (data) => {
      setTaskCompletion(data.data.taskCompletion);
      setTask(data.data.task);
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <Typography>Detail du taches</Typography>
      <TaskDetailsContent task={task} />
    </CustomPageWithDrawer>
  );
}

export default TaskDetailsPage;
