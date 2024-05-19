import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "../Item/Styling/ItemInputStyling";
import { CrossButton, StyledButton } from "../Item/Styling/StyleButton";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../store/CompanySlice";
import { toast } from "react-toastify";
import CompanyDataServices from "../../../Services/company.services";
import AddingLoader from "../../../Components/Loader/AddingLoader";
import { CreateCompany } from "../../../Https";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/TaostMessages";

const ModalAddNewCompany = ({ setOpen, open }) => {
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyContact, setCompanyContact] = useState("");
  const [CompanyEmail, setCompanyEmail] = useState("");
  const [CompanyCnic, setCompanyCnic] = useState("");
  const [CompanyDesc, setCompanyDesc] = useState("");
  const [CompanyAddress, setCompanyAddress] = useState("");
  const [ProccessLoading, setProccessLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();

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

  const onSubmitForm = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const shopName = uData.userdata.fullName;
    console.log(shopName);
    const companyInfo = {
      name: CompanyName,
      email: CompanyEmail,
      contact: CompanyContact,
      cnic: CompanyCnic,
      description: CompanyDesc,
      address: CompanyAddress,
      shop: shopName,
      total: 0,
      paid: 0,
      remaining: 0,
    };

    if (
      !(CompanyName == "") &&
      !(CompanyContact == "") &&
      !(CompanyEmail == "") &&
      !(CompanyCnic == "") &&
      !(CompanyDesc == "") &&
      !(CompanyAddress == "")
    ) {
      await CompanyDataServices.addCompany(companyInfo);
      toast.success("Company Successfully Added...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(false);
      dispatch(fetchCompanies());
    } else {
      toast.warn("All Fields are Mandatory...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setProccessLoading(false);
  };

  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    if (
      !(CompanyName == "") &&
      !(CompanyContact == "") &&
      !(CompanyEmail == "") &&
      !(CompanyCnic == "") &&
      !(CompanyDesc == "") &&
      !(CompanyAddress == "")
    ) {
      try {
        const response = await CreateCompany({
          name: CompanyName,
          email: CompanyEmail,
          contact: CompanyContact,
          cnic: CompanyCnic,
          description: CompanyDesc,
          address: CompanyAddress,
          branch: uData.branch_number,
        });
        if (!response.data?.success) showErrorToast(response.data?.error?.msg);
        else {
          showSuccessToast(response.data?.data?.msg);
          dispatch(fetchCompanies(uData));
          setOpen(false);
        }
      } catch (err) {
        showErrorToast(err.response.data?.error?.msg);
      }
    } else {
      showWarningToast("Required Fields are undefined!");
    }
    setProccessLoading(false);
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
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-4 text-[#5A4AE3] "
        >
          <DomainAddIcon className="mr-[5px]" style={{ fontSize: "40px" }} />{" "}
          Add New Company
          <CrossButton setOpen={setOpen} />
        </Typography>

        <Typography
          component={"div"}
          id="modal-modal-description"
          sx={{ mt: 3 }}
        >
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Company name */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <LocationCityIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyName"
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={CompanyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Comapny Phone */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <ContactPhoneIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyContact"
                    type="number"
                    name="companyContact"
                    placeholder="Company Contact"
                    value={CompanyContact}
                    onChange={(e) => setCompanyContact(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company Email */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <EmailIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyEmail"
                    type="text"
                    name="companyEmail"
                    placeholder="Company Email"
                    value={CompanyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    InputMaskType=""
                  />
                </div>
              </InputWrapper>
              {/* company cnic */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <BadgeIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyCnic"
                    type="number"
                    name="companyCnic"
                    placeholder="Company Cnic"
                    value={CompanyCnic}
                    onChange={(e) => setCompanyCnic(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company Description */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <DescriptionIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyDescription"
                    type="text"
                    name="companyDescription"
                    placeholder="Company Description"
                    value={CompanyDesc}
                    onChange={(e) => setCompanyDesc(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company Address */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <LocationOnIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyAddress"
                    type="text"
                    name="companyAddress"
                    placeholder="Company Address"
                    value={CompanyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {ProccessLoading ? (
                <AddingLoader />
              ) : (
                <StyledButton onClick={onSubmit} primary>
                  ADD NEW COMPANY
                </StyledButton>
              )}
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalAddNewCompany;
