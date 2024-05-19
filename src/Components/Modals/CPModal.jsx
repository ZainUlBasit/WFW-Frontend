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
import { StyledButton } from "../../Pages/Admin/Item/Styling/StyleButton";
import { Data } from "../../DemoData/ItemDataCode";
import { useDispatch, useSelector } from "react-redux";
import { isOpenModal } from "../../store/CPSlice";

// Icons
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PatternOutlinedIcon from "@mui/icons-material/PatternOutlined";
import SyncLockOutlinedIcon from "@mui/icons-material/SyncLockOutlined";

const CPModal = () => {
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

  const isOpModal = useSelector((state) => state.CPSliceReducer.OpenModal);
  const dispatch = useDispatch();

  return (
    <Modal
      open={isOpModal}
      onClose={() => dispatch(isOpenModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex-col justify-center items-center">
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
          Change Password
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          component={"div"}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Current Password */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <KeyOutlinedIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="currPassword"
                    type="password"
                    name="currPassword"
                    placeholder="Current Password..."
                  />
                </div>
              </InputWrapper>
              {/* New Password */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <PatternOutlinedIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    placeholder="New Password..."
                  />
                </div>
              </InputWrapper>
              {/* Confirm Password */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <SyncLockOutlinedIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password..."
                  />
                </div>
              </InputWrapper>
            </form>
            <div className="flex items-center flex-col">
              <StyledButton primary>Update Password</StyledButton>
              <StyledButton secondary onClick={() => dispatch(isOpenModal())}>
                X
              </StyledButton>
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default CPModal;
