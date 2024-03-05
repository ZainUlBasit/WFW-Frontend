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
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../store/CompanySlice";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import cashpaymentServices from "../../../Services/cashpayment.services";
import companyServices from "../../../Services/company.services";

const CompanyPaymentModal = (props) => {
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
  const [company, setCompany] = useState("");
  const [cash, setCash] = useState();
  const [accountNo, setAccountNo] = useState("");
  const [Cdate, setCdate] = useState(new Date());
  const [description, setDescription] = useState("");
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(company);
    let companyid = props.data.filter((d) => d.name === company);
    companyid = companyid[0]._id;
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date(Cdate));
    const paymentInfo = {
      user_id: companyid,
      name: company,
      cash: cash,
      accountno: accountNo,
      date: timestamp,
      description: description,
      shop: uData.userdata.fullName,
    };
    if (
      cash == "" ||
      company == "" ||
      accountNo == "" ||
      Cdate === "" ||
      description == ""
    ) {
      alert("please fill all fields");
    } else {
      await cashpaymentServices.addPayment(paymentInfo);
      const id = companyid;
      await companyServices.updateCompanyCash(id, cash);
      alert("Cash Added..!");
      dispatch(fetchCompanies({ shop: uData.userdata.fullName }));
      props.setOpen(false);
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
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
          {props.title}
        </Typography>

        <Typography
          component={"div"}
          id="modal-modal-description"
          sx={{ mt: 3 }}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Company name or company name */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <PersonIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option value="none">
                      {props.title == "Customer Payment"
                        ? "Select Customer"
                        : "Select Company"}
                    </option>
                    {props.data.map((cust, i) => (
                      <option key={i} value={cust.fullname || cust.name}>
                        {cust.fullname || cust.name}
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
              <Button onClick={() => props.setOpen(false)} variant="text">
                Close
              </Button>
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default CompanyPaymentModal;
