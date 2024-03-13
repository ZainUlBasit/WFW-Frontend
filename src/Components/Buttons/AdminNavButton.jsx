import React from "react";
import { Link } from "react-router-dom";
import ButtonComp from "../../Pages/Admin/Styling/ButtonComp";

const AdminNavButton = ({ title, type, link, BIcon, setOpen, width }) => {
  return (
    <>
      {type === "modal" ? (
        <ButtonComp width={width} onClick={() => setOpen(true)}>
          <div className="btnModal select-none">
            <BIcon className="BtnIcon" />
            <span className="btnText">{title}</span>
          </div>
        </ButtonComp>
      ) : (
        <ButtonComp width={width}>
          <Link to={link} className="BtnLink">
            <BIcon className="BtnIcon select-none" />
            <span className="btnText select-none">{title}</span>
          </Link>
        </ButtonComp>
      )}
    </>
  );
};

export default AdminNavButton;
