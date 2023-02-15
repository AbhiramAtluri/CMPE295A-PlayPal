import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminNavBar from "./AdminNavBar";
import AdminVerficationDialog from "./AdminVerficationDialog";

export default function AdminHome() {
  const [openDialog, setopenDialog] = useState(false);
  const [id, setid] = useState("");
  const [type, settype] = useState("");
  const rows = [
    { id: 1, name: "Snow", type: "Coach", date: "11/05/2022" },
    { id: 2, name: "Lannister", type: "Coach", date: "11/05/2022" },
    { id: 3, name: "Lords Cricket Stadium", type: "Venue", date: "11/05/2022" },
    { id: 4, name: "Stark", type: "Coach", date: "11/05/2022" },
    {
      id: 5,
      name: "Targaryen football Stadium",
      type: "Venue",
      date: "10/24/2022",
    },
    { id: 6, name: "Melisandre", type: "Coach", date: "11/05/2022" },
    { id: 7, name: "Clifford", type: "Coach", date: "11/05/2022" },
    { id: 8, name: "Frances", type: "Coach", date: "11/05/2022" },
    { id: 9, name: "Roxie", type: "Coach", date: "11/05/2022" },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 70, filterable: false },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      filterable: false,
    },
    {
      field: "date",
      type: "date",
      headerName: "Verification Request Date",
      width: 200,
    },
    {
      field: "type",
      headerName: "Verfication Type",
      width: 130,
    },
    {
      headerName: "Remarks",
      width: 130,
    },
  ];
  const handleRowClick = (e) => {
    console.log(e);
    setopenDialog(true);
    setid(e.row.id);
    settype(e.row.type);
  };
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div style={{ padding: "3%" }}>
        <Typography
          variant="h5"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "fantasy",
            fontWeight: 1000,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Verfication Requests
        </Typography>
      </div>
      <div style={{ paddingLeft: "3%", paddingRight: "3%" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            // components={{ Toolbar: GridToolbar }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // filterMode="client"
            onRowClick={(e) => handleRowClick(e)}
          />
        </div>
        <AdminVerficationDialog
          openDialog={openDialog}
          closeDialog={() => setopenDialog(false)}
          id={id}
          type={type}
        ></AdminVerficationDialog>
      </div>
    </div>
  );
}
