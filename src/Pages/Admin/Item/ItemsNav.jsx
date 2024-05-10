import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CategoryIcon from "@mui/icons-material/Category";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Items.css";
import ButtonComp from "../Styling/ButtonComp";
import { NavComp } from "../Styling/NavComp";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

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
  const userData = useSelector((state) => state.AutoLoginSliceReducer.data);

  return (
    <NavComp
      isAct={isActive_}
      className={isActive_ ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="flex flex-wrap mb-[5px] mt-[5px] justify-center items-center">
        <ButtonComp width="190px">
          <Link to="/items" className="BtnLink">
            <LeaderboardIcon className="mr-[5px]" />
            <span className="btnText">Items Info</span>
          </Link>
        </ButtonComp>

        {userData.role === 2 ? (
          <>
            <ButtonComp width="190px" onClick={() => setOpen(true)}>
              <div className="btnModal">
                <NoteAddIcon className="mr-[5px]" />
                <span className="btnText">Add Item</span>
              </div>
            </ButtonComp>
            <ButtonComp width="190px" onClick={() => setCategoryModal(true)}>
              <div className="btnModal">
                <CategoryIcon className="mr-[5px]" />
                <span className="btnText">Add Category</span>
              </div>
            </ButtonComp>
            <ButtonComp
              width="190px"
              onClick={() => setEditCategoryModal(true)}
            >
              <div className="btnModal">
                <AppRegistrationIcon className="mr-[5px]" />
                <span className="btnText">Edit Category</span>
              </div>
            </ButtonComp>
            <ButtonComp width="190px" onClick={() => setSubModal(true)}>
              <div className="btnModal">
                <PlaylistAddIcon className="mr-[5px]" />
                <span className="btnText">Add Sub Category</span>
              </div>
            </ButtonComp>
            <ButtonComp
              width="190px"
              onClick={() => setEditSubCategoryModal(true)}
            >
              <div className="btnModal">
                <AppRegistrationIcon className="mr-[5px]" />
                <span className="btnText">Edit SubCategory</span>
              </div>
            </ButtonComp>
            <ButtonComp width="190px" onClick={() => setAddStockModal(true)}>
              <div className="btnModal">
                <BookmarkAddIcon className="mr-[5px]" />
                <span className="btnText">Add Stock</span>
              </div>
            </ButtonComp>
          </>
        ) : null}
        <ButtonComp width="190px">
          <Link to="/stock_statistics" className="BtnLink">
            <LeaderboardIcon className="mr-[5px]" />
            <span className="btnText">Stock Statictics</span>
          </Link>
        </ButtonComp>
      </div>
    </NavComp>
  );
};

export default ItemsNav;
