import { React, useEffect, useRef, useState } from "react";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import {
  FormHeader,
  FormWrapper,
  FormFinal,
  MainWrapper,
  StyledButton,
  StyledForm,
  InputWrapper,
  FormFooter,
} from "./Styling/LoginPageStyling";
import update_WFW_image from "../images/update_WFW_image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { loginUser } from "../https";
import { useDispatch } from "react-redux";
import { SetAuth } from "../store/AuthSlice";

const LoginPage = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const handleEvent = () => {
    const showPassword = document.getElementById("userPassword");
    if (showPassword.type === "password") showPassword.type = "text";
    else showPassword.type = "password";
    setShowPassword((ShowPassword) => !ShowPassword);
  };

  const dispatch = useDispatch();

  const [errorOccur, setErrorOccur] = useState(false);
  const [Data, setData] = useState([]);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataF = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      // console.log(dataF);
      const { data } = await loginUser(dataF);
      dispatch(SetAuth(data));
    } catch (err) {
      alert("Check email and password...!");
    }
  };
  return (
    <MainWrapper>
      <FormWrapper>
        <FormFinal>
          <FormHeader className={errorOccur ? "isRelative" : "isNotRelative"}>
            <img src={update_WFW_image} alt="logo not found...." />
            WELCOME
            <p>Sign in to your account</p>
            <p
              className={
                errorOccur ? "ErrorOccurHeader" : "ErrorNotOccurHeader"
              }
            >
              <GppBadOutlinedIcon /> Invalid Credentials
            </p>
          </FormHeader>
          <StyledForm action="./HomePage.js" method="post">
            {/* For Email Address */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                ref={emailRef}
                type="email"
                id="userEmail"
                placeholder="Enter Your Email"
                required
              />
            </InputWrapper>
            {/* For Password */}
            <InputWrapper>
              <div className="inputIcon">
                <FontAwesomeIcon icon={faKey} />
              </div>
              <input
                ref={passwordRef}
                type="password"
                id="userPassword"
                placeholder="Enter Password"
                required
                minLength="8"
              />
              <div className="eyeIcon">
                {!ShowPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={handleEvent} />
                ) : (
                  <FontAwesomeIcon icon={faEye} onClick={handleEvent} />
                )}
              </div>
            </InputWrapper>
            <div className="mainForRem">
              <div className="leftSide">
                <input type="checkbox" name="RememberMe" value="true" />
                {"  Remember Me"}
              </div>
            </div>
            <StyledButton type="submit" onClick={() => onSubmit()}>
              LOGIN
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ paddingLeft: "5px" }}
              />
            </StyledButton>
          </StyledForm>
          <FormFooter>
            <div className="rightSide">
              <Link className="forgotLink pt-[-20px]" to="/forget_password">
                Forgotten Password?
              </Link>
            </div>
            {/* <div className="flex justify-center items-center w-full h-7">
              <div className="w-[600px] text-right fontSizeE">
                Don't have an account?
              </div>
              <Link to="/signup" className="signUpLink flex justify-start">
                Sign Up
              </Link>
            </div> */}
          </FormFooter>
        </FormFinal>
      </FormWrapper>
    </MainWrapper>
  );
};

export default LoginPage;
