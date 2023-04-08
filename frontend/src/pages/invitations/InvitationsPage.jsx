import React from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useQuery } from "react-query";
import { getInvitations } from "../../redux/api/moduleApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import CustomNoDataTable from "../NotesPage/NoDataTable";

const demoRows = [
  {
    id: 1,
    name: "John Doe",
    cne: "ABC123",
    cni: "12345678",
    phone: "555-1234",
  },
  {
    id: 2,
    name: "Jane Smith",
    cne: "DEF456",
    cni: "87654321",
    phone: "555-5678",
  },
  {
    id: 3,
    name: "Bob Johnson",
    cne: "GHI789",
    cni: "13579246",
    phone: "555-9012",
  },
  {
    id: 4,
    name: "Alice Lee",
    cne: "JKL012",
    cni: "24681357",
    phone: "555-3456",
  },
  {
    id: 5,
    name: "David Kim",
    cne: "MNO345",
    cni: "57913524",
    phone: "555-7890",
  },
];

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Nom Complet", flex: 1 },
  { field: "cne", headerName: "CNE", flex: 1 },
  { field: "cni", headerName: "CNI", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },

  {
    field: "confirm",
    headerName: "Confirmer",
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <GridActionsCellItem
        sx={{
          color: "green",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "4px",
          width: "100%",
        }}
        icon={<CheckIcon />}
        label="Confirmer"
        onClick={() => {
          console.log("confirm", params);
        }}
      />
    ),
  },
  {
    field: "refuse",
    headerName: "Refuser",
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <GridActionsCellItem
        sx={{
          color: "red",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "4px",
          width: "100%",
        }}
        icon={<ClearIcon />}
        label="Refuser"
        onClick={() => {
          console.log("refuse", params);
        }}
      />
    ),
  },
];

function InvitationsPage() {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const [invitations, setInvitations] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const { isLoading: isLoadingGet } = useQuery({
    queryKey: "getInvitations",
    queryFn: () => getInvitations(id, user.token),
    onSuccess: (data) => {
      setInvitations(data.data.invitations);
      let newRows = [];
      let row = {};
      for (let i = 0; i < invitations.length; i++) {
        row = {
          id: i,
          name: data.data.invitations[i].student.fullName,
          cne: data.data.invitations[i].student.codeMassar,
          cni: data.data.invitations[i].student.cin,
          phone: data.data.invitations[i].student.phoneNumber,
        };
        newRows.push(row);
      }
      setRows(newRows);
    },
  });

  if (isLoadingGet) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={demoRows}
          columns={columns}
          disableColumnMenu
          editMode="row"
          rowsPerPageOptions={[5, 15, 30]}
          slots={{
            noRowsOverlay: () => (
              <CustomNoDataTable message="Aucune invitation" />
            ),
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15, 30]}
          localeText={{
            MuiTablePagination: {
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to} sur ${count !== -1 ? count : `plus de ${to}`}`,
              labelRowsPerPage: "Invitations par page",
            },
          }}
        />
      </div>
    </CustomPageWithDrawer>
  );
}

export default InvitationsPage;
