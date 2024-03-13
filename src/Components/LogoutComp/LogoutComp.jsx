import React from "react";
import Avatar from "../NavBar/images/Avatar.png";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutButtons from "../Buttons/LogoutButtons";

const LogoutComp = (props) => {
  return (
    <div className={props.className}>
      <div className="info flex items-center justify-center flex-col px-[20px] pt-[10px] bg-white pb-[10px]">
        <img
          src={Avatar}
          className="rounded-full mb-[5px]"
          width="100px"
          alt="not found"
        />
        <h1 className="font-[raleway] text-[22px] font-[700]">Zain Ul Basit</h1>
        <div className="contactNo font-[raleway] text-[17px] font-[500]">
          03110312452
        </div>
        <div className="shopNo font-[raleway] text-[17px] font-[500]">
          Shop 1
        </div>
      </div>
      <div className="buttons flex w-full justify-center items-center h-full">
        <LogoutButtons
          title={"Update Account"}
          onClick={() => null}
          icon={<AutoAwesomeIcon />}
          iconOri="left"
        />
        <LogoutButtons
          title={"Sign Out"}
          onClick={() => null}
          icon={<ExitToAppIcon />}
          iconOri="right"
        />
      </div>
    </div>
  );
};

export default LogoutComp;
