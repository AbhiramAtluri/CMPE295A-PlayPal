import { Alert, AlertTitle, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminNavBar from "./AdminNavBar";
import AdminVerficationDialog from "./AdminVerficationDialog";
import {
  getAllVerificationRequests,
  setSelected,
} from "../reduxSlices/VerificationSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function AdminHome() {
  const [openDialog, setopenDialog] = useState(false);
  const [id, setid] = useState("");
  const [type, settype] = useState("");
  const dispatch = useDispatch();
  const [entityDetails, setEntityDetails] = useState();
  const r = useSelector(
    (state) => state.verificationDetails.verificationRequests
  );

  useEffect(() => {
    dispatch(getAllVerificationRequests());
  }, []);

  const handleRowClick = (row) => {
    dispatch(setSelected(row));
    setid(row.id);
    settype(row.verificationType);

    setopenDialog(true);
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
        {/* <Alert severity="success" elevation={"5"}>
          <AlertTitle>Approved</AlertTitle>
          Reuquest has been approved
        </Alert> */}
      </div>
      <div style={{ paddingLeft: "3%", paddingRight: "3%" }}>
        <div style={{ height: 400, width: "100%" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Verification Request Date</TableCell>
                  <TableCell> Verification Type</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {r.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>

                    <TableCell>
                      {row.verificationType == "coach"
                        ? row.firstname + " " + row.lastname
                        : row.venuename}
                    </TableCell>
                    <TableCell>{row.verificationReqDT}</TableCell>
                    <TableCell>{row.verificationType}</TableCell>
                    <TableCell>{row.experiences}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <AdminVerficationDialog
          openDialog={openDialog}
          closeDialog={() => setopenDialog(false)}
          id={id}
          type={type}
          // details={entityDetails}
        ></AdminVerficationDialog>
      </div>
    </div>
  );
}
