import styled from "styled-components";

const BannerWrapper = styled.h1`
  /* <div className="w-[80%] border-[2px] rounded-[10px] border-[white] px-[10px]  bg-[#5A4AE3] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] py-[5px]"> */
  width: ${(props) => props.width ? props.width : "100%" };
  border: 2px solid white;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #5A4AE3;
  box-shadow: 0 35px 35px rgba(0,0,0,0.25);
`;

export default BannerWrapper;
