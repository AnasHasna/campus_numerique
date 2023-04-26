import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

function TaskDetailsContent(props) {
  const { task } = props;
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Fichier</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Debut</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Bonus</TableCell>
            <TableCell>Penalty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <IconButton
                sx={{
                  color: "red",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: "4px",
                  mt: 1,
                  mb: 1,
                  width: "100%",
                }}
              >
                <FileDownloadIcon />
              </IconButton>
            </TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.debut}</TableCell>
            <TableCell>{task.fin}</TableCell>
            <TableCell>
              <Typography
                sx={{
                  color: "green",
                }}
              >
                +{task.bonus} points
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{
                  color: "red",
                }}
              >
                -{task.penalty} points
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskDetailsContent;
