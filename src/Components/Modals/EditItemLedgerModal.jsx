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
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
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
import { fetchBranches } from "../../store/BranchSlice";
import { CreateCustomer, UpdateInvoiceItem } from "../../Https";
import { showErrorToast, showSuccessToast } from "../../utils/TaostMessages";
import { fetchTransactions } from "../../store/TransactionSlice";
import { fetchCustomers } from "../../store/CustomerSlice";

const EditItemLedgerModal = ({
  setOpen,
  open,
  CurrentState,
  CurrentCustomer,
}) => {
  console.log("========================");
  console.log(CurrentState);
  console.log("========================");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
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

  const Branches = useSelector((state) => state.branches.data);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await UpdateInvoiceItem({
        InvoiceInfo: CurrentState,
        updateValue: {
          qty: Number(itemQty),
          price: Number(itemPrice),
          amount: Number(itemQty) * Number(itemPrice),
        },
        customerId: CurrentCustomer.customerId,
      });

      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        showSuccessToast(response.data?.data?.msg);
        dispatch(fetchTransactions(CurrentCustomer));
        dispatch(fetchCustomers(uData));

        setOpen(false);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  const [itemName, setitemName] = useState(CurrentState.name);
  const [itemQty, setitemQty] = useState(CurrentState.qty);
  const [itemPrice, setitemPrice] = useState(CurrentState.price);
  const [itemAmount, setitemAmount] = useState(CurrentState.amount);
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
          Edit Ledger
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
              <div className="flex gap-x-5 flex-wrap">
                <div>
                  {/* ItemName */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <AccountBoxIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        value={itemName}
                        onChange={(e) => {}}
                        id="username"
                        type="text"
                        name="username"
                        placeholder="User Name"
                      />
                    </div>
                  </InputWrapper>
                  {/* Qty */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <ProductionQuantityLimitsIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        value={itemQty}
                        onChange={(e) => setitemQty(e.target.value)}
                        id="qty"
                        type="number"
                        name="qty"
                        placeholder="Qty"
                      />
                    </div>
                  </InputWrapper>
                  {/* Price */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <PriceChangeIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        value={itemPrice}
                        onChange={(e) => {
                          setitemPrice(e.target.value);
                        }}
                        id="price"
                        type="number"
                        name="price"
                        placeholder="Price"
                      />
                    </div>
                  </InputWrapper>
                  {/* Amount */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel>
                        <LocalAtmIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        value={Number(itemPrice) * Number(itemQty)}
                        onChange={(e) => {}}
                        id="amount"
                        type="number"
                        name="amount"
                        placeholder="Amount"
                      />
                    </div>
                  </InputWrapper>
                </div>
              </div>
            </form>

            <div className="flex items-center flex-col font-[Roboto]">
              {!Loading ? (
                <StyledButton primary onClick={onSubmit}>
                  Update
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

export default EditItemLedgerModal;
