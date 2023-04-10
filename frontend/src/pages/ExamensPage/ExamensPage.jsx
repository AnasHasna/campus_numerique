import { useParams } from "react-router-dom";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { useSelector } from "react-redux";
import { getAllFiles } from "../../redux/api/pubApi";
import { useQuery } from "react-query";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import CustomCardFile from "../../components/Files/CustomCardFile";

function ExamensPage() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { userType } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const { isLoading, refetch, error } = useQuery({
    queryKey: "getAllFiles",
    queryFn: () => getAllFiles(id, user.token),
    onSuccess: (d) => {
      const filtered = d.data.files.filter((file) => file.type === "exam");
      setData(filtered);
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <Stack spacing={2}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}>
          {" "}
          Les examens :
        </Typography>
        {data.map((file, i) => {
          return <CustomCardFile key={i} file={file} />;
        })}
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default ExamensPage;
