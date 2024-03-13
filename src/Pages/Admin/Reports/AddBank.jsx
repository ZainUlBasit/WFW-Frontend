import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import React, { useState, useEffect } from "react";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PaymentsIcon from "@mui/icons-material/Payments";
import InfoIcon from "@mui/icons-material/Info";
import {
  InputWrapper,
  StyledInput,
  StyledLabel,
} from "../Item/Styling/ItemInputStyling";
import DescriptionIcon from "@mui/icons-material/Description";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
// import { AddNewBank, AddNewExpense } from "../../../https";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../../store/ExpenseSlice";

const AddBank = ({ open, setOpen }) => {
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

  const [bankname, setbankname] = useState("");
  const [accountno, setAccountno] = useState("");

  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (accountno !== "" && bankname === "") {
      alert("Enter data and try again...");
    } else {
      const bankInfo = {
        bankname,
        accountno,
        shop: uData.userdata.name,
      };
      try {
        // const { data } = await AddNewBank(bankInfo);
      } catch (err) {
        console.log("Error Occured: ", err.message);
      }
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex-col justify-center items-center">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-4 text-[#5A4AE3] "
        >
          <DomainAddIcon className="mr-[5px]" style={{ fontSize: "40px" }} />{" "}
          Add New Bank
        </Typography>

        <Typography
          component={"div"}
          id="modal-modal-description"
          sx={{ mt: 3 }}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Purchase Rate */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[2px] rounded-[5px]">
                  <StyledLabel>
                    <PriceChangeIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="bankname"
                    type="text"
                    name="bankname"
                    value={bankname}
                    onChange={(e) => setbankname(e.target.value)}
                    placeholder="Enter Bank Name..."
                  />
                </div>
              </InputWrapper>

              <InputWrapper>
                <div className="bg-[#5a4ae3] flex py-[2px] rounded-[5px]">
                  <StyledLabel>
                    <DescriptionIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="accountno"
                    type="number"
                    name="accountno"
                    value={accountno}
                    onChange={(e) => setAccountno(e.target.value)}
                    placeholder="Enter Bank Account..."
                  />
                </div>
              </InputWrapper>

              <Button variant="contained" onClick={onSubmit}>
                Add Bank
              </Button>
              <Button onClick={() => setOpen(false)} variant="text">
                X
              </Button>
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddBank;
