import styled from "styled-components";

export const NavComp = styled.div`
  /* Tailwind CSS======"ml-[120px] pt-[calc(10vh+15px)] bg-[#F3F2EF] inline-flex flex-col w-[calc(100%-120px)] transition-all px-5" */
  transition: all 0.7s ease-in-out;
  padding-top: calc(10vh + 15px);
  transition: all 0.5s ease-in-out;

  .NavWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 15px 0px;
  }
  .isActiveStyling {
    background-color: #f3f2ef;
    display: inline-flex;
    flex-direction: column;
    width: calc(100%-120px);
  }

  /* Tailwind CSS======"pt-[calc(10vh+15px)] inline-flex flex-col w-full transition-all px-5 bg-[#F3F2EF]" */
  .isNotActiveStyling {
    padding-top: calc(10vh + 15px);
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.5s ease-in-out;
    background-color: #f3f2ef;
  }

  @media screen and (max-width: 466px) {
    .btnText {
      display: none;
    }
  }

  ${(props) =>
    props.isAct
      ? `@media screen and (min-width: 466px) { margin-left: 120px; }`
      : null}
`;
