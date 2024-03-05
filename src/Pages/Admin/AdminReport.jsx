import React, { useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import ReportNav from "./Reports/ReportNav";

const AdminReport = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar />
      <ReportNav  setOpen={setOpen}/>
    </>
  );
};

export default AdminReport;
