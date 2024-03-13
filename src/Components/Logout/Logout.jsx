import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import DataLoader from "../Loader/DataLoader";
import { LogoutApi } from "../../https";
import { showErrorToast, showSuccessToast } from "../../utils/TaostMessages";
import { SetAuthNotFound } from "../../store/AuthSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutFunction = async () => {
    try {
      const response = await LogoutApi();
      if (!response.data?.success)
        return showErrorToast(response.data?.error?.msg);
      showSuccessToast(response.data?.data?.msg);
      dispatch(SetAuthNotFound());
      navigate("/login");
    } catch (err) {
      showErrorToast(
        err.response?.data?.error?.msg || response.data?.error?.msg
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      LogoutFunction();
    }, 3000);
  }, []);
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <DataLoader />
    </div>
  );
};

export default Logout;
