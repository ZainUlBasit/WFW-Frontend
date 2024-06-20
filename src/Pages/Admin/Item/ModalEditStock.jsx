import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PaymentsIcon from "@mui/icons-material/Payments";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ClassIcon from "@mui/icons-material/Class";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
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
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/TaostMessages";
import { EditStock } from "../../../Https";
import AddingLoader from "../../../Components/Loader/AddingLoader";

const ModalEditStock = ({
  EditStockModal,
  setEditStockModal,
  stockDetails,
}) => {
  const items = useSelector((state) => state.ItemSliceReducer.data);
  const loading = useSelector((state) => state.ItemSliceReducer.loading);
  const isError = useSelector((state) => state.ItemSliceReducer.isError);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const [ItemCompanyID, setItemCompanyID] = useState(stockDetails.companyId);
  const [ItemID, setItemID] = useState(stockDetails.itemId);
  const [ItemPurchase, setItemPurchase] = useState(stockDetails.purchase);
  const [ItemQauantity, setItemQauantity] = useState(stockDetails.qty);
  const [ItemDesc, setItemDesc] = useState(stockDetails.desc);
  const [ItemInvoice, setItemInvoice] = useState(stockDetails.invoice_no);
  const [ItemTruck, setItemTruck] = useState(stockDetails.truck_no);
  const [ItemDate, setItemDate] = useState(
    new Date(stockDetails.date * 1000).toISOString().split("T")[0]
  );
  const dispatch = useDispatch();
  const allCompany = useSelector((state) => state.CompanySliceReducer.data);
  const allItems = useSelector((state) => state.ItemSliceReducer.data);
  const [ProccessLoading, setProccessLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchCompanies(uData));
    if (allItems.length === 0) dispatch(fetchItems(uData));
  }, [dispatch, allItems.length, uData]);

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

    if (
      ItemCompanyID === "" ||
      ItemID === "" ||
      ItemPurchase === "" ||
      ItemQauantity === "" ||
      ItemDesc === "" ||
      ItemInvoice === "" ||
      ItemTruck === "" ||
      ItemDate === ""
    ) {
      showWarningToast("Required fields are undefined!");
      setProccessLoading(false);
      return;
    }

    const stockPayload = {
      companyId: ItemCompanyID,
      itemId: ItemID,
      qty: ItemQauantity,
      purchase: ItemPurchase,
      invoice_no: ItemInvoice,
      truck_no: ItemTruck,
      date: Math.floor(new Date(ItemDate) / 1000),
      desc: ItemDesc,
      branch: uData.branch_number,
    };

    try {
      const response = await EditStock(stockPayload, stockDetails.id); // Assuming EditStock function exists and accepts stock ID
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        showSuccessToast(response.data?.data?.msg);
        setEditStockModal(false);
        dispatch(fetchItems(uData));
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setProccessLoading(false);
  };

  return (
    <Modal
      open={EditStockModal}
      onClose={() => setEditStockModal(false)}
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
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
            className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
          >
            <BookmarkAddIcon
              className="mr-[5px] mb-[5px]"
              style={{ fontSize: "50px", position: "relative" }}
            />
            Edit Stock
            <CrossButton setOpen={setEditStockModal} />
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
                      value={ItemCompanyID}
                      onChange={(e) => {
                        setItemCompanyID(e.target.value);
                      }}
                    >
                      <option value="none">Select Company</option>
                      {allCompany.map((comp, i) => (
                        <option key={i} value={comp._id}>
                          {comp.name}
                        </option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Item */}
                {ItemCompanyID && ItemCompanyID !== "none" && (
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel for="itemCompany">
                        <ClassIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledSelect
                        value={ItemID}
                        onChange={(e) => {
                          const selectedItem = allItems.find(
                            (item) => item._id === e.target.value
                          );
                          if (selectedItem) {
                            setItemID(selectedItem._id);
                          } else {
                            // Handle the case where the selected item is not found
                          }
                        }}
                      >
                        <option value="none">Select Item</option>
                        {allItems
                          .filter((it) => it.companyId._id === ItemCompanyID)
                          .map((comp, i) => (
                            <option key={i} value={comp._id}>
                              {comp.name}
                            </option>
                          ))}
                      </StyledSelect>
                    </div>
                  </InputWrapper>
                )}
                {/* Purchase */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <ProductionQuantityLimitsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemPurchase"
                      type="number"
                      name="itemPurchase"
                      value={ItemPurchase}
                      onChange={(e) => setItemPurchase(e.target.value)}
                      placeholder="Enter purchase"
                    />
                  </div>
                </InputWrapper>
                {/* Quantity */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <ProductionQuantityLimitsIcon className="LabelIcon" />
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
                      <ReceiptIcon className="LabelIcon" />
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
                      <LocalShippingIcon className="LabelIcon" />
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
                {/* Date */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemUnit">
                      <CalendarMonthIcon className="LabelIcon" />
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
                      <DescriptionIcon className="LabelIcon" />
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
                    UPDATE Stock
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

export default ModalEditStock;
