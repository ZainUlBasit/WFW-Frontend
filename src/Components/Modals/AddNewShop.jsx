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
import { RegisterApi } from "../../Https";
import { fetchBranches } from "../../store/BranchSlice";

const AddNewShop = ({ open, setOpen, RefreshData }) => {
  const Data = useSelector((state) => state.ItemSliceReducer.data);
  const loading = useSelector((state) => state.ItemSliceReducer.loading);
  const isError = useSelector((state) => state.ItemSliceReducer.isError);
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [Pic, setPic] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [BranchNumber, setBranchNumber] = useState("");
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
  const [CurrentImageUrl, setCurrentImageUrl] = useState("");
  const [CurrentList, setCurrentList] = useState("");
  const [Loading, setLoading] = useState(false);

  const [DataAdded, setDataAdded] = useState(false);
  const [ProcessLoading, setProcessLoading] = useState(false);

  const AddToDatabase = async () => {
    setLoading(true);
    try {
      const userInfo = {
        fullName: Name,
        email: Email,
        pic: CurrentImageUrl,
        role: "shop",
      };
      await addDoc(collection(db, "users"), userInfo);
      RefreshData();
      toast.success("Shop Successfully Added...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Email Already Registered, Login!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (
  //     CurrentImageUrl !== "" &&
  //     DataAdded !== true &&
  //     ProcessLoading === true
  //   ) {
  //     AddToDatabase();
  //     setDataAdded(true);
  //   }
  // }, [CurrentImageUrl]);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const imageRef = storage.ref(`/branch/${Name}`);
    try {
      const snapshot = await imageRef.put(Pic);
      const downloadURL = await snapshot.ref.getDownloadURL();
      const response = await RegisterApi({
        name: Name,
        email: Email,
        password: Password,
        confirmPassword: Password,
        role: 2,
        branch_number: BranchNumber,
        imageUrl: downloadURL,
      });
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        dispatch(fetchBranches());
        showSuccessToast(response.data?.data?.msg);
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
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
        >
          <AssignmentReturnIcon
            className="mr-[5px] mb-[5px]"
            style={{ fontSize: "50px" }}
          />
          Add New Shop
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
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <StoreIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="shop-number"
                    type="number"
                    name="shop-number"
                    value={BranchNumber}
                    onChange={(e) => setBranchNumber(e.target.value)}
                    placeholder="Select Branch #"
                  />
                </div>
              </InputWrapper>
              {/* Branch Picture */}
              <div className="mb-[10px] flex flex-col pl-[10px]">
                <div className="text-[#5a4ae3] font-bold font-[raleway]">
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
                  ADD BRANCH
                </StyledButton>
              </div>
            )}
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddNewShop;
