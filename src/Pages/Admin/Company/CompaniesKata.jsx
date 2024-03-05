import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import ModalAddNewCompany from "./ModalAddNewCompany";
import TableComp from "../../../Components/Tables/TableComponent";
import { CompaniesKataColumns as Columns } from "../../../DemoData/TempData";
import AdminCompanyNav from "../../../Components/NavBar/AdminNavbars/AdminCompanyNav";
import { fetchCompanies } from "../../../store/CompanySlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";

const CompaniesKata = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const company = useSelector((state) => state.CompanySliceReducer.data);
  const loading = useSelector((state) => state.CompanySliceReducer.loading);
  const isError = useSelector((state) => state.CompanySliceReducer.isError);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <AdminCompanyNav setOpen={setOpen} />
      {loading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : company ? (
        <div className="transition-all duration-[5s]">
          <TableComp
            title="COMPANIES KATA"
            rows={company.filter((comp) => {
              if (data.userdata.fullName == "Admin") return comp;
              else return comp.shop == data.userdata.fullName;
            })}
            columns={Columns}
            isActive_={isActive_}
          />
          {open ? <ModalAddNewCompany setOpen={setOpen} open={open} /> : null}
        </div>
      ) : null}
    </>
  );
};

export default CompaniesKata;
