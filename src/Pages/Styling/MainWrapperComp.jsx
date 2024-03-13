import styled from "styled-components";

export const MainWrapperComp = styled.div`
  /* Tailwind CSS======"ml-[120px] pt-[calc(10vh+15px)] bg-[#F3F2EF] inline-flex flex-col w-[calc(100%-120px)] transition-all px-5" */
  transition: all 0.7s ease-in-out;
  padding-top: 15px;
  width: ${(props) =>
    !props.widthFull ? "100% !important" : "80% !important"};
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  margin-left: ${(props) => (props.marginL ? props.marginL : "0px")};
  background-color: white;
  .isActiveStyling {
    display: inline-flex;
    flex-direction: column;
    /* width: calc(100vw); */
    transition: all 0.5s ease-in-out;
  }

  /* Tailwind CSS======"pt-[calc(10vh+15px)] inline-flex flex-col w-full transition-all px-5 bg-[#F3F2EF]" */
  .isNotActiveStyling {
    /* padding-top: calc(10vh + 15px); */
    display: inline-flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    /* margin: 0px 20px !important; */
  }
`;
