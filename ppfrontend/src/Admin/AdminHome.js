import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminNavBar from "./AdminNavBar";

export default function AdminHome() {
  const rows = [
    { id: 1, name: "Snow", type: "Coach", date: 35 },
    { id: 2, name: "Lannister", type: "Coach", date: 42 },
    { id: 3, name: "Lannister", type: "Coach", date: 45 },
    { id: 4, name: "Stark", type: "Coach", date: 16 },
    { id: 5, name: "Targaryen", type: "Coach", date: null },
    { id: 6, name: "Melisandre", type: "Coach", date: 150 },
    { id: 7, name: "Clifford", type: "Coach", date: 44 },
    { id: 8, name: "Frances", type: "Coach", date: 36 },
    { id: 9, name: "Roxie", type: "Coach", date: 65 },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 70, filterable: false },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      filterable: false,
    },
    {
      field: "date",
      type: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "type",
      headerName: "Verfication Type",
      width: 130,
    },
    {
      headerName: "Actions",
      width: 130,
    },
  ];
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
            filterMode="client"
          />
        </div>
      </div>
    </div>
  );
}
