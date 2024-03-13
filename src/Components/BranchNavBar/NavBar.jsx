import React from "react";
import SideMenu from "./SideMenu";
import "./NavBar.css";
import WFW2 from "../../images/WFW2.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faH, faBars } from "@fortawesome/free-solid-svg-icons";
import { isactiveMenu } from "../../store/SideMenuSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const dispatch = useDispatch();
  console.log(isActive_);
  const LogoWrapper = styled.div`
    height: 100%;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  `;

  return (
    <div className="fixed">
      <div className="flex justify-between items-center h-[10vh] w-[100vw] shadow-md bg-[#F0F8FF] fixed">
        {/* left side */}
        <div className="text-3xl flex justify-center items-center ml-[10px]">
          <FontAwesomeIcon
            icon={faBars}
            style={{ cursor: "pointer", marginLeft: "10px", color: "#5A4AE3" }}
            onClick={() => dispatch(isactiveMenu())}
          />
          <img
            src={WFW2}
            width="150px"
            className="ml-[20px] mt-[0px] flex justify-center items-center"
            alt="?"
          />
        </div>
        {/* Right side */}
        <div className="mr-5 text-xl">
          <h3>Log Out</h3>
        </div>
      </div>

      <div
        className={
          isActive_ ? "sideMenuWrapper visible" : "sideMenuWrapper invisible"
        }
      >
        <SideMenu />
      </div>
    </div>
  );
};

export default Navbar;
