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
  const [cash, setCash] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [Cdate, setCdate] = useState(new Date());
  const [description, setDescription] = useState("");

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
              {/* Company name or customer name */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <PersonIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  >
                    <option value="none">
                      {title == "Customer Payment"
                        ? "Select Customer"
                        : "Select Company"}
                    </option>
                    {data.map((cust, i) => (
                      <option key={i} value={cust._id}>
                        {cust.name}
                      </option>
                    ))}
                  </StyledSelect>
                  {/* <StyledInput
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter Name..."
                  /> */}
                </div>
              </InputWrapper>
              {/* Company cash Payment or customer cash Payment */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <AddCardIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="paymentCash"
                    type="number"
                    name="paymentCash"
                    placeholder="Enter Payment Cash..."
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company account number or customer account number */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <AccountBalanceIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="name"
                    type="number"
                    name="name"
                    placeholder="Enter Account #..."
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* payment date */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <CalendarMonthIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="date"
                    type="date"
                    name="date"
                    value={Cdate}
                    onChange={setCdate}
                  />
                </div>
              </InputWrapper>
              {/* Company or Customer Description */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <DescriptionIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </InputWrapper>

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
