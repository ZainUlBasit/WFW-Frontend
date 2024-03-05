import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import { StyledShop, StyledWrapper } from "./BranchPurSaleCard.Styling";

const BranchPurSaleCard = ({ SaleAmount, PurchaseAmount, ShopNo }) => {
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
          <div className="PurchaseSec">
            <div className="PurchaseTitle cardTitle">Total Purchases</div>
            <div className="PurchaseAmount shopSale">{PurchaseAmount}/-</div>
          </div>
          <div className="SaleSec">
            <div className="PurchaseTitle cardTitle">Total Sale</div>
            <div className="SaleAmount shopSale">{SaleAmount}/-</div>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

export default BranchPurSaleCard;
