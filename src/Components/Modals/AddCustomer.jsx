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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import BadgeIcon from "@mui/icons-material/Badge";
import CallIcon from "@mui/icons-material/Call";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import StoreIcon from "@mui/icons-material/Store";
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
import UserDataServices from "../../Services/user.services";
import customerServices from "../../Services/customer.services";
import { toast } from "react-toastify";
import AddingLoader from "../Loader/AddingLoader";

const AddCustomerModal = ({ setOpen, open }) => {
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const Data = useSelector((state) => state.AutoLoginSliceReducer.data);
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
    console.log(Data);
  }, []);

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Cnic, setCnic] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");
  const [Shop, setShop] = useState("");
  const [Users, setUsers] = useState([]);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = {
      name: Name,
      email: Email,
      cnic: Cnic,
      contact: Contact,
      address: Address,
      shop: uData.userdata.fullName,
      paid: 0,
      total: 0,
      remaining: 0,
      discount: 0,
      advance: 0,
      verify: false,
      page: 0,
      ref: "no",
    };
    try {
      await customerServices.addCustomer(formData);
      toast.success("Successfully Customer added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(false);
    } catch (err) {
      toast.error("Unable to add Customer", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const FetchData = async () => {
      let response = await UserDataServices.getUsers();
      response = response.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      }));
      response = response.filter((data) => data.role === "shop");
      setUsers(response);
    };
    FetchData();
  }, []);
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
          Add Customer
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
              {/* Username */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <AccountBoxIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    id="username"
                    type="text"
                    name="username"
                    placeholder="User Name"
                  />
                </div>
              </InputWrapper>
              {/* Email */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <MailIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
              </InputWrapper>
              {/* Password */}
              {/* <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <LockIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </InputWrapper> */}
              {/* Confirm Password */}
              {/* <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <SyncLockIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmpassword"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </InputWrapper> */}
              {/* CNIC */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <BadgeIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    value={Cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    id="cnic"
                    type="text"
                    name="cnic"
                    placeholder="CNIC"
                  />
                </div>
              </InputWrapper>
              {/* Contact */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <CallIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    id="contact"
                    type="text"
                    name="contact"
                    placeholder="Contact"
                  />
                </div>
              </InputWrapper>
              {/* Address */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <FmdGoodIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                </div>
              </InputWrapper>
              {/* Select Shop */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <StoreIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    onChange={(e) => {
                      setShop(e.target.value);
                    }}
                  >
                    <option disabled value="none" selected>
                      Select Shop
                    </option>
                    {Users.map((val, i) => {
                      return (
                        <option value={val.fullName} key={i}>
                          {val.fullName}
                        </option>
                      );
                    })}
                  </StyledSelect>
                </div>
              </InputWrapper>
            </form>

            <div className="flex items-center flex-col font-[raleway]">
              {!Loading ? (
                <StyledButton primary onClick={onSubmit}>
                  ADD CUSTOMER
                </StyledButton>
              ) : (
                <AddingLoader />
              )}
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddCustomerModal;
