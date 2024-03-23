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

export default function ItemLegderTable({
  rows,
  columns,
  title,
  isActive_,
  setSelID,
  setEditItemModal,
  setEditCompanyModal,
  Value,
  setValue,
  placeholder,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const HandleDoubleClick = (e) => {
    if (e.detail === 2) {
      setSelID(e.target.id);
      // console.log(e.target.name);
      if (title === "ITEM INFO") setEditItemModal(true);
      if (title === "COMPANIES INFO") setEditCompanyModal(true);
    }
  };
  return rows.length == 0 ? (
    <LoadingError />
  ) : (
    <TableWrapper isAct={isActive_} width="80px">
      <BannerHeader padding="20px 0px">{title.toUpperCase()}</BannerHeader>
      {/* Search Bar */}
      <div className="flex">
        <Search Value={Value} setValue={setValue} Placeholder={placeholder} />
      </div>
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
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length &&
                rows
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
                          // id={c_id}
                          onClick={HandleDoubleClick}
                          className={"font-[raleway] select-none"}
                          // key={column.id}
                          // align={column.align}
                          style={{ fontWeight: "700", fontSize: "0.95rem" }}
                        >
                          {/* {column.format && typeof value === "number" */}
                          {/* ? column.format(value) */}
                          {/* : value} */}
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
