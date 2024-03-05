import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CategoryIcon from "@mui/icons-material/Category";
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
  StyledSelect,
} from "../Item/Styling/ItemInputStyling";
import DescriptionIcon from "@mui/icons-material/Description";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../../store/ExpenseSlice";

const AddAmountModal = ({ open, setOpen }) => {
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
  const [amount, setAmount] = useState("");

  const [Banks, setBanks] = useState([]);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    const FetchData = async () => {
      // let { data } = await GetAllBank();
      // data = data.filter((dt) => dt.shop === uData.userdata.name);
      setBanks([]);
    };
    FetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (amount !== "" && bankname === "") {
      alert("Enter data and try again...");
    } else {
      const bankInfo = { bankid: bankname, amount };
      try {
        // const { data } = await AddAmount(bankInfo);
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
          Add Amount
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
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel htmlFor="banks">
                    <CategoryIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    value={bankname}
                    onChange={(e) => setbankname(e.target.value)}
                  >
                    <option value="none">Select Bank</option>
                    {Banks.map((val, i) => (
                      <option key={i} value={val._id}>
                        {val.bankname}
                      </option>
                    ))}
                  </StyledSelect>
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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

export default AddAmountModal;
