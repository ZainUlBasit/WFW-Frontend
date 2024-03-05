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

const ModalItemReturn = ({
  setOpen,
  open,
  ReturnItem,
  ReturnItems,
  setReturnItem,
  setReturnItems,
  title,
}) => {
  const Data = useSelector((state) => state.ItemSliceReducer.data);
  const loading = useSelector((state) => state.ItemSliceReducer.loading);
  const isError = useSelector((state) => state.ItemSliceReducer.isError);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState({ price: 1, quantity: 1 });
  const [curItemCode, setCurItemCode] = useState("Select Item Code..");
  const [curItemName, setCurItemName] = useState("Select Item Name..");
  const [CurItemQty, setCurItemQty] = useState("");
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

  useEffect(() => {
    setTotalAmount(Number(data.price) * Number(data.quantity));
    if (curItemCode != "Select Item Code..") {
      const index = Data.findIndex((object) => {
        return object.itemcode === curItemCode;
      });
      setCurItemName(Data[index].itemname);
      setCurItemQty(Data[index].itemqty);
      setData({
        ...data,
        price: Data[index].itemsale,
        purchase: Data[index].itempurchase,
      });
    }
    setReturnItem({
      itemCode: curItemCode,
      itemName: curItemName,
      itemQuantity: data.quantity,
      itemPurchase: data.purchase,
      itemPrice: data.price,
      totalAmount: totalAmount,
    });
  }, [data, curItemCode, setReturnItem, curItemName, totalAmount]);

  const onChangeFunc = (e) => {
    const cVal = e.target.value.toString();
    if (Number(cVal) < 0) e.target.value = "0";
    if (e.target.id === "itemQuantity") {
      const enterQty = e.target.value;
      if (Number(enterQty) > Number(CurItemQty)) {
        toast.warn("Stock is not available...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setData({ ...data, quantity: 0 });
      } else setData({ ...data, quantity: e.target.value });
    } else if (e.target.id === "itemPrice") {
      setData({ ...data, price: e.target.value });
    }
    let tot = Number(data.price) * Number(data.quantity);
    setTotalAmount(tot.toString());
  };

  function AddItem() {
    setReturnItem({
      itemCode: curItemCode,
      itemName: curItemName,
      itemQuantity: data.quantity,
      itemPurchase: data.purchase,
      itemPrice: data.price,
      totalAmount: totalAmount,
    });
    if (curItemCode != "Select Item Code..") {
      const index = Data.findIndex((object) => {
        return object.itemcode === curItemCode;
      });
      setReturnItems([
        ...ReturnItems,
        {
          itemID: Data[index]._id,
          itemCode: curItemCode,
          itemName: curItemName,
          itemQuantity: data.quantity,
          itemPurchase: data.purchase,
          itemPrice: data.price,
          totalAmount: totalAmount,
        },
      ]);
    }
    setOpen(false);
  }
  useEffect(() => {
    dispatch(fetchItems({ shop: uData.userdata.name }));
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
                        setCurItemCode(e.target.value);
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
                        <option value={val.itemcode} key={i}>
                          {val.itemcode}
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
                        value={curItemName}
                        onChange={() => ""}
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
                        value={data.quantity}
                        onChange={onChangeFunc}
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
                        value={data.price}
                        onChange={onChangeFunc}
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
                        value={totalAmount}
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
