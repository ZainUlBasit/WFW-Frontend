import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
// import LockIcon from "@mui/icons-material/Lock";
import Lock from "../../assets/images/lock.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      // Send a password reset email using Firebase Authentication
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (error) {
      alert("Error sending reset email:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[aliceblue]">
      <div className="w-[400px] max-w-[380px] border-[2px] border-[#5a4ae3] px-[10px] py-[30px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-[8px]">
        {resetEmailSent ? (
          <>
            <p>Check your email for a password reset link.</p>
            <Link to="/login" className="text-[#5a4ae3] font-[700] mt-[20px]">
              Go to Login!
            </Link>
          </>
        ) : (
          <div className="py-[10px] px-[10px] flex flex-col justify-center items-center">
            <div className=" flex justify-center items-center w-full">
              <img src={Lock} className="w-[100px] h-[100px]" />
            </div>
            <h2 className="text-[2rem] font-[700] font-[raleway]">
              Forgot Password?
            </h2>
            <p>You can reset your password here.</p>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
              className="border-[2px] border-[#5a4ae3] w-[300px] px-[10px] py-[8px] rounded-[8px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] mt-[20px] mb-[20px]"
            />
            <button
              onClick={handleResetPassword}
              className="bg-[#5a4ae3] text-white px-[10px] py-[8px]"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
