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
import { fetchBranches } from "../../store/BranchSlice";
import { CreatePayment, RegisterApi } from "../../Https";
import AuthInput from "../Input/SimpleInput";
import AuthInputPopOver from "../Input/CustomPopover";
import CustomerPoperOver from "../Popover/CustomPopOver";
import { fetchCompanies } from "../../store/CompanySlice";
import { fetchCustomers } from "../../store/CustomerSlice";

const AddPayment = ({ open, setOpen }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: auto,
    bgcolor: "background.paper",
    border: "3px solid #5A4AE3",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [UserType, setUserType] = useState("");
  const [UserTypeName, setUserTypeName] = useState("");
  const [UserId, setUserId] = useState("");
  const [UserName, setUserName] = useState("");
  //   const [UserId, setUserId] = useState("");
  const [Depositor, setDepositor] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const [PaymentTypeName, setPaymentTypeName] = useState("");
  const [BankId, setBankId] = useState("");
  const [BankName, setBankName] = useState("");
  const [AccountNo, setAccountNo] = useState("");
  const [Amount, setAmount] = useState("");
  const [CurrentDate, setCurrentDate] = useState("");
  const [Desc, setDesc] = useState("");

  const [Loading, setLoading] = useState(false);

  const CustomerState = useSelector((state) => state.CustomerSliceReducer);
  const CompanyState = useSelector((state) => state.CompanySliceReducer);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const [CurrentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    dispatch(fetchCompanies(uData));
    dispatch(fetchCustomers(uData));
  }, []);

  useEffect(() => {
    if (UserType === 1) setCurrentUserData(CompanyState.data);
    else if (UserType === 2) setCurrentUserData(CustomerState.data);
  }, [UserType]);

  const onSubmit = async () => {
    if (
      UserType !== "" &&
      UserId !== "" &&
      Depositor !== "" &&
      PaymentType !== "" &&
      Amount !== "" &&
      CurrentDate !== "" &&
      Desc !== ""
    ) {
      if (PaymentType === 2 && BankName === "" && AccountNo === "")
        showErrorToast("Required fields are undefined!");
      else {
        const formData = new FormData();
        formData.append("user_type", UserType);
        formData.append("user_Id", UserId);
        formData.append("user_name", UserName);
        formData.append("depositor", Depositor);
        formData.append("payment_type", PaymentType);
        formData.append("amount", Amount);
        formData.append("date", CurrentDate);
        formData.append("desc", Desc);
        formData.append("branch", uData.branch_number);

        if (PaymentType === 2) {
          formData.append("bank_name", BankName);
          formData.append("bank_number", AccountNo);
        }
        const response = await CreatePayment(formData);
        console.log(response);
      }
    } else {
      showErrorToast("Required fields are undefined!");
    }
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
          Add Payment
          <CrossButton setOpen={setOpen} />
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          component={"div"}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex gap-x-3 py-3 items-start justify-center w-[100%] flex-wrap gap-y-3">
              <div className="flex flex-col gap-y-3">
                {/* <AuthInputPopOver
                  label={"User Type"}
                  placeholder={"Select User Type..."}
                  required={true}
                  Value={UserType}
                  onClick={() => {}}
                /> */}

                <CustomerPoperOver
                  Label={"User Type"}
                  placeholder={"Select User Type..."}
                  ValueId={UserType === ""}
                  setValueId={setUserType}
                  ValueName={
                    UserTypeName === "" ? "Select User Type..." : UserTypeName
                  }
                  setValueName={setUserTypeName}
                  Values={[
                    { _id: 1, name: "Company" },
                    { _id: 2, name: "Customer" },
                  ]}
                />
                {UserType !== "" && (
                  <CustomerPoperOver
                    Label={"User"}
                    placeholder={"Select User..."}
                    ValueId={UserId === ""}
                    setValueId={setUserId}
                    ValueName={UserName === "" ? "Select User..." : UserName}
                    setValueName={setUserName}
                    Values={CurrentUserData}
                  />
                )}
                {/* <AuthInputPopOver
                  label={"User"}
                  placeholder={"Select User..."}
                  required={true}
                  Value={UserId}
                  onClick={() => {}}
                /> */}
                <AuthInput
                  id="depositor"
                  Type="text"
                  label="Depositor"
                  placeholder="Enter Depositor Name..."
                  required={true}
                  Value={Depositor}
                  setValue={setDepositor}
                  readonly={false}
                  disabled={false}
                />
                <AuthInput
                  id="amount"
                  Type="number"
                  label="Amount"
                  placeholder="Enter Amount..."
                  required={true}
                  Value={Amount}
                  setValue={setAmount}
                  readonly={false}
                  disabled={false}
                />
                <AuthInput
                  id="desc"
                  Type="text"
                  label="Desciption"
                  placeholder="Enter Description..."
                  required={true}
                  Value={Desc}
                  setValue={setDesc}
                  readonly={false}
                  disabled={false}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <AuthInput
                  id="date"
                  Type="date"
                  label="Date"
                  placeholder="Date"
                  required={true}
                  Value={CurrentDate}
                  setValue={setCurrentDate}
                  readonly={false}
                  disabled={false}
                />

                <CustomerPoperOver
                  Label={"Payment Type"}
                  placeholder={"Select Payment Type..."}
                  ValueId={PaymentType === ""}
                  setValueId={setPaymentType}
                  ValueName={
                    PaymentTypeName === ""
                      ? "Select Payment Type..."
                      : PaymentTypeName
                  }
                  setValueName={setPaymentTypeName}
                  Values={[
                    { _id: 1, name: "Cash" },
                    { _id: 2, name: "Bank" },
                  ]}
                />

                {PaymentType !== "" && PaymentType === 2 && (
                  <>
                    <CustomerPoperOver
                      Label={"Bank"}
                      placeholder={"Select Bank..."}
                      ValueId={BankId === ""}
                      setValueId={setBankId}
                      ValueName={BankName === "" ? "Select Bank..." : BankName}
                      setValueName={setBankName}
                      Values={[
                        { _id: 1, name: "National Bank of Pakistan" },
                        { _id: 2, name: "Habib Bank Limited" },
                        { _id: 3, name: "United Bank Limited" },
                        { _id: 4, name: "MCB Bank Limited" },
                        { _id: 5, name: "Allied Bank Limited" },
                        { _id: 6, name: "Bank Alfalah Limited" },
                        { _id: 7, name: "Askari Bank Limited" },
                        { _id: 8, name: "Faysal Bank Limited" },
                        { _id: 9, name: "Bank Al-Habib Limited" },
                        { _id: 10, name: "Habib Metropolitan Bank" },
                        { _id: 11, name: "Soneri Bank Limited" },
                        {
                          _id: 12,
                          name: "Standard Chartered Bank",
                        },
                        { _id: 13, name: "Summit Bank Limited" },
                        { _id: 14, name: "Silkbank Limited" },
                        { _id: 15, name: "Sindh Bank Limited" },
                        { _id: 16, name: "BankIslami Pakistan Limited" },
                        { _id: 17, name: "Al Baraka Bank" },
                        { _id: 18, name: "Dubai Islamic Bank" },
                        { _id: 19, name: "JS Bank Limited" },
                        { _id: 20, name: "Meezan Bank Limited" },
                      ]}
                    />
                    <AuthInput
                      id="account-no"
                      Type="text"
                      label="Account No"
                      placeholder="Enter Account Number..."
                      required={true}
                      Value={AccountNo}
                      setValue={setAccountNo}
                      readonly={false}
                      disabled={false}
                    />
                  </>
                )}
              </div>
            </form>
            {Loading ? (
              <AddingLoader />
            ) : (
              <div className="flex items-center flex-col">
                <StyledButton primary onClick={onSubmit}>
                  Add Payment
                </StyledButton>
              </div>
            )}
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddPayment;
