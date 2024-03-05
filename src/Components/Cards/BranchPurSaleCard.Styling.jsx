import styled from "styled-components";

export const StyledWrapper = styled.div.attrs({
  className:
    "w-[300px] bg-[#5A4AE3] flex justify-center items-center text-white rounded-[15px] m-[10px]",
})`
  & {
    height: 25vh;
    @media screen and (max-width: 480px) {
      height: 20vh;
    }
  }
  .leftSide {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    height: 100%;
    font-weight: 500;
    font-size: 1.8rem;
    padding-left: 25px;
  }

  .rightSide {
    /* w-[50%] flex justify-end items-end flex-col pr-[50px] */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    width: 55%;
    padding-right: 35px;
    height: 90%;
  }

  /* .PurchaseTitle {
     font-[400] text-[1.2rem] text-[#f3f2efc0]
    font-weight: 400;
    font-size: 1.2rem;
    color: #f3f2efc0;
  } */
  .PurchaseTitle,
  .cardTitle {
    /* font-[400] text-[1.2rem] text-[#f3f2efc0] */
    font-weight: 400;
    font-size: 1.1rem;
    color: #f3f2efc0;
    text-align: left !important;
  }

  .shopSale {
    /* font-[700] text-[1.6rem] pl-[10px] */
    font-weight: 700;
    font-size: 1.4rem;
    padding-left: 10px;
    text-align: right;
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
