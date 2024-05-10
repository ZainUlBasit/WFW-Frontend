import React, { useEffect, useState } from "react";
import { Popover, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AuthInputPopOver from "../Input/CustomPopover";
import { BsSearch } from "react-icons/bs";

const CustomerPoperOver = ({
  Label,
  Placeholder,
  ValueId,
  setValueId,
  ValueName,
  setValueName,
  Values,
}) => {
  console.log(Values);
  const [anchorEl, setAnchorEl] = useState(null);
  const [SearchPopOver, setSearchPopOver] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();

  return (
    <>
      {/* <AuthInputPopOver
        label={Label}
        placeholder={Placeholder}
        Value={ValueName === "" ? Placeholder : ValueName}
        onClick={(data) => handleClick(data)}
      /> */}
      <AuthInputPopOver
        label={Label}
        placeholder={Placeholder}
        Value={ValueName}
        onClick={(data) => handleClick(data)}
        Width={"w-[300px]"}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "25px", // Add rounded corners
            backgroundColor: "white", // Set background color to white
            width: "300px", // Set the width as needed
            maxHeight: "50vh", // Set maximum height to 70vh
            overflowY: "auto", // Make it scrollable vertically
            // overflow: "hidden", // Hide overflowing content
            //   marginTop: "6px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          sx={{
            p: 2,
            borderColor: "#465462",
            backgroundColor: "#465462",
            width: "400px",
            overflow: "hidden",
            borderRadius: "25px",
          }}
        >
          <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
            <div className="w-full flex flex-col justify-between gap-y-3 items-start">
              <div className="flex border-[1px] w-[260px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden bg-white">
                <BsSearch className="text-black" />
                <input
                  className="outline-none w-full text-black"
                  placeholder="Search name"
                  value={SearchPopOver}
                  onChange={(e) => setSearchPopOver(e.target.value)}
                />
              </div>
              {Values?.filter((dt) => {
                const lowerCaseSearch = SearchPopOver.toLowerCase();
                const lowerCaseStation = dt.name.toLowerCase();
                if (SearchPopOver !== "") {
                  return lowerCaseStation.includes(lowerCaseSearch);
                } else {
                  return dt;
                }
              }).map((val) => {
                return (
                  <div
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => {
                      handleClose();
                      setValueId(val._id);
                      setValueName(val.name);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={ValueName === val.name}
                    />
                    <span>{val.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Typography>
      </Popover>
    </>
  );
};

export default CustomerPoperOver;
