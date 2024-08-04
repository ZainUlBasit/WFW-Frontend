import React from "react";
import { useSelector } from "react-redux";
import { NavComp } from "../../../Pages/Admin/Styling/NavComp";
import AdminNavButton from "../../Buttons/AdminNavButton";
import InfoIcon from "@mui/icons-material/Info";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DnsIcon from "@mui/icons-material/Dns";

const AdminCompanyNav = ({ setOpen }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const userData = useSelector((state) => state.AutoLoginSliceReducer.data);
  return (
    <NavComp
      isAct={isActive_}
      className={isActive_ ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="NavWrapper">
        {userData.role === 2 ? (
          <AdminNavButton
            title={"Add Company"}
            type={"modal"}
            link={"/"}
            BIcon={DomainAddIcon}
            width={"175px"}
            setOpen={setOpen}
          />
        ) : (
          <></>
        )}
        <AdminNavButton
          title={"Companies Kata"}
          type={"link"}
          link={"/companies_kata"}
          BIcon={MenuBookIcon}
          width={"175px"}
        />
        <AdminNavButton
          title={"Companies Info"}
          type={"link"}
          link={"/companies_info"}
          BIcon={InfoIcon}
          width={"175px"}
        />
        <AdminNavButton
          title={"Item Summary"}
          type={"link"}
          link={"/company_item_summary"}
          BIcon={DnsIcon}
          width={"175px"}
        />
        <AdminNavButton
          title={"Ledger"}
          type={"link"}
          link={"/company_ledger"}
          BIcon={RequestQuoteIcon}
          width={"175px"}
        />
      </div>
    </NavComp>
  );
};

export default AdminCompanyNav;
