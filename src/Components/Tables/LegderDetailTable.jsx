import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Columns } from "../TableColumns/Branch/ItemReturnColumns";

export default function LedgerTable({ rows, setTotal }) {
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function getTotal(items) {
    setTotal(
      items.map((item) => item.totalAmount).reduce((sum, i) => sum + i, 0)
    );
  }
  const invoiceTotal = getTotal(rows);
  const rowCellStyle = {
    fontFamily: "raleway",
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#5a4ae3",
  };
  return (
    <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          {/* to set the columns of the table */}
          <TableRow>
            {Columns.map((item, index) => {
              return (
                <TableCell
                  key={index}
                  align={item.align}
                  style={{
                    minWidth: item.minWidth,
                    backgroundColor: "#5A4AE3",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  {item.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((val, i) => (
            <TableRow key={i} style={{ border: "1px solid #5a4ae3" }}>
              <TableCell style={rowCellStyle}>{val.itemName}</TableCell>
              <TableCell align="left" style={rowCellStyle}>
                {val.itemQuantity}
              </TableCell>
              <TableCell align="left" style={rowCellStyle}>
                {val.itemPrice}
              </TableCell>
              <TableCell align="right" style={rowCellStyle}>
                {val.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {getTotal(rows)}
    </TableContainer>
  );
}
