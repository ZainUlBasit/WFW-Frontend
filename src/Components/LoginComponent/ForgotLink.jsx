import React from "react";
import { Link } from "react-router-dom";

const ForgotLink = () => {
  return (
    <Link to="/forgot_password" className="text-[#5a4ae3] font-[700] mt-[10px]">
      Forgot Password?
    </Link>
  );
};

export default ForgotLink;
