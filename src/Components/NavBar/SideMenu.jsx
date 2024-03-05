import React, { useState } from "react";
import styled from "styled-components";
import {
  SideMenuList,
  IconWrapper,
  TitleWrapper,
} from "./Styling/SideMenuStyling";
import SideBarData from "./SideBarData";
import { Link } from "react-router-dom";
import { isactiveMenu } from "../../store/SideMenuSlice";
import { useDispatch } from "react-redux";
import SideMenuBtn from "./SideMenuBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenu = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState();

  const handleMouseEnter = (key) => {
    setIsHovered(key);
  };

  const handleMouseLeave = () => {
    setIsHovered("");
  };
  return (
    <SideMenuList>
      {SideBarData.map((item, key) => (
        <li key={item.key}>
          <Link
            key={key}
            to={item.path}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignIitems: "center",
              color: isHovered === key ? "#fff" : "#5a4ae3",
              width: "100%",
              height: "14vh",
              textDecoration: "none",
              fontFamily: "raleway",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: isHovered === key ? "#5a4ae3" : "#fff",
            }}
            onClick={() => dispatch(isactiveMenu())}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon
              icon={item.icon}
              style={{ fontSize: "30px", paddingBottom: "6px" }}
            />
            {item.title}
          </Link>
        </li>
      ))}
    </SideMenuList>
  );
};

export default SideMenu;
