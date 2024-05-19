import styled, { keyframes } from "styled-components";
import "./fonts.css";

const RotationKeyframe = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const FormFooter = styled.div`
  /* <div className="flex-col justify-center items-center w-[300px] mb-[10px]"> */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin-bottom: 0px;
`;

export const MainWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0%;
  padding: 0%;
  position: relative;
  offset: 15px;
  background-color: aliceblue;
`;

export const FormWrapper = styled.div`
  z-index: 1;
  width: 410px;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  &::before {
    content: "";
    background-color: #5a4ae3;
    width: 200%;
    height: 60%;
    position: absolute;
    top: 100px;
    left: -200px;
    border-radius: 20px;
    animation: ${RotationKeyframe} 5s infinite linear;
  }

  &::after {
    content: "";
    background-color: white;
    width: calc(100%-10px);
    height: calc(100%-10px);
    position: absolute;
    top: 0px;
    left: 0px;
    inset: 5px;
    border-radius: 15px;
  }
  .ErrorOccur {
    height: 550px !important;
  }
  .ErrorNotOccur {
    height: 540px !important;
  }
`;

export const FormFinal = styled.div`
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  a {
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-size: 1.7ch;
    font-weight: 500;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
  }
  /* .signUpLink {
    margin: 0% !important;
    padding: 0% !important;
    display: flex !important;
    justify-content: flex-start;
    padding-left: 3px !important;
    height: 100% !important;
    color: #5a4ae3;
    font-weight: bold !important;
    font-family: "Roboto", sans-serif;
    font-size: 1.7ch;
  } */
  .forgotLink {
    margin: 0% !important;
    padding: 0% !important;
    color: #5a4ae3;
    font-weight: bold;
    margin-top: 8px !important;
    font-size: 0.9rem !important;
    margin-bottom: 4px !important;
  }
  .fontSizeE {
    font-size: 1.9ch !important;
  }
`;

export const FormHeader = styled.h1`
  position: relative;
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #5a4ae3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3.2ch;
  font-weight: bold;
  margin-bottom: 20px;
  .ErrorOccurHeader {
    display: block;
    font-size: 1.3rem;
    font-weight: 600;
    position: absolute;
    bottom: -9px;
    border-radius: 10px;
    color: rgb(248, 113, 113);
    width: 140%;
    padding: 5px 0px;
  }
  .ErrorNotOccurHeader {
    display: none;
    font-size: 1.3rem;
    font-weight: 600;
    position: absolute;
    bottom: -9px;
    border-radius: 10px;
    color: rgb(248, 113, 113);
    width: 140%;
    padding: 5px 0px;
  }
  img {
    width: 140px;
    margin-bottom: 8px;
  }
  .errorMsg {
  }
  p {
    margin: 0;
    margin-top: -5px;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 500;
  }

  .isRelative {
    height: 55% !important;
  }
  .isNotRelative {
    height: 50% !important;
  }
`;

export const StyledForm = styled.form`
  height: 43%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0;
  margin-top: 0px;
  .mainForRem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin-top: 13px;
    /* .rightSide {
      font-size: 14.8px;
      font-family: Roboto !important;
      color: #5a4ae3;
      font-weight: 700;
      display: flex;
      align-items: center;
      Link {
        font-size: 23px !;
      }
    } */
    .leftSide {
      font-size: 14.8px;
      font-family: Roboto !important;
      color: #5a4ae3;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      input[type="checkbox"] {
        margin-right: 4px;
        accent-color: #5a4ae3 !important;
      }
    }

    @media (max-width: 415px) {
      width: 80%;
    }
  }
`;

export const InputWrapper = styled.div`
  transition: all 2s ease-in-out;
  margin: 0;
  padding: 0;
  height: 45px;
  width: 320px;
  display: flex;
  background-color: #5a4ae3;
  overflow: hidden;
  border-radius: 5px;
  border: 2px solid #5a4ae3;
  position: relative;
  &:nth-child(1) {
    margin-bottom: 15px;
  }
  &:nth-child(2) {
    margin-bottom: -5px;
  }
  input {
    width: 85%;
    height: 100%;
    outline: none;
    /* padding: 8px 0px; */
    font-size: 17px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    color: #5a4ae3;
    border: none;
    padding-left: 6px;
    &::placeholder {
      color: #5a4ae3c2;
      font-size: 14px;
    }
    /* padding-right: 15px; */
  }
  .inputIcon {
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    overflow: hidden;
    background-color: #5a4ae3;
  }
  .eyeIcon {
    position: absolute;
    width: 11%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5a4ae3;
    background-color: transparent;
    overflow: hidden;
    cursor: pointer;
    top: 0px;
    right: 4px;
  }
`;

export const StyledButton = styled.button`
  margin: 0px;
  padding: 0px;
  height: 42px;
  width: 300px;
  display: flex;
  background-color: #5a4ae3;
  border: 2px solid #5a4ae3;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 1.8ch;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  margin-top: 20px;
  /* padding-left: 50px;
  padding-right: 50px; */

  &:hover {
    background-color: #4335bb;
  }
`;
