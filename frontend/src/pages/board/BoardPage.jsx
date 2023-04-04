import { Box, Container, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import CardAddPubBoard from "../../components/board/CardAddPubBoard";
import CardPubBoard from "../../components/board/CardPubBoard";
import CardTopPageBoard from "../../components/board/CardTopPageBoard";
import { useQuery } from "react-query";
import { getAllPubs } from "../../redux/api/pubApi";
import Loading from "../../components/Loading";

function BoardPage() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: "getAllPubs",
    queryFn: getAllPubs,
  });

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </Box>
    );

  return (
    <Container
      sx={{
        pt: 4,
        pb: 4,
      }}
    >
      <Stack direction={"column"}>
        <CardTopPageBoard />

        <Divider sx={{ height: 20 }} />

        <CardAddPubBoard refetch={refetch} />

        <Divider sx={{ height: 20 }} />

        {data.data.pubs.map((e, i) => {
          return (
            <Box key={i} mb={1}>
              <CardPubBoard pub={e} />
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
}

export default BoardPage;
