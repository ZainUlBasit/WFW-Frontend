import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import BallotIcon from "@mui/icons-material/Ballot";

import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "../../Pages/Admin/Item/Styling/ItemInputStyling";
import {
  CrossButton,
  StyledButton,
} from "../../Pages/Admin/Item/Styling/StyleButton";
import SelectComp from "../Select/SearchingComp";
// import { Data } from "../../DemoData/ItemDataCode";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../store/ItemSlice";
import DataLoader from "../Loader/DataLoader";
import ConnectionLost from "../Error/ConnectionLost";
import { toast } from "react-toastify";
import { showWarningToast } from "../../utils/TaostMessages";
import { Warning } from "postcss";
import PopOver from "../Popover/PopOver";
import AuthInput from "../Input/SimpleInput";

const ModalItemReturn = ({
  setOpen,
  open,
  NewItems,
  setNewItems,
  title,
  Data,
}) => {
  const loading = useSelector((state) => state.ItemSliceReducer.loading);
  const isError = useSelector((state) => state.ItemSliceReducer.isError);
  const dispatch = useDispatch();
  const [Qty, setQty] = useState("");
  const [curItemId, setCurItemId] = useState("");
  const [ItemSelect, setItemSelect] = useState(false);
  const [SelectedItemData, setSelectedItemData] = useState({});
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 380,
    bgcolor: "background.paper",
    border: "3px solid #5A4AE3",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  function AddItem() {
    if (SelectedItemData?._id === "" || Qty === "") {
      showWarningToast("Required fields are undefined!");
      return;
    }
    const existingItemIndex = NewItems.findIndex(
      (item) => item.itemId === SelectedItemData?._id
    );
    if (existingItemIndex !== -1) {
      // Item already exists, update quantity and amount
      const updatedItems = [...NewItems];
      updatedItems[existingItemIndex].qty += Number(Qty);
      updatedItems[existingItemIndex].amount +=
        Number(Qty) * Number(SelectedItemData?.sale);
      setNewItems(updatedItems);
    } else {
      setNewItems([
        ...NewItems,
        {
          itemId: SelectedItemData?._id,
          name: SelectedItemData?.name,
          qty: Number(Qty),
          purchase: Number(SelectedItemData?.purchase),
          price: Number(SelectedItemData?.sale),
          amount: Number(SelectedItemData?.sale) * Number(Qty),
        },
      ]);
    }
    setOpen(false);
  }

  // const Data = useSelector((state) => state.ItemSliceReducer.data);
  // useEffect(() => {
  //   dispatch(fetchItems(uData));
  // }, []);

  return Data.loading ? (
    <DataLoader />
  ) : Data.isError ? (
    <ConnectionLost />
  ) : Data ? (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="div"
        className="flex-col justify-center items-center"
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
        >
          <AssignmentReturnIcon
            className="mr-[5px] mb-[5px]"
            style={{ fontSize: "50px" }}
          />
          {title}
          <CrossButton setOpen={setOpen} />
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          component={"div"}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%] gap-y-5 py-5 pb-8">
              <PopOver
                Label={"Item Code"}
                Placeholder={"Select Item..."}
                Value={SelectedItemData}
                setValue={setSelectedItemData}
                Values={Data?.data}
                ShowName={"code"}
              />

              {SelectedItemData?.name && (
                <>
                  {/* Item name */}
                  <AuthInput
                    id="item-name"
                    Type="text"
                    label="Item Name"
                    placeholder="Enter Item Name..."
                    required={true}
                    Value={SelectedItemData?.name || "Select Item Name..."}
                    setValue={setSelectedItemData}
                    readonly={true}
                    disabled={true}
                  />
                  {/* item qty */}
                  <AuthInput
                    id="item-qty"
                    Type="number"
                    label="Quantity"
                    placeholder="Enter Quantity..."
                    required={true}
                    Value={Qty || "Enter Quantity..."}
                    setValue={setQty}
                    readonly={false}
                    disabled={false}
                  />
                  {/* item sale */}
                  <AuthInput
                    id="item-sale"
                    Type="number"
                    label="Sale"
                    placeholder="Enter Sale..."
                    required={true}
                    Value={SelectedItemData?.sale || ""}
                    setValue={setSelectedItemData}
                    readonly={true}
                    disabled={true}
                  />
                  {/* item amount */}
                  <AuthInput
                    id="item-amount"
                    Type="number"
                    label="Amount"
                    placeholder="Enter Amount..."
                    required={true}
                    Value={
                      SelectedItemData?.sale && Qty !== ""
                        ? SelectedItemData?.sale * Qty
                        : ""
                    }
                    setValue={setSelectedItemData}
                    readonly={true}
                    disabled={true}
                  />
                </>
              )}
            </form>
            <div className="flex items-center flex-col">
              <StyledButton primary onClick={AddItem}>
                ADD ITEM
              </StyledButton>
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  ) : (
    <DataLoader />
  );
};

export default ModalItemReturn;
