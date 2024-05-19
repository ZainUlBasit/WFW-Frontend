import { useState } from "react";
import styled from "styled-components";
import ReportBtns from "../../Components/Buttons/ReportBtns";
import DatePickerComp from "../../Components/Ledger/DatePickerComp";
import SelectComp from "../../Components/Select/SearchingComp";
import { Rows } from "../../DemoData/CompaniesInfo";
import InputWrapperStyling from "../Admin/Styling/InputWrapperStyling";
import { ItemDataTemp } from "./textData";
import AuthInputPopOver from "../../Components/Input/CustomPopover";
import { Popover, Typography } from "@mui/material";

export const ReportStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 100%;
  .InnerCont {
    width: 80%;
    background-color: #5a4ae3;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    border: 2px solid white;
    .TitleCont {
      color: white;
      font-family: Roboto;
      font-weight: 700;
      font-size: 2.3em;
      padding: 20px 0px 10px 0px;
      text-align: center;
      letter-spacing: 0.05ch;
      @media screen and (max-width: 466px) {
        letter-spacing: 0.1ch;
        font-size: 1.5em;
      }
    }
    .Line {
      width: 100%;
      height: 2px;
      background-color: white;
    }
    .ButtonCont {
      margin-bottom: 10px;
    }
  }
`;

const ReportWrapper = (props) => {
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
    <ReportStyled>
      <div className="InnerCont">
        <div className="TitleCont select-none">{props.title}</div>
        <div className="Line"></div>
        {props.Ledger || props.Invoice ? (
          <InputWrapperStyling>
            <AuthInputPopOver
              // label="Select Customer...!"
              placeholder={
                props.title === "CUSTOMER LEDGER"
                  ? "Select Customer..."
                  : "Select Company..."
              }
              required={true}
              Value={
                props.SelectCompany?._name
                  ? props.SelectCompany?._name
                  : props.title === "CUSTOMER LEDGER"
                  ? "Select Customer..."
                  : "Select Company..."
              }
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
                  borderRadius: "25px", // Add rounded corners
                  backgroundColor: "white", // Set background color to white
                  width: "60%", // Set the width as needed
                  maxHeight: "40vh",
                  overflow: "scroll", // Hide overflowing content
                  // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add box-shadow
                  boxShadow:
                    "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(0, 0, 0, 0.08) 0px 1px 0px inset",
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
                    {props.Options.filter((cust) => {
                      const searchTextLower = SearchText.toLowerCase();
                      const custLower = cust.name.toLowerCase();
                      return searchTextLower !== ""
                        ? custLower.includes(searchTextLower)
                        : true;
                    }).map((Comp, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer font-bold font-[Roboto] text-xl"
                          onClick={() => {
                            handleClose();
                            props.setSelectCompany({
                              name: Comp._id,
                              _name: Comp.name,
                              found: true,
                            });
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={Comp._id === props.SelectCompany.name}
                          />
                          <span>{Comp.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Typography>
            </Popover>
            {/* <SelectComp
              DefOption={props.DefOption}
              Options={props.Options}
              setSelect={props.setSelectCompany}
              SelectCompany={props.SelectCompany}
            /> */}
          </InputWrapperStyling>
        ) : null}
        {!props.Invoice ? (
          <div className="pr-[10px] pl-[10px] font-[Roboto] flex w-[100%] rounded-[10px] justify-between mt-[12px] mb-[28px] max500:flex-wrap md:flex-nowrap">
            <DatePickerComp
              title={"From Date"}
              value={props.fromDate}
              onChange={props.onChange}
            />
            <div className="w-[30%]"></div>
            <DatePickerComp
              title={"To Date"}
              value={props.toDate}
              onChange={props.onChange1}
            />
          </div>
        ) : null}
        <div className={props.Invoice ? "ButtonCont mt-[20px]" : "ButtonCont"}>
          {props.Ledger ? (
            <div className="flex justify-center items-center flex-wrap">
              <ReportBtns
                title={"SHOW CASH LEDGER"}
                HandLer={props.handleCash}
              />
              <ReportBtns
                title={"SHOW ITEM LEDGER"}
                HandLer={props.handleItem}
              />
            </div>
          ) : (
            <ReportBtns title={"Show Report"} HandLer={props.setShowReport} />
          )}
        </div>
      </div>
    </ReportStyled>
  );
};

export default ReportWrapper;
