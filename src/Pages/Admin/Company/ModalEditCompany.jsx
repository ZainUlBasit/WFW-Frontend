import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
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
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Rows } from "../../../DemoData/CompaniesInfo";
import {
  InputWrapper,
  StyledInput,
  StyledLabel,
} from "../Item/Styling/ItemInputStyling";
import { CrossButton, StyledButton } from "../Item/Styling/StyleButton";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { fetchCompanies } from "../../../store/CompanySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CompanyDataServices from "../../../Services/company.services";
import AddingLoader from "../../../Components/Loader/AddingLoader";
import { DeleteCompany } from "../../../Https";
import { showErrorToast } from "../../../utils/TaostMessages";

const ModalEditCompany = ({ setOpen, open, selComp }) => {
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
  const [curData, setCurData] = useState();
  const [CompanyId, setCompanyId] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyDesc, setCompanyDesc] = useState("");
  const [CompanyContact, setCompanyContact] = useState("");
  const [CompanyAddress, setCompanyAddress] = useState("");
  const [CompanyCnic, setCompanyCnic] = useState("");
  const [CompanyEmail, setCompanyEmail] = useState("");
  const [ProccessLoading, setProccessLoading] = useState(false);

  const setData = () => {
    console.log(selComp);
    selComp.map((item) => {
      setCompanyId(item.companyId);
      setCompanyName(item.companyName);
      setCompanyDesc(item.companyDesc);
      setCompanyContact(item.companyContact);
      setCompanyAddress(item.companyAddress);
      setCompanyCnic(item.companyCnic);
      setCompanyEmail(item.companyEmail);
      return "";
    });
  };

  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    setData();
  }, []);

  const onUpdate = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const companyInfo = {
      name: CompanyName,
      email: CompanyEmail,
      contact: CompanyContact,
      cnic: CompanyCnic,
      description: CompanyDesc,
      address: CompanyAddress,
    };

    if (
      !(CompanyName == "") &&
      !(CompanyContact == "") &&
      !(CompanyEmail == "") &&
      !(CompanyCnic == "") &&
      !(CompanyDesc == "") &&
      !(CompanyAddress == "")
    ) {
      try {
        const response = await DeleteCompany({ companyId: CompanyId });
        if (!response.data?.success) showErrorToast(response.data?.error?.msg);
        else {
          showSuccessToast(response.data?.data?.msg);
          dispatch(fetchCompanies(uData));
          setOpen(false);
        }
      } catch (err) {
        showErrorToast(err.response?.data?.error?.msg);
      }
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

  const onDelete = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    if (CompanyId !== "") {
      await CompanyDataServices.deleteCompany(CompanyId);
      setOpen(false);
      dispatch(fetchCompanies());
      toast.success("Company Successfully Deleted...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn("Select Company then Try...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setProccessLoading(false);
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
          <AppRegistrationIcon
            className="mr-[5px]"
            style={{ fontSize: "40px" }}
          />{" "}
          Edit Company
          <CrossButton setOpen={setOpen} />
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 3 }}>
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Company name */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel htmlFor="itemCode">
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
                  <StyledLabel htmlFor="itemCode">
                    <ContactPhoneIcon className="LabelIcon" />
                  </StyledLabel>
                  <IMaskInput
                    className="pl-[5px] py-[4px] w-[244px] mr-[2px] ml-[7px] outline-none border-[2px] focus:border-b-[#5A4AE3] transition-all duration-700 text-[1.05rem] rounded-l-[0px] rounded-r-[5px] font-[raleway]  text-[#5A4AE3] font-[700]"
                    placeholder="+92345-1234567"
                    mask={"+{92}300-0000000"}
                    // onAccept={(value, mask) => console.log(value, mask)}
                    id="companyContact"
                    name="companyContact"
                    value={CompanyContact}
                    onChange={(e) => setCompanyContact(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company Email */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel htmlFor="itemCode">
                    <EmailIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyEmail"
                    type="text"
                    name="companyEmail"
                    placeholder="Company Email"
                    value={CompanyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* company cnic */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel htmlFor="itemCode">
                    <BadgeIcon className="LabelIcon" />
                  </StyledLabel>
                  <IMaskInput
                    className="pl-[5px] py-[4px] w-[244px] mr-[2px] ml-[7px] outline-none border-[2px] focus:border-b-[#5A4AE3] transition-all duration-700 text-[1.05rem] rounded-l-[0px] rounded-r-[5px] font-[raleway]  text-[#5A4AE3] font-[700]"
                    placeholder="12345-1234567-8"
                    mask={"{00000}-0000000-0"}
                    // onAccept={(value, mask) => console.log(value, mask)}
                    id="companyCnic"
                    name="companyCnic"
                    value={CompanyCnic}
                    onChange={(e) => setCompanyCnic(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company Description */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel htmlFor="itemCode">
                    <DescriptionIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="companyDesc"
                    type="text"
                    name="companyDesc"
                    placeholder="Company Desc"
                    value={CompanyDesc}
                    onChange={(e) => setCompanyDesc(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company Address */}
              {/* <Box
                className="w-[100%] mb-[30px] flex justify-center items-center"
                sx={{ display: "flex", alignItems: "flex-end" }}
              > */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel htmlFor="itemCode">
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
                <div className="flex w-[90%] my-[10px] justify-between">
                  <StyledButton primary update onClick={onUpdate}>
                    UPDATE
                  </StyledButton>
                  <StyledButton primary delete onClick={onDelete}>
                    DELETE
                  </StyledButton>
                </div>
              )}
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalEditCompany;
