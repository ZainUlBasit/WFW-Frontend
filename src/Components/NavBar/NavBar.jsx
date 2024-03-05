import React, { useEffect, useRef } from "react";
import SideMenu from "./SideMenu";
import WFW2 from "../../assets/images/WFW2.png";
import Avatar from "./images/Avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { isactiveMenu } from "../../store/SideMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import NavbarStyled from "./Styling/NavbarStyled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EnhancedEncryptionRoundedIcon from "@mui/icons-material/EnhancedEncryptionRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import SecurityIcon from "@mui/icons-material/Security";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isOpenModal } from "../../store/CPSlice";
import CPModal from "../Modals/CPModal";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const isOpModal = useSelector((state) => state.CPSliceReducer.OpenModal);
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();
  const [ChangePasswordModal, setChangePasswordModal] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const dropDownRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", closeDropDown, true);
  }, []);

  const closeDropDown = (e) => {
    try {
      if (dropDownRef.current.contains(e.target)) {
        setIsDropActive(true);
      } else {
        setIsDropActive(false);
      }
    } catch (error) {}
  };
  const navigate = useNavigate();

  return (
    <NavbarStyled>
      <div className="topSide">
        {/* left side */}
        <div className="leftSide">
          <FontAwesomeIcon
            icon={isActive_ ? faMultiply : faBars}
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              color: "#5A4AE3",
              width: "30px",
            }}
            onClick={() => dispatch(isactiveMenu())}
          />
          <Link to="/">
            <img
              src={WFW2}
              width="150px"
              className="select-none"
              alt="not found"
            />
          </Link>
        </div>
        {/* Right side */}
        <div className="rightSide">
          <div className="mainBox  overflow-hidden">
            <img
              className="w-[50px] h-[50px] select-none"
              src={data.userdata.pic}
              alt="not found"
            />
            <button
              className="btnDown"
              onClick={() => setIsDropActive((isDropActive) => !isDropActive)}
              ref={dropDownRef}
              id="DropDownBtn"
            >
              {isDropActive ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
          </div>
        </div>
        {isDropActive ? (
          <div className="DropDownList">
            <ul ref={dropDownRef}>
              {/* <li>
                <div className="LinkIcon">
                  <EnhancedEncryptionRoundedIcon />
                </div>
                <div
                  className="LinkTextB select-none"
                  onClick={() => dispatch(isOpenModal())}
                >
                  Change Password
                </div>
              </li>
              <li>
                <div className="LinkIcon">
                  <SecurityIcon />
                </div>
                <div className="LinkTextB select-none">
                  <Link to="/permissions">Permissions</Link>
                </div>
              </li>*/}

              {data.userdata.fullName === "Admin" ? (
                <>
                  <li
                    className="hover:bg-white transition-all ease-in-out duration-300"
                    onClick={() => navigate("/requests")}
                  >
                    <div className="LinkIcon">
                      <SecurityIcon />
                    </div>
                    <div className="LinkTextB select-none">Requests</div>
                  </li>
                  <li
                    className="hover:bg-white transition-all ease-in-out duration-300"
                    onClick={() => navigate("/shops_info")}
                  >
                    <div className="LinkIcon">
                      <SecurityIcon />
                    </div>
                    <div className="LinkTextB select-none">Shops Info</div>
                  </li>
                </>
              ) : (
                <></>
              )}
              <li
                className="hover:bg-white transition-all ease-in-out duration-300"
                onClick={() => {
                  // signOut();
                  navigate("/logout");
                  // navigate("/login");
                }}
              >
                <div className="LinkIcon">
                  <LogoutIcon />
                </div>
                <div className="LinkTextB select-none">Logout</div>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      {isOpModal ? <CPModal /> : null}
      {/* Side Menu List */}
      <div className={isActive_ ? "visible_" : "invisible_"}>
        {isActive_ ? <SideMenu /> : null}
      </div>
    </NavbarStyled>
  );
};

export default Navbar;
