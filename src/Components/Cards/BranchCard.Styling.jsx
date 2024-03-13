import styled from "styled-components";

export const StyledWrapper = styled.div.attrs({
  className:
    "w-[350px] h-[25vh] bg-[#5A4AE3] flex justify-center items-center text-white rounded-[15px] mr-[10px] mb-[10px]",
})`
  .leftSide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    font-weight: 500;
    font-size: 1.8rem;
  }

  .rightSide {
    /* w-[50%] flex justify-end items-end flex-col pr-[50px] */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 50%;
    padding-right: 50px;
  }

  .cardTitle {
    /* font-[400] text-[1.2rem] text-[#f3f2efc0] */
    font-weight: 400;
    font-size: 1.2rem;
    color: #f3f2efc0;
  }

  .shopSale {
    /* font-[700] text-[1.6rem] pl-[10px] */
    font-weight: 700;
    font-size: 1.6rem;
    padding-left: 10px;
  }
`;

export const StyledShop = styled.div.attrs({
  className: "relative font-[raleway]",
})`
  .LabelIcon {
    font-size: 3em;
  }
  .LabelShopNo {
    /* flex justify-center items-start absolute top-1 right-0 text-[#5A4AE3] border-[3px] border-[#5A4AE3] bg-white px-[10px] py-[0px] rounded-full text-[1.4rem] */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    top: 0.25rem;
    right: 0px;
    color: #5a4ae3;
    border: 3px solid #5a4ae3;
    background-color: white;
    padding: 0px 10px;
    border-radius: 9999px;
    font-size: 1.4rem;
  }
`;
