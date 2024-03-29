import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import ItemsNav from "./ItemsNav";
import ModalAddNewItem from "./ModalAddNewItem";
import ModalAddCategory from "./ModalAddCategory";
import ModalAddSubCategory from "./ModalAddSubCategory";
import TableComp from "../../../Components/Tables/TableComponent";
import { StockDataColumns } from "../../../DemoData/StockDataColumns";
import { Data as Rows } from "../../../DemoData/StockData";
import { useDispatch, useSelector } from "react-redux";
// import ModalEditSubCategory from "./ModalEditSubCategory";
import ModalEditCategory from "./ModalEditCategory";
import ModalAddStock from "./ModalAddStock";
import ModalEditItem from "./ModalEditItem";
import { fetchItems } from "../../../store/ItemSlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import moment from "moment";
import companyTransactionsServices from "../../../Services/companyTransactions.services";
import EditSubCategory from "./EditSubCategory";
import { fetchStocks } from "../../../store/StockSlice";

const StockStatistics = () => {
  const [open, setOpen] = useState(false);
  const [CategoryModal, setCategoryModal] = useState(false);
  const [SubModal, setSubModal] = useState(false);
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [selID, setSelID] = useState(-1);
  const [EditItemModal, setEditItemModal] = useState(false);
  const [EditCategoryModal, setEditCategoryModal] = useState(false);
  const [EditSubCategoryModal, setEditSubCategoryModal] = useState(false);
  const [AddStockModal, setAddStockModal] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const Transactions = useSelector((state) => state.StockState.data);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchStocks({
        ...uData,
        fromDate: 0,
        toDate: Math.floor(Date.now() / 1000),
      })
    );
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
      {Loading ? (
        <DataLoader />
      ) : Transactions ? (
        <div>
          <TableComp
            title={"STOCK STATISTICS"}
            rows={Transactions}
            columns={StockDataColumns}
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
              selItem={Rows.filter(
                (val, i) => val.id.toString() === selID.toString()
              ).map((v, i) => {
                return {
                  itemcode: v.itemcode,
                  itemname: v.name,
                  itemcompany: v.company,
                  itemcategory: v.maincat,
                  itemunit: v.unit,
                  itempurchase: v.purchase,
                  itemsale: v.sale,
                };
              })}
            />
          ) : EditSubCategoryModal ? (
            <EditSubCategory
              SubModal={EditSubCategoryModal}
              setSubModal={setEditSubCategoryModal}
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
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default StockStatistics;
