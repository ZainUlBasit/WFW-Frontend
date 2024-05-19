import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenuBtn = ({ path, icon, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Link
      to={path}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignIitems: "center",
        color: isHovered ? "#fff" : "#5a4ae3",
        width: "100%",
        height: "14vh",
        textDecoration: "none",
        fontFamily: "Roboto",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: isHovered ? "#5a4ae3" : "#fff",
      }}
      onClick={() => dispatch(isactiveMenu())}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: "30px", paddingBottom: "6px" }}
      />
      {title}
    </Link>
  );
};

export default SideMenuBtn;
