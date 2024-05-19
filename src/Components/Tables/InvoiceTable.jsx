import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

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

const styles = {
  backgroundColor: "#5A4AE3",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.1rem",
  fontFamily: "'Roboto', sans-serif",
};
const stylesRows = {
  color: "#5A4AE3",
  // color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  fontFamily: "'Roboto', sans-serif",
};

export default function InvoiceTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={styles} align="left">
              Date
            </StyledTableCell>
            <StyledTableCell style={styles} align="left">
              Name
            </StyledTableCell>
            <StyledTableCell style={styles} align="right">
              Quantity
            </StyledTableCell>
            <StyledTableCell style={styles} align="right">
              Unit Price
            </StyledTableCell>
            <StyledTableCell style={styles} align="right">
              Amount
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell style={stylesRows}>
                {moment(row.date * 1000).format("DD/MM/YYYY")}
              </StyledTableCell>
              <StyledTableCell align="left" style={stylesRows}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right" style={stylesRows}>
                {row.qty}
              </StyledTableCell>
              <StyledTableCell align="right" style={stylesRows}>
                {row.price}
              </StyledTableCell>
              <StyledTableCell align="right" style={stylesRows}>
                {row.amount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
