import styled from "styled-components";

export const SideMenuList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0px;
  padding: 0px;
  background-color: white;
  li {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    list-style-type: none;
    cursor: pointer;
    font-weight: bold;
    height: 14vh;
    .LiLink {
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      color: #5a4ae3 !important;
      width: 100% !important;
      height: 14vh !important;
      text-decoration: none !important;
      font-family: Roboto !important;
      font-size: 16px !important;
      font-weight: bold !important;
      :hover {
        background-color: #5a4ae3 !important;
        color: white !important;
      }
    }
  }
  @media screen and (max-width: 466px) {
    width: 100vw;
    height: 95vh;
  }
`;

export const MainMenuWrapper = styled.div``;
export const IconWrapper = styled.div`
  font-size: 25px;
  padding-top: 10px;
`;
export const TitleWrapper = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 16px;
  a {
    text-decoration: none;
    color: black;
    &:hover {
      background-color: #5a4ae3;
      color: white;
    }
  }
`;
