import styled from "styled-components";

const ButtonComp = styled.button`
  user-select: none;
  border: 2px solid #5a4ae3;
  font-size: 13px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* border-radius: 10px; */
  transition: all 1000ms ease-in-out;
  margin: 0px 10px 10px 10px;
  font-weight: bold;
  width: ${(props) => (props.width ? props.width : "150px")};
  color: #5a4ae3 !important;
  display: flex;
  justify-content: center;
  cursor: pointer;
  .BtnLink {
    padding: 8px 15px;
    text-decoration: none !important;
    display: flex !important;
    align-items: center !important;
    color: #5a4ae3 !important;
    height: 100% !important;
    width: 100% !important;
  }
  .btnModal {
    padding: 8px 15px;
    text-decoration: none !important;
    display: flex !important;
    align-items: center !important;
    color: #5a4ae3 !important;
    height: 100% !important;
    width: 100% !important;
  }
  .BtnIcon {
    width: 1.8ch;
    margin-right: 5px;
  }
  &:hover {
    background-color: #5a4ae3 !important;
    color: white !important;
    border-radius: 10px;
    .btnModal {
      color: white !important;
    }
    .BtnLink {
      color: white !important;
    }
  }
  @media screen and (max-width: 466px) {
    width: auto !important;
    border-radius: 10px;
  }
`;

export default ButtonComp;
