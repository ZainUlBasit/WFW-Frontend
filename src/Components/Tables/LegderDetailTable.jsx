import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Columns } from "../TableColumns/Branch/ItemReturnColumns";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export default function LedgerTable({ rows, setRows, setTotal, Bill }) {
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function getTotal(items) {
    setTotal(items.map((item) => item.amount).reduce((sum, i) => sum + i, 0));
  }
  const invoiceTotal = getTotal(rows);
  const rowCellStyle = {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#5a4ae3",
    textAlign: "center",
  };
  return (
    <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          {/* to set the columns of the table */}
          <TableRow>
            {Bill && (
              <TableCell
                key={"action"}
                align={"center"}
                style={{
                  minWidth: "50px",
                  backgroundColor: "#5A4AE3",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Action
              </TableCell>
            )}
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
                    fontFamily: "'Roboto', sans-serif",
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
              {Bill && (
                <TableCell style={rowCellStyle}>
                  <DeleteSweepIcon
                    className="flex justify-center items-center hover:text-[red] transition-all ease-in-out duration-700 cursor-pointer"
                    onClick={() => {
                      setRows(rows.filter((rw, index) => i !== index));
                    }}
                  />
                </TableCell>
              )}
              <TableCell align="center" style={rowCellStyle}>
                {val.name}
              </TableCell>
              <TableCell align="left" style={rowCellStyle}>
                {val.qty}
              </TableCell>
              <TableCell align="left" style={rowCellStyle}>
                {val.price}
              </TableCell>
              <TableCell align="right" style={rowCellStyle}>
                {val.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {getTotal(rows)}
    </TableContainer>
  );
}
