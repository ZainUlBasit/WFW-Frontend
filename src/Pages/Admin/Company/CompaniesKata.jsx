import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import ModalAddNewCompany from "./ModalAddNewCompany";
import TableComp from "../../../Components/Tables/TableComponent";
import { CompaniesKataColumns as Columns } from "../../../DemoData/TempData";
import AdminCompanyNav from "../../../Components/NavBar/AdminNavbars/AdminCompanyNav";
import { fetchCompanies } from "../../../store/CompanySlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CompanyKataReport from "../../../Components/Reports/CompanyKataReport";
import moment from "moment";

const CompaniesKata = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const company = useSelector((state) => state.CompanySliceReducer.data);
  const loading = useSelector((state) => state.CompanySliceReducer.loading);
  const isError = useSelector((state) => state.CompanySliceReducer.isError);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    dispatch(fetchCompanies(data));
  }, []);

  const totalAmount = useMemo(() => {
    return company.reduce((total, cust) => {
      return total + cust.total;
    }, 0);
  }, [company]);
  const totalPaid = useMemo(() => {
    return company.reduce((total, cust) => {
      return total + cust.paid;
    }, 0);
  }, [company]);
  const totalRemaining = useMemo(() => {
    return company.reduce((total, cust) => {
      return total + cust.remaining;
    }, 0);
  }, [company]);
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
          <></>
          <TableComp
            title="COMPANIES KATA"
            rows={company}
            columns={Columns}
            isActive_={isActive_}
          />
          <div className="flex justify-center items-center">
            <PDFDownloadLink
              document={
                <CompanyKataReport
                  Data={company}
                  bDate={moment(new Date()).format("DD/MM/YYYY")}
                  cTotal={
                    (company &&
                      company
                        .reduce((total, comp) => {
                          return total + Number(comp.total);
                        }, 0)
                        .toLocaleString()) ||
                    0
                  }
                  cPaid={
                    (company &&
                      company
                        .reduce((total, comp) => {
                          return total + Number(comp.paid);
                        }, 0)
                        .toLocaleString()) ||
                    0
                  }
                  cRemaining={
                    (company &&
                      company
                        .reduce((total, comp) => {
                          return total + Number(comp.remaining);
                        }, 0)
                        .toLocaleString()) ||
                    0
                  }
                />
              }
              fileName={`${"Companies Kata"}`}
            >
              <button
                className="text-white bg-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[Roboto] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:rounded-2xl hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem] text-3xl"
                onClick={(e) => {
                  // resetStates();
                }}
              >
                Download Company Kata
              </button>
            </PDFDownloadLink>
          </div>
          {open ? <ModalAddNewCompany setOpen={setOpen} open={open} /> : null}
        </div>
      ) : null}
      {company && !loading && (
        <div className="flex flex-col justify-center items-center text-2xl font-bold py-10 gap-y-2">
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Amount: {Number(totalAmount).toLocaleString()}
          </div>
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Paid: {Number(totalPaid).toLocaleString()}
          </div>
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Remaining: {Number(totalRemaining).toLocaleString()}
          </div>
        </div>
      )}
    </>
  );
};

export default CompaniesKata;
