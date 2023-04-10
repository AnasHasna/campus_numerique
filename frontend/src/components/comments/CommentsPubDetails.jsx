import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CommentsPubDetails = (props) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>

      <ListItemText
        // TODO : Add student name
        primary="Student Name"
        secondary={<React.Fragment>{props.content}</React.Fragment>}
      />
    </ListItem>
  );
};

export default CommentsPubDetails;
