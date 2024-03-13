import styled from "styled-components";

export const TableWrapper = styled.div`
  /* Tailwind="flex justify-center flex-col"> */
  margin-top: 1px;
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // margin: 0px 120px;
  width: 100%;
  padding: ${(props) =>
    props.isAct ? "0px 20px 0px 140px" : "0px 20px 0px 20px"};
`;
