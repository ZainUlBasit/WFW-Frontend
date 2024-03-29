import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import { StyledShop, StyledWrapper } from "./BranchPurSaleCard.Styling";

const BranchPurSaleCard = ({ State }) => {
  return (
    <>
      <StyledWrapper>
        <div className="leftSide">
          <StyledShop>
            <StoreIcon className="LabelIcon" style={{ fontSize: "3.0em" }} />
            <div className="LabelShopNo">{State.branch}</div>
          </StyledShop>
        </div>
        <div className="rightSide">
          <div className="PurchaseSec">
            <div className="PurchaseTitle cardTitle">Total Purchases</div>
            <div className="PurchaseAmount shopSale">
              {State.totalPurchases}/-
            </div>
          </div>

          <div className="SaleSec">
            <div className="PurchaseTitle cardTitle">Total Sale</div>
            <div className="SaleAmount shopSale">{State.totalSale}/-</div>
          </div>
          <div className="SaleSec">
            <div className="PurchaseTitle cardTitle">Total Qty</div>
            <div className="SaleAmount shopSale">{State.totalQty}/-</div>
          </div>
          <div className="SaleSec">
            <div className="PurchaseTitle cardTitle">Total Expense</div>
            <div className="SaleAmount shopSale">{State.totalExpense}/-</div>
          </div>
          <div className="SaleSec">
            <div className="PurchaseTitle cardTitle">Profit</div>
            <div className="SaleAmount shopSale">{State.totalProfit}/-</div>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

export default BranchPurSaleCard;
