import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import CardAddPubBoard from "../../components/board/CardAddPubBoard";
import CardPubBoard from "../../components/board/CardPubBoard";
import CardTopPageBoard from "../../components/board/CardTopPageBoard";

function BoardPage() {
  return (
    <Container
      sx={{
        pt: 4,
      }}
    >
      <Stack direction={"column"}>
        <CardTopPageBoard />

        <Divider sx={{ height: 20 }} />

        <CardAddPubBoard />

        <Divider sx={{ height: 20 }} />

        {[...Array(15)].map((e, i) => (
          <Box key={i} mb={1}>
            <CardPubBoard />
          </Box>
        ))}
      </Stack>
    </Container>
  );
}

export default BoardPage;
