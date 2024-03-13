import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "../Item/Styling/ItemInputStyling";
import { StyledButton } from "../Item/Styling/StyleButton";

const ModalAddExpense = ({ setAddExpenseModal, AddExpenseModal }) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      open={AddExpenseModal}
      onClose={() => setAddExpenseModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex-col justify-center items-center">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
        >
          <PostAddIcon
            className="mr-[5px] mb-[5px]"
            style={{ fontSize: "50px" }}
          />
          Add New Expense
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Select Company */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel for="itemCompany">
                    <ApartmentIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect>
                    <option value="none">Select Category</option>
                    <option value="irshadPkg">Irshad Pkg</option>
                    <option value="zalmiPkg">Zalmi Pkg</option>
                  </StyledSelect>
                </div>
              </InputWrapper>
              {/* Category Name */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel for="categoryName">
                    <DriveFileRenameOutlineIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="categoryName"
                    type="text"
                    name="categoryName"
                    placeholder="Category name"
                  />
                </div>
              </InputWrapper>
              <StyledButton primary onClick={onSubmit}>
                ADD CATEGORY
              </StyledButton>
              <StyledButton secondary onClick={() => setAddExpenseModal(false)}>
                X
              </StyledButton>
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalAddExpense;
