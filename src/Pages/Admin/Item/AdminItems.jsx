import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import ItemsNav from "./ItemsNav";
import ModalAddNewItem from "./ModalAddNewItem";
import ModalAddCategory from "./ModalAddCategory";
import ModalAddSubCategory from "./ModalAddSubCategory";
import { useDispatch, useSelector } from "react-redux";
import TableComp from "../../../Components/Tables/TableComponent";
import { ItemDataColumns as Columns } from "../../../DemoData/ItemDataColumns";
import { ItemData as Rows } from "../../../DemoData/ItemData";
import ModalEditItem from "./ModalEditItem";
import { useRef } from "react";
import ModalEditSubCategory from "./ModalEditSubCategory";
import ModalEditCategory from "./ModalEditCategory";
import ModalAddStock from "./ModalAddStock";
import { CircularProgress } from "@mui/material";
import { fetchItems } from "../../../store/ItemSlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import { ControlPointOutlined } from "@mui/icons-material";
import moment from "moment";

const AdminItems = () => {
  const [open, setOpen] = useState(false);
  const [AddStockModal, setAddStockModal] = useState(false);
  const [CategoryModal, setCategoryModal] = useState(false);
  const [SubModal, setSubModal] = useState(false);
  const [EditItemModal, setEditItemModal] = useState(false);
  const [EditCategoryModal, setEditCategoryModal] = useState(false);
  const [EditSubCategoryModal, setEditSubCategoryModal] = useState(false);
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  let item = useSelector((state) => state.ItemSliceReducer.data);
  const loading = useSelector((state) => state.ItemSliceReducer.loading);
  const isError = useSelector((state) => state.ItemSliceReducer.isError);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);

  const [selID, setSelID] = useState(-1);
  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  return (
    <>
      <Navbar />
      <ItemsNav
        setOpen={setOpen}
        setCategoryModal={setCategoryModal}
        setSubModal={setSubModal}
        setEditItemModal={setEditItemModal}
        setEditCategoryModal={setEditCategoryModal}
        setEditSubCategoryModal={setEditSubCategoryModal}
        setAddStockModal={setAddStockModal}
      />
      {loading ? (
        <DataLoader />
      ) : item ? (
        <div>
          <TableComp
            title={"ITEM INFO"}
            rows={item}
            columns={Columns}
            isActive_={isActive_}
            setSelID={setSelID}
            setEditItemModal={setEditItemModal}
          />
          {open ? (
            <ModalAddNewItem setOpen={setOpen} open={open} />
          ) : CategoryModal ? (
            <ModalAddCategory
              setCategoryModal={setCategoryModal}
              CategoryModal={CategoryModal}
            />
          ) : SubModal ? (
            <ModalAddSubCategory
              SubModal={SubModal}
              setSubModal={setSubModal}
            />
          ) : EditItemModal ? (
            <ModalEditItem
              open={EditItemModal}
              setOpen={setEditItemModal}
              selItem={item
                .filter((val) => selID === val._id)
                .map((v, i) => {
                  return {
                    itemid: v._id,
                    itemcode: v.itemcode,
                    itemname: v.itemname,
                    itemcompany: v.itemcompany,
                    itemcategory: v.itemcategory,
                    itemsubcategory: v.itemsubcategory,
                    itemunit: v.itemunit,
                    itempurchase: v.itempurchase,
                    itemsale: v.itemsale,
                  };
                })}
            />
          ) : EditSubCategoryModal ? (
            <ModalEditSubCategory
              EditSubCategoryModal={EditSubCategoryModal}
              setEditSubCategoryModal={setEditSubCategoryModal}
            />
          ) : EditCategoryModal ? (
            <ModalEditCategory
              EditCategoryModal={EditCategoryModal}
              setEditCategoryModal={setEditCategoryModal}
            />
          ) : AddStockModal ? (
            <ModalAddStock
              AddStockModal={AddStockModal}
              setAddStockModal={setAddStockModal}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default AdminItems;
