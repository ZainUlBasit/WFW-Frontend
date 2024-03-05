import styled from "styled-components";

const InputWrapperStyling = styled.div`
  /* <div className="w-[100%] flex justify-center items-center"> */
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* className="h-full px-[8px] py-[8px] rounded-[5px] font-[raleway] placeholder:text-gray-600 outline-none text-[.9rem] font-[700] w-[95%]" */
  .dropdown {
    position: absolute;
    top: 100%;
    left: 2.5%;
    width: 95%;
    height: 0px;
    background-color: #dddbdb;
    z-index: 30;
  }
  
  & input:focus .dropdown{
    height: 100%;
  }

  & > input {
    width: 95%;
    height: 100%;
    font-size: 1.2rem;
    font-family: "raleway" !important;
    font-weight: 700;
    padding: 10px 8px;
    border-radius: 5px;
    outline: none;
    color: #5a4ae3;
    &::placeholder {
      font-weight: 400;
      color: #808080b1;
    }
  }
  @media (max-width: 466px) {
    & > input {
      font-size: 0.95rem;
    }
  }
`;

export default InputWrapperStyling;
