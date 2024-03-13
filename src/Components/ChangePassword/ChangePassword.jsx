import React from "react";
import Navbar from "../NavBar/NavBar";

const ChangePassword = () => {
  return (
    <>
      <Navbar />
      <div className="pt-[calc(10vh+10px)] flex flex-col justify-center items-center w-full">
        <div className="Inner bg-yellow-500 w-[400px]">
          <h1>Change Password</h1>
          <div className="body flex flex-col">
            {/* Old Password */}
            <input type="password" placeholder="Current Password..." />
            {/* New Password */}
            <input type="password" placeholder="New Password..." />
            {/* Confirm Password */}
            <input type="password" placeholder="Confirm Password..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
