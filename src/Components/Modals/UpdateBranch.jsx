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
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../store/ItemSlice";
import BadgeIcon from "@mui/icons-material/Badge";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { toast } from "react-toastify";
import AddingLoader from "../Loader/AddingLoader";
import { listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebaseImage";
import { showErrorToast, showSuccessToast } from "../../utils/TaostMessages";
import LockIcon from "@mui/icons-material/Lock";
import StoreIcon from "@mui/icons-material/Store";
import { RegisterApi, UpdateBranchApi } from "../../Https";
import { fetchBranches } from "../../store/BranchSlice";

const UpdateBranch = ({ open, setOpen, CurrentShop }) => {
  const dispatch = useDispatch();
  const [Name, setName] = useState(CurrentShop.name);
  const [Pic, setPic] = useState("");
  const [Email, setEmail] = useState(CurrentShop.email);
  const [Password, setPassword] = useState("");
  const [BranchNumber, setBranchNumber] = useState(CurrentShop.branch_number);
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
  const [CurrentImageUrl, setCurrentImageUrl] = useState(CurrentShop.imageUrl);
  const [Loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    console.log(CurrentShop);
    setLoading(true);
    e.preventDefault();
    const imageRef = storage.ref(`/branch/${Name}`);
    try {
      let downloadURL = "";
      if (Pic !== "") {
        const snapshot = await imageRef.put(Pic);
        downloadURL = await snapshot.ref.getDownloadURL();
      } else downloadURL = CurrentShop.imageUrl;

      const bodyData =
        Password === ""
          ? {
              branchId: CurrentShop._id,
              payload: {
                name: Name,
                email: Email,
                imageUrl: downloadURL,
              },
            }
          : {
              branchId: CurrentShop._id,
              payload: {
                name: Name,
                email: Email,
                password: Password,
                imageUrl: downloadURL,
              },
            };

      console.log(bodyData);

      const response = await UpdateBranchApi(bodyData);
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        showSuccessToast(response.data?.data?.msg);
        dispatch(fetchBranches());
        setOpen(false);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  return (
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
          Update Shop
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
              <div className="flex justify-center items-center">
                <img
                  src={CurrentShop.imageUrl}
                  className="w-[120px] h-[120px] my-[20px] rounded-[50%] overflow-hidden"
                  alt="Unable to get"
                />
              </div>
              {/* Branch Name */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <BallotIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="name"
                    type="text"
                    name="name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                  />
                </div>
              </InputWrapper>
              {/* Branch Email */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <AttachEmailIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="email"
                    type="email"
                    name="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                  />
                </div>
              </InputWrapper>
              {/* Branch Password */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <LockIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="password"
                    type="password"
                    name="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                </div>
              </InputWrapper>

              {/* Branch Picture */}
              <div className="mb-[10px] flex flex-col pl-[10px]">
                <div className="text-[#5a4ae3] font-bold font-[Roboto]">
                  Upload Picture
                </div>
                <input
                  id="pic"
                  type="file"
                  name="pic"
                  onChange={(e) => setPic(e.target.files[0])}
                  placeholder="Upload Picture"
                />
              </div>
            </form>
            {Loading ? (
              <AddingLoader />
            ) : (
              <div className="flex items-center flex-col">
                <StyledButton primary onClick={onSubmit}>
                  Update
                </StyledButton>
              </div>
            )}
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default UpdateBranch;
