import styled from "styled-components";

export const StyledTodayInfo = styled.div.attrs({
  className: "w-[100%] flex items-center justify-center mt-[15px]",
})``;

export const StyledTodayInfoInner = styled.div.attrs({
  className: "bg-white h-[90%] w-[80%] mobRes:w-[100%]",
})`
  & {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
    border-radius: 15px;
    border-width: 0px 0px 8px 0px;
    border-color: #5a4ae3 #5a4ae3 #5a4ae3 #5a4ae3;
    overflow: hidden;
    @media screen and (max-width: 460px) {
    }
  }
`;

export const StyledTodayInfoHeader = styled.div.attrs({
  className:
    "bg-[#5a4ae3] text-white w-[100%] h-[12vh] font-[raleway] font-[800] text-[1.3rem] flex items-center pl-[15px] border-b-[2px] border-b-[black] overflow-hidden",
})`
  & {
    @media screen and (max-width: 551px) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 0px;
      font-size: 1.5rem;
    }
  }
`;

export const StyledTodayInfoBody = styled.div.attrs({
  className:
    "bg-white text-black w-[100%] h-[calc(100%-12vh)] font-[raleway] flex flex-wrap py-[15px]",
})`
  & {
    .shopsinfo {
      justify-content: center !important;
      align-items: center !important;
      @media screen and (max-width: 551px) {
        width: 100%;
      }
    }
    .todayInfo {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 551px) {
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
