import React, { useEffect, useState } from "react";
// import { CustomerRows } from "../../DemoData/TempData";
import SelectComp from "../Select/SearchingComp";
import { CustomerReturnCardWrapper } from "./CustomerReturnCard.Styling";
import InputWrapperStyling from "../../Pages/Admin/Styling/InputWrapperStyling";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/CustomerSlice";
import { SelectWrapper } from "../Select/SearchingComp.Styling";
import AuthInputPopOver from "../Input/CustomPopover";
import { Popover, Typography } from "@mui/material";
import { setLogLevel } from "firebase/firestore";
import { fetchItems } from "../../store/ItemSlice";
import { showErrorToast, showWarningToast } from "../../utils/TaostMessages";

const CustomerReturnCard = ({
  setOpen,
  title,
  setSelect,
  Select,
  setCustomerName,
  setCustomerAddress,
  setCustomerID,
  data,
  NewItems,
  setNewItems,
}) => {
  const [ItemCode, setItemCode] = useState("");
  const [ItemId, setItemId] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemQty, setItemQty] = useState("");
  const [CurrentItemQty, setCurrentItemQty] = useState("");
  const [ItemPrice, setItemPrice] = useState("");
  const [ItemAmount, setItemAmount] = useState("");

  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();
  const ItemState = useSelector((state) => state.ItemSliceReducer);

  useEffect(() => {
    dispatch(fetchItems(uData));
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [SearchText, setSearchText] = useState("");

  useEffect(() => {
    if (ItemCode === "") {
      setItemPrice("");
      setItemName("");
      setItemId("");
    } else {
      const currentItem = ItemState.data.find((dt) => dt.code === ItemCode);
      if (currentItem) {
        setItemPrice(currentItem.sale);
        setItemName(currentItem.name);
        setItemId(currentItem._id);
        setCurrentItemQty(currentItem.qty);
      } else {
        setItemPrice("");
        setItemName("");
        setItemId("");
        setCurrentItemQty("");
      }
    }
  }, [ItemCode]);

  return (
    <>
      <CustomerReturnCardWrapper>
        <div className="Inner">
          <div className="title">{title.toUpperCase()}</div>
          <InputWrapperStyling className="InputTab">
            <SelectWrapper>
              <AuthInputPopOver
                // label="Select Customer...!"
                placeholder="Select Customer..."
                required={true}
                Value={Select?._name || "Select Customer...!"}
                onClick={handleClick}
              />

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: "25px", // Add rounded corners
                    backgroundColor: "white", // Set background color to white
                    width: "60%", // Set the width as needed
                    overflow: "hidden", // Hide overflowing content
                    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add box-shadow
                    boxShadow:
                      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(0, 0, 0, 0.08) 0px 1px 0px inset",
                    //   marginTop: "6px",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    borderColor: "#5a4ae3",
                    backgroundColor: "#5a4ae3",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "25px",
                  }}
                >
                  <div className="bg-[#5a4ae3] text-white w-full font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                    <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                      <div className="flex w-full">
                        <input
                          type="text"
                          className="w-full px-4 py-2 outline-none rounded-md placeholder:text-gray-500 text-black font-[Raleway] font-bold"
                          placeholder="Search...."
                          value={SearchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>
                      {data
                        .filter((cust) => {
                          // Convert both SearchText and cust data to lowercase
                          const searchTextLower = SearchText.toLowerCase();
                          const custLower = cust.name.toLowerCase();

                          // Check if SearchText is not empty and if the cust includes the SearchText
                          if (searchTextLower !== "") {
                            return custLower.includes(searchTextLower);
                          }
                          // If SearchText is empty, return true for all items
                          else return true;
                        })
                        .map((Comp, i) => {
                          return (
                            <div
                              className="flex gap-x-3 items-center cursor-pointer font-bold font-[Raleway] text-xl"
                              onClick={() => {
                                handleClose();
                                setSelect({
                                  name: Comp._id,
                                  _name: Comp.name,
                                  found: true,
                                });
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                checked={Comp._id === Select.name}
                              />
                              <span>{Comp.name}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Typography>
              </Popover>
              {/* <select
                className="SelectInner"
                value={Select.name}
                onChange={(e) =>
                  setSelect({
                    name: e.target.value,
                    found: e.target.value !== "" ? true : false,
                  })
                }
                defaultValue={"Select Customer..."}
              >
                <option value={""}>{"Select Customer..."}</option>
                {data.map((Comp, i) => {
                  return (
                    <option key={i} value={Comp._id}>
                      {Comp.name}
                    </option>
                  );
                })}
              </select> */}
            </SelectWrapper>
          </InputWrapperStyling>
          {Select.found ? (
            <div className="flex flex-col">
              <div className="flex gap-x-3 flex-wrap gap-y-3 justify-center items-center py-4 w-full border-b-2 border-b-white">
                <input
                  type="text"
                  list="item-code"
                  id="fruit"
                  name="fruit"
                  value={ItemCode}
                  onChange={(e) => setItemCode(e.target.value)}
                  placeholder="Select Code"
                  className="px-2 py-2 outline-none rounded-lg"
                  onBlur={(e) => {
                    const currentItem = ItemState.data.find(
                      (dt) => dt.code === e.target.value
                    );
                    if (!currentItem) setItemCode("");
                  }}
                />
                <datalist id="item-code">
                  {/* Map through the options and create option elements */}
                  {ItemState?.data.map((option, index) => (
                    <option key={option._id} value={option.code} />
                  ))}
                </datalist>
                <input
                  type="text"
                  value={ItemName}
                  disabled
                  className="bg-white px-2 py-2 outline-none rounded-lg"
                  placeholder="Item Name"
                />
                <input
                  type="number"
                  value={ItemQty}
                  onChange={(e) => {
                    setItemQty(e.target.value);
                    if (e.target.value === "") {
                      setItemAmount("");
                    } else {
                      setItemAmount(
                        Number(
                          ItemState.data.find((dt) => dt.code === ItemCode).sale
                        ) * Number(e.target.value)
                      );
                    }
                  }}
                  onBlur={(e) => {
                    if (Number(e.target.value) > CurrentItemQty) {
                      showWarningToast(
                        `Quantity must be less than equal to ${CurrentItemQty}`
                      );
                      setItemQty("");
                      setItemAmount("");
                    }
                  }}
                  placeholder="Enter Quantity"
                  className="px-2 py-2 outline-none rounded-lg"
                />
                <input
                  type="number"
                  value={ItemPrice}
                  disabled
                  className="bg-white px-2 py-2 outline-none rounded-lg"
                  placeholder="Unit Price"
                />
                <input
                  type="number"
                  value={ItemAmount}
                  disabled
                  className="bg-white px-2 py-2 outline-none rounded-lg"
                  placeholder="Total Amount"
                />
                <button
                  className="bg-white text-[#5A4AE3] px-3 py-2 border-2 border-white hover:bg-[#5A4AE3] hover:text-white hover:rounded-lg transition-all ease-in-out duration-500 font-bold"
                  onClick={() => {
                    if (ItemCode === "" || ItemQty === "")
                      showErrorToast("Please enter item code/qty");
                    else {
                      setNewItems([
                        ...NewItems,
                        {
                          itemId: ItemId,
                          name: ItemName,
                          qty: Number(ItemQty),
                          purchase: Number(
                            ItemState.data.find((dt) => dt.code === ItemCode)
                              .purchase
                          ),
                          price: Number(ItemPrice),
                          amount: Number(ItemAmount),
                        },
                      ]);
                      setItemCode("");
                      setItemName("");
                      setItemId("");
                      setItemQty("");
                      setItemPrice("");
                      setItemAmount("");
                    }
                  }}
                >
                  Add
                </button>
              </div>
              <div className="itemTab">
                <div className="header">
                  <div className="leftSideTitle">
                    {title === "Add New Bill"
                      ? "New Bill Detail"
                      : "Return Item Detail"}
                  </div>
                  <div className="rightSideBtn">
                    {/* <button onClick={() => setOpen(true)}>
                      <AddCircleIcon className="BtnIcon" />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </CustomerReturnCardWrapper>
    </>
  );
};

export default CustomerReturnCard;
