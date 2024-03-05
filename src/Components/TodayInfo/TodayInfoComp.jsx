import React from "react";
import styled from "styled-components";

const TodayInfoComp = ({ shop, title, payload, shopDetail }) => {
  const StylingComp = styled.div.attrs({
    className: shopDetail
      ? "bg-white text-[#5a4ae3] h-[18vh] w-[170px] flex flex-col justify-center px-[15px] m-[15px] rounded-[10px]"
      : "p-[10px] flex-col w-[240px] text-[#5a4ae3]",
  })`
    & {
      box-shadow: ${shopDetail ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "none"};
      border-width: ${!shopDetail ? "1px 1px 5px 1px" : "1px 1px 5px 1px"};
      border-color: ${!shopDetail ? "black black black black" : "#5a4ae3 #5a4ae3 #5a4ae3 #5a4ae3"};
      margin: ${!shopDetail ? "5px 10px" : ""};
      border-radius: ${!shopDetail ? "10px" : ""};
      overflow: ${!shopDetail ? "hidden" : ""};
      .Shop {
        width: 100%;
        text-align: ${shopDetail ? "center" : "left"};
        font-weight: 700;
        font-size: 2.1ch;
      }
      .Payload {
        width: 100%;
        text-align: ${shopDetail ? "center" : "left"};
        font-size: ${shopDetail ? "2.1ch" : "2.1ch"};
        font-weight: ${shopDetail ? "400" : "400"};
        padding-left: ${!shopDetail ? "5px" : "0px"};
        color: black;
        @media screen and (max-width: 551px) {
          text-align: ${!shopDetail ? "center" : "center"};
        }
      }
      .Title {
        font-weight: ${shopDetail ? "600" : "700"};
        font-size: ${shopDetail ? "2.1ch" : "2.1ch"};
        width: 100%;
        text-align: ${shopDetail ? "center" : "left"};
        @media screen and (max-width: 551px) {
          text-align: ${!shopDetail ? "center" : "left"};
        }
      }
    }
  `;
  return (
    <>
      <StylingComp>
        {shop ? <div className="Shop">{shop}</div> : null}
        <div className="Title">{title}</div>
        <div className="Payload">{payload}/-</div>
      </StylingComp>
    </>
  );
};

export default TodayInfoComp;
