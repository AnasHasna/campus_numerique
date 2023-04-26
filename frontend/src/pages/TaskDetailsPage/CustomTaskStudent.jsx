import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";

function CustomTaskStudent(props) {
  const { isLoading, mutate } = useMutation({
    mutationKey: "addPoints",
    mutationFn: (point) => {},
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  const { taskCompletion } = props;

  return (
    taskCompletion && (
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "4px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <Typography>{taskCompletion.student.fullName}</Typography>
        <Stack direction="row" spacing={1}>
          {props.add && (
            <LoadingButton
              loading={isLoading}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "green",
              }}
            >
              +{taskCompletion.task.bonus} points
            </LoadingButton>
          )}
          <LoadingButton
            loading={isLoading}
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "red",
            }}
          >
            -{taskCompletion.task.penalty} points
          </LoadingButton>
        </Stack>
      </Stack>
    )
  );
}

export default CustomTaskStudent;
