import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import { StyledShop, StyledWrapper } from "./BranchCard.Styling";

const BranchCard = ({ title, ShopNo, sale }) => {
  return (
    <>
      <StyledWrapper>
        <div className="leftSide">
          <StyledShop>
            <StoreIcon className="LabelIcon" style={{ fontSize: "3.0em" }} />
            <div className="LabelShopNo">{ShopNo}</div>
          </StyledShop>
        </div>
        <div className="rightSide">
          <h1 className="cardTitle">Total Sale</h1>
          <p className="shopSale">{Number(sale)}/-</p>
        </div>
      </StyledWrapper>
    </>
  );
};

export default BranchCard;
