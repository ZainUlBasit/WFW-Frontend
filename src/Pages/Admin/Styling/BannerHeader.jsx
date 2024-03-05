import styled from "styled-components";

export const BannerHeader = styled.h1.attrs({
  className:
    "relative bg-[#5A4AE3] py-[20px] text-xl flex items-center rounded-t-lg pl-10 text-white justify-center font-[raleway] font-[700] text-[1.4rem] select-none",
})`
  & {
    font-size: ${(props) => (props.fontSize ? props.fontSize : "1.4rem")};
    padding: ${(props) => (props.padding ? props.padding : "8px 0px")};
  }
`;