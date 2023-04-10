import React, { useEffect } from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutation, useQuery } from "react-query";
import {
  confirmInvitations,
  getInvitations,
  rejectInvitations,
} from "../../redux/api/moduleApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import CustomNoDataTable from "../NotesPage/NoDataTable";
import SnackBar from "../../components/SnackBar";

function InvitationsPage() {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const [invitations, setInvitations] = React.useState([]);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [snackBarSeverity, setSnackBarSeverity] = React.useState("success");

  const [rows, setRows] = React.useState([]);
  const columns = [
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
            handleConfirmInvitation(params);
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
            handleRefuseInvitation(params);
          }}
        />
      ),
    },
  ];

  const { isLoading: isLoadingGet, refetch } = useQuery({
    queryKey: "getInvitations",
    queryFn: () => getInvitations(id, user.token),
    enabled: false,
    onSuccess: (data) => {
      setInvitations(data.data.invitations);
      let newRows = [];
      let row = {};
      for (let i = 0; i < invitations.length; i++) {
        row = {
          id: data.data.invitations[i]._id,
          name: data.data.invitations[i].student.fullName,
          cne: data.data.invitations[i].student.codeMassar,
          cni: data.data.invitations[i].student.cin,
          phone: data.data.invitations[i].student.phoneNumber,
        };
        newRows.push(row);
      }
      setRows(newRows);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { isLoading, mutate } = useMutation(
    ({ accept, invitId }) => {
      return accept
        ? confirmInvitations(id, user.token, invitId)
        : rejectInvitations(id, user.token, invitId);
    },
    {
      mutationKey: "acceptInvit",
      onSuccess: (data) => {
        setOpenSnackBar(true);
        setSnackBarMessage(data.data.message);
        setSnackBarSeverity("success");

        refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleConfirmInvitation = (params) => {
    mutate({ accept: true, invitId: params?.row?.id });
  };

  const handleRefuseInvitation = (params) => {
    mutate({ accept: false, invitId: params?.row?.id });
  };

  useEffect(() => {
    refetch();
  }, [refetch, rows, invitations]);

  if (isLoadingGet || isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={snackBarMessage}
        type={snackBarSeverity}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
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