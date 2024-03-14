import React, { useState } from "react";
import { Logo } from "./Logo";
import { LoginCompWrapper } from "./LoginCompWrapper";
import { HeaderText } from "./HeaderText";
import InputComponent from "../Input/InputComponent";
// icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import OrComp from "./OrComp";
import LoginButton from "../Buttons/LoginButton";
import ForgotLink from "./ForgotLink";
import { useDispatch } from "react-redux";
import { SetAuth } from "../../store/AuthSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import UserDataServices from "../../Services/user.services";
import AddingLoader from "../Loader/AddingLoader";
import { LoginApi } from "../../Https";
import { showErrorToast } from "../../utils/TaostMessages";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ProcessLoading, setProcessLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setProcessLoading(true);
    let response;
    try {
      if (!email || !password) {
        toast.warn("All fields are mandatory...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        response = await LoginApi({ email, password });
        if (!response.data?.success) {
          toast.error(response.data.error.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (response.data?.success) {
          dispatch(SetAuth(response.data.data.payload));
          toast.success(response.data.data.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      setProcessLoading(false);
      showErrorToast(error.response.data.error.msg);
      // showErrorToast(
      //   error.response?.data?.error?.msg
      // );
    }
    setProcessLoading(false);
  };
  return (
    <LoginCompWrapper>
      <div className="bg-white px-[40px] py-[10px] pb-[30px] flex justify-center items-center flex-col rounded-[5px] border-y-[3px] border-y-[#5a4ae3]">
        <Logo />
        <HeaderText />
        <InputComponent
          icon={AccountBoxIcon}
          id="useremail"
          type="email"
          name="useremail"
          placeholder="Enter Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputComponent
          icon={LockOpenIcon}
          id="userpassword"
          type="password"
          name="userpassword"
          placeholder="Enter Your Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {ProcessLoading ? (
          <AddingLoader />
        ) : (
          <LoginButton onClick={handleLogin} />
        )}
        <OrComp />
        <ForgotLink />
      </div>
    </LoginCompWrapper>
  );
};

export default LoginComp;
