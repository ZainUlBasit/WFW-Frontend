import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { BannerHeader } from "../../Pages/Admin/Styling/BannerHeader";
import { TableWrapper } from "../../Pages/Admin/Item/Styling/ItemInfoTableStyled";
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingError from "../Loader/LoadingError";
import Search from "../Search/Search";
import { useDispatch } from "react-redux";
import { ChangePrice } from "../../store/ItemSummarySlice";

export default function ItemSummaryTable({ rows, columns, isActive_ }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [SearchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const HandleDoubleClick = (e) => {};

  return rows.length == 0 ? (
    <LoadingError />
  ) : (
    <TableWrapper isAct={isActive_} width="80px">
      <BannerHeader padding="20px 0px">Item Summary</BannerHeader>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          className="border-[2px] border-[#5A4AE3] border-t-white"
          sx={{ maxHeight: 550, borderRadius: "0px 0px 10px 10px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    className="select-none"
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#5A4AE3",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((data) => {
                  const lowercaseSearch = SearchText?.toLowerCase();
                  const lowerCaseName = data?.name?.toLowerCase();

                  return lowercaseSearch !== ""
                    ? lowerCaseName.includes(lowercaseSearch)
                    : true;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell
                        align={"left"}
                        style={{ fontWeight: "700", fontSize: "0.95rem" }}
                      >
                        {row.code}
                      </TableCell>
                      <TableCell
                        align={"left"}
                        style={{ fontWeight: "700", fontSize: "0.95rem" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align={"left"}
                        style={{ fontWeight: "700", fontSize: "0.95rem" }}
                      >
                        {row.qty}
                      </TableCell>
                      <TableCell
                        align={"left"}
                        style={{ fontWeight: "700", fontSize: "0.95rem" }}
                      >
                        <input
                          type="number"
                          value={row.price}
                          className="bg-transparent outline-none w-[100px]"
                          onChange={(e) => {
                            // handle change logic
                            dispatch(
                              ChangePrice({ index, value: e.target.value })
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align={"left"}
                        style={{ fontWeight: "700", fontSize: "0.95rem" }}
                      >
                        {row.price * row.qty}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </TableWrapper>
  );
}
