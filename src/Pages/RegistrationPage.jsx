import { React, useState } from "react";
import {
  FormWrapper,
  FormFinal,
  MainWrapper,
  StyledButton,
  StyledForm,
  InputWrapper,
} from "./Styling/RegistrationPageStyling";
import update_WFW_image from "../assets/images/update_WFW_image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faKey,
  faArrowRight,
  faEye,
  faPhone,
  faIdCard,
  faMapLocation,
  faShop,
  faImage,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import { IMaskInput } from "react-imask";
import { Link } from "react-router-dom";
// import { AddNewCustomer } from "../https";

// input masks
const ContactMask = "+{92}300-0000000";
const CnicMask = "00000-0000000-0";
// const EmailAddMask = /^\S*@?\S*$/

const RegistrationPage = () => {
  const handleEventPwd = () => {
    const showPassword = document.getElementById("userPassword");
    if (showPassword.type === "password") showPassword.type = "text";
    else showPassword.type = "password";
  };

  const handleEventCPwd = () => {
    const showPassword = document.getElementById("ConfirmPassword");
    if (showPassword.type === "password") showPassword.type = "text";
    else showPassword.type = "password";
  };
  // fullname: reqStr,
  // email: reqStr,
  // password: reqStr,
  // cnic: reqStr,
  // address: reqStr,
  // shop: reqStr,

  // states
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Cnic, setCnic] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");
  const [Shop, setShop] = useState("");

  // OnSubmit Function
  const onSubmit = async (e) => {
    e.preventDefault();
    const customerInfo = {
      fullname: FullName,
      email: Email,
      password: Password,
      // confirmpassword: ConfirmPassword,
      cnic: Cnic,
      contact: Contact,
      address: Address,
      shop: Shop,
    };
    if (
      !(FullName === "") ||
      !(Email === "") ||
      !(Password === "") ||
      !(Cnic === "") ||
      !(Contact === "") ||
      !(Address === "") ||
      !(Shop === "")
    ) {
      // const { data } = await AddNewCustomer(customerInfo);
      // console.log(data);
    }
    console.log(customerInfo);
  };

  return (
    <MainWrapper>
      <FormWrapper>
        <FormFinal>
          <div className="FormHead mb-[20px] select-none">
            <img src={update_WFW_image} alt="logo not found...." />
            <p>Registration</p>
          </div>
          <StyledForm onSubmit={onSubmit}>
            {/* Full Name */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Your Name..."
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </InputWrapper>
            {/* Contact */}
            {/* <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <IMaskInput
                placeholder="+92345-1234567"
                mask={ContactMask}
                // onAccept={(value, mask) => console.log(value, mask)}
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
                name="ContactNumber"
                id="ContactNumber"
                required
              />
            </InputWrapper> */}
            {/* Email */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Your Email..."
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputWrapper>
            {/* Password */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faKey} />
              </div>
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                placeholder="Enter Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
              <div className="eyeIcon">
                <FontAwesomeIcon icon={faEye} onClick={handleEventPwd} />
              </div>
            </InputWrapper>
            {/* Confirm Password */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faKey} />
              </div>
              <input
                type="password"
                name="ConfirmPassword"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
              />
              <div className="eyeIcon">
                <FontAwesomeIcon icon={faEye} onClick={handleEventCPwd} />
              </div>
            </InputWrapper>
            {/* Cnic */}
            {/* <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faIdCard} />
              </div>
              <IMaskInput
                placeholder="17000-1234567-8"
                mask={CnicMask}
                name="CnicNumber"
                id="CnicNumber"
                value={Cnic}
                onChange={(e) => setCnic(e.target.value)}
                required
              />
            </InputWrapper> */}
            {/* Role */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faPeopleArrows} />
              </div>
              <select
                className="dropDownList w-full"
                value={Shop}
                onChange={(e) => setShop(e.target.value)}
              >
                <option value="none" selected>
                  Select Role
                </option>
                <option value="shop">Shop</option>
                <option value="admin">Admin</option>
              </select>
            </InputWrapper>
            {/* Pic */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faImage} />
              </div>
              <input
                type="file"
                name="Address"
                id="fileInput"
                placeholder="Enter Your Address..."
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="bg-white m-0 py-[4px] flex justify-center items-center"
              />
            </InputWrapper>
            <StyledButton type="submit">
              Register
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ paddingLeft: "5px" }}
              />
            </StyledButton>
            <div className="FooterForm">
              <div className="FooterText">Already have an account?</div>
              <Link to="/" className="signUpLink">
                Sign In
              </Link>
            </div>
          </StyledForm>
        </FormFinal>
      </FormWrapper>
    </MainWrapper>
  );
};

export default RegistrationPage;
