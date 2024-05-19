import React, { useState } from "react";
import { SelectWrapper } from "./SearchingComp.Styling";
import { Popover, Typography } from "@mui/material";
import AuthInputPopOver from "../Input/CustomPopover";

const InvoiceSearch = ({ DefOption, Options, setSelect, Select }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [SearchText, setSearchText] = useState("");
  return (
    <SelectWrapper>
      <AuthInputPopOver
        placeholder="Select Invoice..."
        required={true}
        Value={Select?.bill || "Select Invoice...!"}
        onClick={handleClick}
        Width={"w-[90%]"}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "25px",
            backgroundColor: "white",
            width: "60%",
            maxHeight: "50vh", // Set maximum height to 70vh
            // overflow: "hidden",
            overflowY: "auto", // Make it scrollable vertically
            boxShadow:
              "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(0, 0, 0, 0.08) 0px 1px 0px inset",
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
            borderColor: "#5a4ae3",
            backgroundColor: "#5a4ae3",
            width: "100%",
            overflow: "hidden",
            borderRadius: "25px",
          }}
        >
          <div className="bg-[#5a4ae3] text-white w-full font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
            <div className="w-full flex flex-col justify-between gap-y-3 items-start">
              <div className="flex w-full">
                <input
                  type="text"
                  className="w-full px-4 py-2 outline-none rounded-md placeholder:text-gray-500 text-black font-[Roboto] font-bold"
                  placeholder="Search...."
                  value={SearchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              {Options.map((Comp, i) => {
                return (
                  <div
                    className="flex gap-x-3 items-center cursor-pointer font-bold font-[Roboto] text-xl"
                    onClick={() => {
                      handleClose();
                      setSelect({
                        bill: Comp.invoice_no,
                        selected: true,
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={Comp.invoice_no === Number(Select?.bill)}
                    />
                    <span>{Comp.invoice_no}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Typography>
      </Popover>
      {/* <select
        className="SelectInner"
        onChange={(e) => {
          setSelect({ bill: e.target.value.toString(), selected: true });
        }}
        defaultValue={DefOption}
      >
        <option disabled defaultValue={DefOption} key="none">
          {DefOption}
        </option>
        {Options.map((Comp, i) => {
          return (
            <option key={i} value={Comp.invoice_no}>
              {Comp.invoice_no}
            </option>
          );
        })}
      </select> */}
    </SelectWrapper>
  );
};

export default InvoiceSearch;
