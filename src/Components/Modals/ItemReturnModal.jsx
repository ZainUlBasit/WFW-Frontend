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

const ModalItemReturn = ({ setOpen, open, NewItems, setNewItems, title }) => {
  const Data = useSelector((state) => state.ItemSliceReducer.data);
  const loading = useSelector((state) => state.ItemSliceReducer.loading);
  const isError = useSelector((state) => state.ItemSliceReducer.isError);
  const dispatch = useDispatch();
  const [Qty, setQty] = useState("");
  const [curItemId, setCurItemId] = useState("");
  const [ItemSelect, setItemSelect] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
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

  function AddItem() {
    if (curItemId === "" || Qty === "") {
      showWarningToast("Required fields are undefined!");
      return;
    }
    const existingItemIndex = NewItems.findIndex(
      (item) => item.itemId === curItemId
    );
    if (existingItemIndex !== -1) {
      // Item already exists, update quantity and amount
      const updatedItems = [...NewItems];
      updatedItems[existingItemIndex].qty += Number(Qty);
      updatedItems[existingItemIndex].amount +=
        Number(Qty) * Number(Data.find((dt) => dt._id === curItemId).sale);
      setNewItems(updatedItems);
    } else {
      setNewItems([
        ...NewItems,
        {
          itemId: curItemId,
          name: Data.find((dt) => dt._id === curItemId).name,
          qty: Number(Qty),
          purchase: Number(Data.find((dt) => dt._id === curItemId).purchase),
          price: Number(Data.find((dt) => dt._id === curItemId).sale),
          amount:
            Number(Data.find((dt) => dt._id === curItemId).sale) * Number(Qty),
        },
      ]);
    }
    setOpen(false);
  }

  useEffect(() => {
    dispatch(fetchItems(uData));
  }, []);

  return loading ? (
    <DataLoader />
  ) : isError ? (
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
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
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
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Item Code */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <IntegrationInstructionsIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    onChange={(e) => {
                      if (e.target.value !== "none") {
                        setCurItemId(e.target.value);
                        setItemSelect(true);
                      } else {
                        setItemSelect(false);
                      }
                    }}
                    // defaultValue={curItemCode}
                    // defaultValue={"Select item"}
                  >
                    <option disabled value="none" selected>
                      Select item code
                    </option>
                    {Data.map((val, i) => {
                      return (
                        <option value={val._id} key={val._id}>
                          {val.code}
                        </option>
                      );
                    })}
                  </StyledSelect>
                </div>
              </InputWrapper>
              {ItemSelect ? (
                <div>
                  {/* Item Name */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <DriveFileRenameOutlineIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        value={
                          Data.find((dt) => dt._id === curItemId).name
                            ? Data.find((dt) => dt._id === curItemId).name
                            : ""
                        }
                        onChange={() => {}}
                        id="itemName"
                        type="text"
                        name="itemName"
                        placeholder="Item Name"
                      />
                    </div>
                  </InputWrapper>
                  {/* Quanitity */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <ShoppingCartIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        id="itemQuantity"
                        type="number"
                        name="itemQuantity"
                        value={Qty}
                        onChange={(e) => {
                          if (curItemId !== "") {
                            const maxQty = Data.find(
                              (dt) => dt._id === curItemId
                            ).qty;

                            if (e.target.value > maxQty) {
                              showWarningToast(
                                "Qty must be less than equal to " + maxQty
                              );
                              setQty("");
                            } else setQty(e.target.value);
                          }
                        }}
                        placeholder="Item Quantity"
                      />
                    </div>
                  </InputWrapper>
                  {/* Unit Price */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <PaymentsIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        id="itemPrice"
                        type="number"
                        name="itemPrice"
                        value={
                          Data.find((dt) => dt._id === curItemId).sale
                            ? Data.find((dt) => dt._id === curItemId).sale
                            : ""
                        }
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Item Unit Price"
                      />
                    </div>
                  </InputWrapper>
                  {/* Total Amount */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <BallotIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        id="itemAmount"
                        type="number"
                        name="itemAmount"
                        value={
                          Data.find((dt) => dt._id === curItemId).sale &&
                          Qty !== ""
                            ? Data.find((dt) => dt._id === curItemId).sale * Qty
                            : ""
                        }
                        onChange={() => console.log("Value Changed...")}
                        placeholder="Item Total Amount"
                      />
                    </div>
                  </InputWrapper>
                </div>
              ) : null}
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
