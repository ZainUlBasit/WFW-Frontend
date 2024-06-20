import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import {
  CrossButton,
  StyledButton,
} from "../../Pages/Admin/Item/Styling/StyleButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddingLoader from "../Loader/AddingLoader";
import { showErrorToast, showSuccessToast } from "../../utils/TaostMessages";
import AuthInput from "../Input/SimpleInput";
import CustomerPoperOver from "../Popover/CustomPopOver";
import { UpdatePayment } from "../../Https";
import { fetchPayments } from "../../store/PaymentSlice";

const EditPayment = ({ open, setOpen, paymentDetails, CurrentCustomer }) => {
  console.log(paymentDetails);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "3px solid #5A4AE3",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [Depositor, setDepositor] = useState(paymentDetails.depositor);
  const [PaymentType, setPaymentType] = useState(
    paymentDetails.payment_type === "Cash"
      ? 1
      : paymentDetails.payment_type === "Bank"
      ? 2
      : paymentDetails.payment_type === "Check" && 3
  );
  const [PaymentTypeName, setPaymentTypeName] = useState(
    paymentDetails.payment_type
  );
  const [BankId, setBankId] = useState(paymentDetails.bank_id);
  const [BankName, setBankName] = useState(paymentDetails.bank_name);
  const [AccountNo, setAccountNo] = useState(paymentDetails.bank_number);
  const [Amount, setAmount] = useState(paymentDetails.amount);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [CurrentDate, setCurrentDate] = useState(
    formatDate(paymentDetails.date)
  );
  const [Desc, setDesc] = useState(paymentDetails.desc);
  const [Loading, setLoading] = useState(false);

  const CustomerState = useSelector((state) => state.CustomerSliceReducer);
  const CompanyState = useSelector((state) => state.CompanySliceReducer);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const [CurrentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    if (paymentDetails.user_type === 1) setCurrentUserData(CompanyState.data);
    else if (paymentDetails.user_type === 2)
      setCurrentUserData(CustomerState.data);
  }, [paymentDetails.user_type, CompanyState.data, CustomerState.data]);

  const onSubmit = async () => {
    setLoading(true);
    if (Depositor && PaymentType && Amount && CurrentDate && Desc) {
      if (
        (PaymentType === 2 || PaymentType === 3) &&
        (!BankName || !AccountNo)
      ) {
        showErrorToast("Required fields are undefined!");
      } else {
        let formData = {
          depositor: Depositor,
          payment_type: PaymentType,
          amount: Number(Amount),
          date: Math.floor(new Date(CurrentDate) / 1000),
          desc: Desc,
          branch: uData.branch_number,
        };

        if (PaymentType === 2 || PaymentType === 3) {
          formData.bank_name = BankName;
          formData.bank_number = AccountNo;
        }

        try {
          const response = await UpdatePayment({
            paymentInfo: paymentDetails,
            payload: formData,
          });
          console.log(response);
          if (response.data.success) {
            showSuccessToast(response.data.data.msg);
            dispatch(fetchPayments(CurrentCustomer));
            setOpen(false);
          } else {
            showErrorToast(response.data.error.msg);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      showErrorToast("Required fields are undefined!");
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
          Edit Payment
          <CrossButton setOpen={setOpen} />
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          component={"div"}
        >
          <div className="flex-col justify-center items-center">
            <form className="flex gap-x-3 py-3 items-start justify-center w-[100%] flex-wrap gap-y-3">
              <div className="flex flex-col gap-y-3">
                <AuthInput
                  id="depositor"
                  Type="number"
                  label="Bill No"
                  placeholder="Enter Bill Number..."
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
                  label="Description"
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
                    { _id: 3, name: "Check" },
                  ]}
                />

                {PaymentType !== "" &&
                  (PaymentType === 2 || PaymentType === 3) && (
                    <>
                      <CustomerPoperOver
                        Label={"Bank"}
                        placeholder={"Select Bank..."}
                        ValueId={BankId === ""}
                        setValueId={setBankId}
                        ValueName={
                          BankName === "" ? "Select Bank..." : BankName
                        }
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
                          { _id: 12, name: "Standard Chartered Bank" },
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
                  Edit Payment
                </StyledButton>
              </div>
            )}
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default EditPayment;
