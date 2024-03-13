import styled from "styled-components";

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  .SelectInner {
    outline: none;
    width: 95%;
    border-radius: 5px;
    padding: 8px 5px;
    font-size: ${(props) => (props.font_Size ? "1rem" : "1rem")};
    font-weight: 700;
    color: #5a4ae3;
    option {
      width: 50% !important;
      font-size: ${(props) => (props.font_Size ? "1rem" : "1rem")};
      font-weight: 600;
      @media screen and (max-width: 500px) {
        font-size: 10px !important;
      }
    }
  }
`;
