import React from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import { NavComp } from "../../../Pages/Admin/Styling/NavComp";
import ButtonComp from "../../../Pages/Admin/Styling/ButtonComp";

const ItemsNav = ({
  setOpen,
  setCategoryModal,
  setSubModal,
  setEditItemModal,
  setEditSubCategoryModal,
  setEditCategoryModal,
  setAddStockModal,
}) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);

  return (
    <NavComp
      isAct={isActive_}
      className={isActive_ ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="flex flex-wrap mb-[5px] mt-[5px] justify-center items-center">
        <ButtonComp width="180px" onClick={() => setAddStockModal(true)}>
          <Link to="/itemss" className="BtnLink">
            <InfoIcon className="mr-[5px]" />
            <span className="btnText">Item Info</span>
          </Link>
        </ButtonComp>
        <ButtonComp width="180px">
          <Link to="/stock_statisticss" className="BtnLink">
            <LeaderboardIcon className="mr-[5px]" />
            <span className="btnText">Stock Statictics</span>
          </Link>
        </ButtonComp>
      </div>
    </NavComp>
  );
};

export default ItemsNav;
