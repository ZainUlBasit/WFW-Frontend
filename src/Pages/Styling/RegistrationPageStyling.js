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

export const MainWrapper = styled.div`
  /* height: 100vh; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0%;
  padding: 0%;
  position: relative;
  offset: 15px;
  background-color: aliceblue;
  /* padding: 10px 0px; */
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  @media screen and (max-width: 600px) {
    padding: 40px 0px;
  }
`;

export const FormWrapper = styled.div`
  z-index: 1;
  min-width: 450px;
  min-height: 620px;
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
    width: 210%;
    height: 45%;
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
`;

export const FormFinal = styled.div`
  position: absolute;
  margin: 0px;
  padding: 0px;
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
  padding-bottom: 0px;
  .FormHead {
    /* mt-[-30px] p-[0px] w-[100%] font-[Roboto] text-3xl font-bold text-[#5A4AE3] flex flex-col justify-center items-center */
    margin-top: 0px;
    padding: 0px;
    width: 100%;
    font-family: Roboto;
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
    font-weight: bold;
    color: #5a4ae3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      margin-top: 10px;
      width: 150px;
    }
    p {
      margin-top: 10px;
    }
  }
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
  .signUpLink {
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
  }
  .forgotLink {
    margin: 0% !important;
    padding: 0% !important;
    color: #5a4ae3;
    font-weight: bold;
    margin-top: 4px !important;
    font-size: 1.5ch !important;
    margin-bottom: 4px !important;
  }
  .fontSizeE {
    font-size: 1.9ch !important;
  }
`;

export const StyledForm = styled.form`
  min-height: 450px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0;
  /* margin-top: 10px; */
  .FooterForm {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 58%;
    padding-top: 10px;
    height: 1.75rem /* 28px */;
    margin-left: 2rem;
    margin-bottom: 0px;
    .FooterText {
      width: 600px;
      text-align: right;
    }
    .signUpLink {
      display: flex;
      justify-content: flex-start;
    }
  }
`;

export const InputWrapper = styled.div`
  margin: 0;
  padding: 0;
  height: 40px;
  width: 310px;
  display: flex;
  background-color: #5a4ae3;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 2px solid #5a4ae3;
  position: relative;
  input {
    width: 87%;
    outline: none;
    padding: 8px 0px;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    color: #5a4ae3;
    border: none;
    padding-left: 8px;
    &::placeholder {
      color: #5a4ae3c2;
    }
    .fileInput {
      background-color: white !important;
      padding: 4px 0px !important;
      margin: 0px !important;
    }
  }
  input[type="file"] {
    width: 87%;
    outline: none;
    padding: 4px 0px;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    color: #5a4ae3 !important;
    border: none;
    padding-left: 8px;
    &::placeholder {
      color: #5a4ae3c2;
    }
    .fileInput {
      background-color: white !important;
      padding: 4px 0px !important;
      margin: 0px !important;
    }
  }
  .dropDownList {
    /* background-color: #5A4AE3 !important; */
    color: #5a4ae3 !important;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    width: 100%;
    border-radius: 0px 5px 5px 0px;
    outline: none !important;
    border: none !important;
    &:hover {
      background-color: white;
      color: #5a4ae3;
    }
  }
  .inputIcon {
    width: 13%;
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
  width: 310px;
  background-color: #5a4ae3;
  border: 2px solid #5a4ae3;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 2.3ch;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  margin-top: 10px;
  &:hover {
    background-color: #4335bb;
  }
`;
