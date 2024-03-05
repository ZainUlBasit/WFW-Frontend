import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SimpleTableComp({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              style={{
                backgroundColor: "#5A4AE3",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              Name
            </StyledTableCell>
            <StyledTableCell
              style={{
                backgroundColor: "#5A4AE3",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "'Raleway', sans-serif",
              }}
              align="right"
            >
              Total Amount
            </StyledTableCell>
            <StyledTableCell
              style={{
                backgroundColor: "#5A4AE3",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "'Raleway', sans-serif",
              }}
              align="right"
            >
              Paid Amount
            </StyledTableCell>
            <StyledTableCell
              style={{
                backgroundColor: "#5A4AE3",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "'Raleway', sans-serif",
              }}
              align="right"
            >
              Discount Amount
            </StyledTableCell>
            <StyledTableCell
              style={{
                backgroundColor: "#5A4AE3",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "'Raleway', sans-serif",
              }}
              align="right"
            >
              Remaining Amount
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.total_amount}
              </StyledTableCell>
              <StyledTableCell align="right">{row.paid_amount}</StyledTableCell>
              <StyledTableCell align="right">
                {row.discount_amount}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.remaining_amount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
