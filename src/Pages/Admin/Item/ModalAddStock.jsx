import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PaymentsIcon from "@mui/icons-material/Payments";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "./Styling/ItemInputStyling";
import { CrossButton, StyledButton } from "./Styling/StyleButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../store/ItemSlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import { fetchCompanies } from "../../../store/CompanySlice";
import companyTransactionsServices from "../../../Services/companyTransactions.services";
import AddingLoader from "../../../Components/Loader/AddingLoader";
import itemServices from "../../../Services/item.services";
import companyServices from "../../../Services/company.services";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const ModalAddStock = ({ AddStockModal, setAddStockModal }) => {
  const items = useSelector((state) => state.ItemSliceReducer.data);
  const loading = useSelector((state) => state.ItemSliceReducer.loading);
  const isError = useSelector((state) => state.ItemSliceReducer.isError);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const [ItemCompany, setItemCompany] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemQauantity, setItemQauantity] = useState();
  const [ItemDesc, setItemDesc] = useState("");
  const [ItemInvoice, setItemInvoice] = useState("");
  const [ItemTruck, setItemTruck] = useState("");
  const [ItemDate, setItemDate] = useState("");
  const dispatch = useDispatch();
  const allCompany = useSelector((state) => state.CompanySliceReducer.data);
  const [ProccessLoading, setProccessLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchCompanies({ shop: uData.userdata.name }));
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    border: "3px solid #5A4AE3",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    let finded = items.filter((it) => it.itemname === ItemName);
    let purchase = finded[0].itempurchase;
    let company = finded[0].itemcompany;
    let id = finded[0]._id;

    let company_id = allCompany.filter((comp) => comp.name === company);
    company_id = company_id[0];
    company_id = company_id._id;
    try {
      // Update Item Quantity
      await itemServices.updateItemQty(id, ItemQauantity);
      // Update Company Total by id
      const curTotal = Number(purchase) * Number(ItemQauantity);
      let companyid = allCompany.filter((co) => co.name === company);
      companyid = companyid[0]._id;
      await companyServices.updateCompanyTotal(companyid, curTotal);
      // Add Company Transactions
      const timestamp = firebase.firestore.Timestamp.fromDate(
        new Date(ItemDate)
      );
      await companyTransactionsServices.addTransaction({
        company_id: company_id,
        item_name: ItemName,
        purchase: purchase,
        qty: ItemQauantity,
        desc: ItemDesc,
        invoice: ItemInvoice,
        truck: ItemTruck,
        date: timestamp,
        total: curTotal,
        shop: uData.userdata.fullName,
      });
      dispatch(fetchItems({ shop: uData.userdata.name }));
      setAddStockModal(false);
    } catch (err) {
      console.log(err.message);
    }
    setProccessLoading(false);
  };
  return (
    <Modal
      open={AddStockModal}
      onClose={() => setAddStockModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {loading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : items ? (
        <Box sx={style} className="flex-col justify-center items-center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
            className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
          >
            <BookmarkAddIcon
              className="mr-[5px] mb-[5px]"
              style={{ fontSize: "50px", position: "relative" }}
            />
            Add Stock
            <CrossButton setOpen={setAddStockModal} />
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Form Portion */}
            <div className="flex-col justify-center items-center">
              <form className="flex flex-col items-center justify-center w-[100%]">
                {/* Select Company */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemCompany">
                      <AssuredWorkloadIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemCompany}
                      onChange={(e) => {
                        setItemCompany(e.target.value);
                      }}
                    >
                      <option value="none">Select Company</option>
                      {allCompany
                        .filter((ac) => ac.shop === uData.userdata.fullName)
                        .map((comp, i) => (
                          <option key={i} value={comp.name}>
                            {comp.name}
                          </option>
                        ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Item */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemCompany">
                      <AssuredWorkloadIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemName}
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                    >
                      <option value="none">Select Item</option>
                      {items
                        .filter(
                          (it) =>
                            it.itemcompany === ItemCompany &&
                            it.itemshop === uData.userdata.fullName
                        )
                        .map((comp, i) => (
                          <option key={i} value={comp.itemname}>
                            {comp.itemname}
                          </option>
                        ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Quantity */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <PaymentsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemQuantity"
                      type="number"
                      name="itemQuantity"
                      value={ItemQauantity}
                      onChange={(e) => setItemQauantity(e.target.value)}
                      placeholder="Enter quantity"
                    />
                  </div>
                </InputWrapper>
                {/* Invoice */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <PaymentsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemInvoice"
                      type="text"
                      name="itemInvoice"
                      value={ItemInvoice}
                      onChange={(e) => setItemInvoice(e.target.value)}
                      placeholder="Enter Invoice"
                    />
                  </div>
                </InputWrapper>
                {/* Truck */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <PaymentsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemTruck"
                      type="text"
                      name="itemTruck"
                      value={ItemTruck}
                      onChange={(e) => setItemTruck(e.target.value)}
                      placeholder="Enter Truck"
                    />
                  </div>
                </InputWrapper>
                {/* Desc */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <PaymentsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemDate"
                      type="date"
                      name="itemDate"
                      value={ItemDate}
                      onChange={(e) => setItemDate(e.target.value)}
                      placeholder="Enter Date"
                    />
                  </div>
                </InputWrapper>
                {/* Desc */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <PaymentsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemDesc"
                      type="text"
                      name="itemDesc"
                      value={ItemDesc}
                      onChange={(e) => setItemDesc(e.target.value)}
                      placeholder="Enter Desc"
                    />
                  </div>
                </InputWrapper>
                {ProccessLoading ? (
                  <AddingLoader />
                ) : (
                  <StyledButton onClick={onSubmit} primary>
                    ADD Stock
                  </StyledButton>
                )}
              </form>
            </div>
          </Typography>
        </Box>
      ) : (
        <DataLoader />
      )}
    </Modal>
  );
};

export default ModalAddStock;
