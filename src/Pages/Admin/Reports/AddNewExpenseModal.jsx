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
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../../store/ExpenseSlice";
import expenseServices from "../../../Services/expense.services";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/TaostMessages";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { CreateReport } from "../../../Https";

const ModalAddExpense = (props) => {
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

  const [Expense, setExpense] = useState("");
  const [CurrentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [Desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Expense === 0 && Desc === "") {
      showWarningToast("Required fields are undefined!");
    } else {
      try {
        const response = await CreateReport({
          date: CurrentDate,
          desc: Desc,
          expense: Expense,
          branch: uData.branch_number,
        });
        if (!response.data?.success) showErrorToast(response.data?.error?.msg);
        else {
          showSuccessToast(response.data?.data?.msg);
          props.setAddExpenseModal(false);
          // setCategoryModal(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Modal
      open={props.AddExpenseModal}
      onClose={() => props.setAddExpenseModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex-col justify-center items-center">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-4 text-[#5A4AE3] "
        >
          <DomainAddIcon className="mr-[5px]" style={{ fontSize: "40px" }} />{" "}
          Add New Expense
        </Typography>

        <Typography
          component={"div"}
          id="modal-modal-description"
          sx={{ mt: 3 }}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Date */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[2px] rounded-[5px]">
                  <StyledLabel>
                    <DateRangeIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="date"
                    type="date"
                    name="date"
                    value={CurrentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    placeholder="Date..."
                  />
                </div>
              </InputWrapper>
              {/* Purchase Rate */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[2px] rounded-[5px]">
                  <StyledLabel>
                    <PriceChangeIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="expensePrice"
                    type="number"
                    name="expensePrice"
                    value={Expense}
                    onChange={(e) => setExpense(e.target.value)}
                    placeholder="Expense Price..."
                  />
                </div>
              </InputWrapper>

              <InputWrapper>
                <div className="bg-[#5a4ae3] flex py-[2px] rounded-[5px]">
                  <StyledLabel>
                    <DescriptionIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="expenseDesc"
                    type="text"
                    name="expenseDesc"
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Expense Description..."
                  />
                </div>
              </InputWrapper>

              <Button variant="contained" onClick={onSubmit}>
                Add EXPENSE
              </Button>
              <Button
                onClick={() => props.setAddExpenseModal(false)}
                variant="text"
              >
                X
              </Button>
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalAddExpense;
