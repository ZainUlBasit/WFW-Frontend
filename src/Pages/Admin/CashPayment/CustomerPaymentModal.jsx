import TextField from "@mui/material/TextField";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AddCardIcon from "@mui/icons-material/AddCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "../Item/Styling/ItemInputStyling";
import { useEffect, useState } from "react";
import CustomDatePicker from "../../../Components/DatePicker/CustomDatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../store/CustomerSlice";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import cashpaymentServices from "../../../Services/cashpayment.services";
import customerServices from "../../../Services/customer.services";
import AuthInputPopOver from "../../../Components/Input/CustomPopover";

const PaymentModal = ({ title, open, setOpen, data }) => {
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
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();
  const [Current, setCurrent] = useState("");

  const [customer, setCustomer] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [cash, setCash] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [Cdate, setCdate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [Depositor, setDepositor] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const [BankName, setBankName] = useState("");
  const [CurrentDate, setCurrentDate] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    let custid = data.filter((d) => d._id === customer);
    console.log(data);
    custid = custid[0]._id;

    const timestamp = firebase.firestore.Timestamp.fromDate(new Date(Cdate));

    const paymentInfo = {
      user_id: custid,
      name: customer,
      cash: cash,
      accountno: accountNo,
      date: timestamp,
      description: description,
      shop: uData.userdata.fullName,
    };
    if (!cash || !customer || !accountNo || !Cdate || !description) {
      alert("please fill all fields");
    } else {
      await cashpaymentServices.addPayment(paymentInfo);
      const id = custid;
      await customerServices.updateCustomerCash(id, cash);
      alert("Cash Added..!");
      dispatch(fetchCustomers({ shop: uData.userdata.fullName }));
      setOpen(false);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const PopoverOpen = Boolean(anchorEl);
  const id = PopoverOpen ? "simple-popover" : undefined;

  const [SearchText, setSearchText] = useState("");

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
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-4 text-[#5A4AE3] "
        >
          <ReceiptIcon className="mr-[5px]" style={{ fontSize: "40px" }} />{" "}
          {title}
        </Typography>

        <Typography
          component={"div"}
          id="modal-modal-description"
          sx={{ mt: 3 }}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              <div className="w-[297]">
                <AuthInputPopOver
                  // label="Select Customer...!"
                  placeholder={
                    props.title === "CUSTOMER LEDGER"
                      ? "Select Customer..."
                      : "Select Company..."
                  }
                  required={true}
                  Value={CustomerName}
                  onClick={handleClick}
                />
              </div>

              <Popover
                id={id}
                open={PopoverOpen}
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
                          className="w-full px-4 py-2 outline-none rounded-md placeholder:text-gray-500 text-black font-[Roboto] font-bold"
                          placeholder="Search...."
                          value={SearchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>
                      {data
                        .filter((cust) => {
                          const searchTextLower = SearchText.toLowerCase();
                          const custLower = cust.name.toLowerCase();
                          return searchTextLower !== ""
                            ? custLower.includes(searchTextLower)
                            : true;
                        })
                        .map((Comp, i) => {
                          return (
                            <div
                              className="flex gap-x-3 items-center cursor-pointer font-bold font-[Roboto] text-xl"
                              onClick={() => {
                                handleClose();
                                props.setSelectCompany({
                                  name: Comp._id,
                                  _name: Comp.name,
                                  found: true,
                                });
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                checked={Comp._id === props.SelectCompany.name}
                              />
                              <span>{Comp.name}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Typography>
              </Popover>

              <Button variant="contained" onClick={onSubmit}>
                Add Payment
              </Button>
              <Button onClick={() => setOpen(false)} variant="text">
                Close
              </Button>
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
