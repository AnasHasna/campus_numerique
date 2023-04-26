import { Stack, Typography } from "@mui/material";
import React from "react";
import CustomTaskStudent from "./CustomTaskStudent";
import { useQuery } from "react-query";

function TaskCompletionTeacher(props) {
  const { taskCompletion } = props;

  const { isLoading } = useQuery({
    queryKey: "getAllStudent",
    queryFn: () => {},
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Les eleves qui ont fait cette tache
      </Typography>
      <Stack spacing={0.5}>
        {taskCompletion.map((e, i) => (
          <CustomTaskStudent add key={i} taskCompletion={e} />
        ))}
      </Stack>

      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Les eleves qui n'ont pas fait cette tache
      </Typography>
      <Stack spacing={0.5}>
        <CustomTaskStudent />
        <CustomTaskStudent />
        <CustomTaskStudent />
      </Stack>
    </Stack>
  );
}

export default TaskCompletionTeacher;
