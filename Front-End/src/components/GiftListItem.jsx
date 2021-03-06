import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function GiftListItem() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Gift Name</TableCell>
            <TableCell align="center">URL</TableCell>
            <TableCell align="center">Notes</TableCell>
            <TableCell align="center">Price&nbsp;($)</TableCell>
            <TableCell align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
