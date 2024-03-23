import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalAddNewCompany from "./ModalAddNewCompany";
import Navbar from "../../../Components/NavBar/NavBar";
import TableComp from "../../../Components/Tables/TableComponent";
import { Columns } from "../../../DemoData/CompaniesInfoColumns";
import AdminCompanyNav from "../../../Components/NavBar/AdminNavbars/AdminCompanyNav";
import ModalEditCompany from "./ModalEditCompany";
import { fetchCompanies } from "../../../store/CompanySlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import LoadingError from "../../../Components/Loader/LoadingError";

const AdminCompany = () => {
  let company = useSelector((state) => state.CompanySliceReducer.data);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [SearchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanies(data));
  }, []);
  const loading = useSelector((state) => state.CompanySliceReducer.loading);
  const isError = useSelector((state) => state.CompanySliceReducer.isError);

  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [EditCompanyModal, setEditCompanyModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selComp, setSelComp] = useState("");
  return (
    <>
      <Navbar />
      <AdminCompanyNav setOpen={setOpen} />
      {loading ? (
        <div className="flex justify-center items-center h-[50vh] w-full">
          <DataLoader />
        </div>
      ) : isError ? (
        <ConnectionLost />
      ) : company ? (
        <div>
          <TableComp
            title="COMPANIES INFO"
            rows={company}
            columns={Columns}
            isActive_={isActive_}
            setEditCompanyModal={setEditCompanyModal}
            setSelID={setSelComp}
            Value={SearchText}
            setValue={setSearchText}
            placeholder={"Search Company..."}
          />
          {open ? (
            <ModalAddNewCompany setOpen={setOpen} open={open} />
          ) : EditCompanyModal ? (
            <ModalEditCompany
              open={EditCompanyModal}
              setOpen={setEditCompanyModal}
              selComp={company
                .filter((val) => selComp === val._id)
                .map((v, i) => {
                  return {
                    companyId: v._id,
                    companyName: v.name,
                    companyDesc: v.description,
                    companyContact: v.contact,
                    companyAddress: v.address,
                    companyCnic: v.cnic,
                    companyEmail: v.email,
                    companyBranch: v.branch,
                  };
                })}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default AdminCompany;
