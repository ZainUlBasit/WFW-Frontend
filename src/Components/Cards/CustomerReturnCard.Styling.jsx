import styled from "styled-components";

export const CustomerReturnCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: raleway;
  .Inner {
    width: 90%;
    background-color: #5a4ae3;
    border-radius: 10px 10px 0px 0px;
  }
  .title {
    /* text-center text-white border-b-[2px] border-b-white py-[10px] text-[2.5ch] font-[700] */
    text-align: center;
    color: white;
    border-bottom: 2px solid white;
    padding: 15px 0px 10px 0px;
    font-size: 2.5ch;
    font-weight: 700;
  }
  .BtnIcon {
    font-size: 3.5ch;
    color: white !important;
  }
  .InputTab {
    border-bottom: 2px solid white;
    padding-bottom: 10px;
  }
  .itemTab {
    .header {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .leftSideTitle {
        padding: 10px 0px;
        height: 100%;
        color: white;
        font-size: 2ch;
        font-weight: 600;
        padding-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .rightSideBtn {
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
