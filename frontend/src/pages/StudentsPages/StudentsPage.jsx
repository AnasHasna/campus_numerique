import React, { useState } from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import PersonComponent from "../../components/students/PersonComponent";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getStudents } from "../../redux/api/moduleApi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

function StudentsPage() {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [studentArr, setStudentArr] = useState([]);
  const [teacher, setTeacher] = useState({});
  const { isLoading, refetch } = useQuery({
    queryKey: "getStudents",
    queryFn: () => getStudents(id, user.token),
    enabled: false,
    onSuccess: (data) => {
      setStudentArr(data.data.students);
      setTeacher(data.data.teacher);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <LoadingPage />;
  return (
    <CustomPageWithDrawer>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: 600 }}
        mb={6}>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ gap: 3 }}
          minWidth="800px"
          justifyContent="left">
          <Typography variant="h4" ml={3} style={{ color: "#071A2F" }}>
            Ensaignants
          </Typography>
          <Divider sx={{ backgroundColor: "#071A2F" }} variant="fullWidth" />
          <PersonComponent
            name={teacher.fullName}
            imageUrl={teacher.imageUrl}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: 600 }}>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ gap: 3 }}
          minWidth="800px"
          justifyContent="left">
          <Typography variant="h4" ml={3} style={{ color: "#071A2F" }}>
            Etudiants
          </Typography>
          <Divider sx={{ backgroundColor: "#071A2F" }} variant="fullWidth" />
          {studentArr.map((student, i) => (
            <PersonComponent key={i} name={student.fullName} />
          ))}
        </Box>
      </Box>
    </CustomPageWithDrawer>
  );
}

export default StudentsPage;
