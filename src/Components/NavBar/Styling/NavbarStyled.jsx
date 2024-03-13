import styled, { keyframes } from "styled-components";

const VisibleKeyframe = keyframes`
    from {
      transform: translateX(-120px);
    }
    to {
      transform: translateX(0px);
    }
`;

const InvisibleKeyframe = keyframes`
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-120px);
    }
`;

const InvisibleKeyframeMob = keyframes`
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-100%);
    }
`;

const NavbarStyled = styled.div`
  position: fixed;
  z-index: 10;
  .visible_ {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    margin-top: 10.3vh !important;
    height: 100vh;
    background-color: white;
    width: 120px;
    color: black;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    animation: ${VisibleKeyframe} 0.5s linear;
  }
  .invisible_ {
    transform: translateX(-120px);
    animation: ${InvisibleKeyframe} 0.8s linear;
    margin: 0;
    margin-top: 10.3vh !important;
    height: 100vh;
    background-color: white;
    width: 0px !important;
    color: black;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    @media screen and (max-width: 600px) {
      transform: translateX(-110vw);
      animation: ${InvisibleKeyframeMob} 0.5s linear;
    }
  }
  .topSide {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    width: 100%;
    background-color: #f0f8ff;
    position: fixed !important;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    .leftSide {
      font-size: 1.875rem /* 30px */;
      line-height: 2.25rem /* 36px */;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      img {
        margin-left: 20px;
        margin-top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .rightSide {
      height: 100% !important;
      /* margin-right: 10px; */
      font-size: 1.25rem;
      line-height: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center !important;
      width: 12ch;
      position: relative;
      .mainBox {
        border-radius: 9999px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        display: flex;
        img {
          border-radius: 50% 0px 0px 50%;
          margin-top: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .btnDown {
          border-radius: 0px 50% 50% 0px;
          background-color: white;
          padding: 0px 10px 0px 5px;
        }
      }
    }
  }
  .DropDownList {
    position: absolute;
    top: 100%;
    right: 0%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f8ff;
    border-radius: 0px 0px 0px 5px;
    color: #5a4ae3;
    border: 1px solid #5a4ae3;
    border-width: 1px 1px 1px 1px;
    /* border-color: #f0f8ff black black black; */
    /* @media screen and (max-width: 415px) and (min-height: 700px) {
      bottom: -107% !important;
    }
    @media screen and (max-width: 415px) and (max-height: 700px) {
      bottom: -150% !important;
    } */
    li {
      /* padding: 5px 10px; */
      /* padding-right: 25px; */
      width: 100%;
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 8px 15px;

      :nth-child(1) {
        /* padding-top: 5px; */
        /* background-color: orange; */
      }
      :nth-child(3) {
        padding-top: 5px;
        /* border-radius: 0px 0px 0px 5px; */
      }
      .LinkTextB {
        /* background-color: blue; */
        font-size: 1rem;
        font-weight: 700;
      }
      .LinkIcon {
        /* background-color: red; */
        /* margin-bottom: 8px; */

        margin-right: 5px !important;
      }
      :hover {
        background-color: white;
        /* color: #f0f8ff; */
      }
    }
    /* @media screen and (max-width: 360px) {
      bottom: -109px;
    }
    @media screen and (max-width: 414px) {
      bottom: -116px;
    }
    @media screen and (max-width: 375px) {
      bottom: -106px;
    } */
  }
`;

export default NavbarStyled;
