import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BranchCard from "../../Components/Cards/BranchCard";
import Navbar from "../../Components/NavBar/NavBar";
import RevenueChart from "../../Components/RevenueChart/RevenueCharts";
// import MyAvatar from "../../images/MyAvatar.jpg";
import { StyledSalesRevenue } from "./Styling/SalesRevenue";
import StoreIcon from "@mui/icons-material/Store";
import axios from "axios";
import DataLoader from "../../Components/Loader/DataLoader";
import ApexChart from "./ApexChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import customerTransactionsServices from "../../Services/customerTransactions.services";
import moment from "moment";
import { fetchCompanies } from "../../store/CompanySlice";
import { fetchCustomers } from "../../store/CustomerSlice";

// const URL = "http://localhost:9000/company";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  margin-top: 15px;
  flex-wrap: wrap;
  width: 100%;
  .chartRev {
    display: flex;
    @media screen and (max-width: 530px) {
      & {
        display: none;
      }
    }
  }
  .NewMem {
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 2px solid #5a4ae3;
    width: 320px;
    /* height: 350px; */
  }
  .memCard {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* padding: 5px 0px; */
    li {
      /* margin-top: 2px; */
      padding: 0px 0px 0px 5px;
      display: flex;
      align-items: center;
      border-top: 1px solid #5a4ae3;
      width: 100%;
    }
    .memPic {
      width: 15%;
      border-radius: 999px;
      overflow: hidden;
      margin: 5px 15px 5px 5px;
      border: 2px solid #5a4ae3;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .memInfo {
      width: 50%;
      display: flex;
      flex-direction: column;
      h1 {
        font-weight: 600;
        color: #5a4ae3;
      }
      p {
        padding-left: 4px;
        font-weight: 400;
        font-size: 0.8rem;
      }
    }
    .totalSale {
      width: 35%;
      height: 100%;
      background-color: black;
      border-left: 3px solid #5a4ae3;
      border-radius: 10px 0px 0px 10px;
      overflow: hidden;
      text-align: center;
      .title {
        background-color: #5a4ae3;
        color: white;
        font-weight: 600 !important;
        height: 50%;
        border-bottom: 1px solid #5a4ae3;
        /* border-color: #000; */
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .sales {
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        font-weight: bold;
      }
    }
  }
`;

const Home = () => {
  const [AllShopSale, setAllShopSale] = useState([]);
  const [Shops, setShops] = useState([]);
  const [TotalRec, setTotalRec] = useState(0);
  const [TotalPay, setTotalPay] = useState(0);

  // loading
  const [Loading, setLoading] = useState(false);

  
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);

  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  return (
    <>
      <Navbar />
      {Loading ? (
        <div className="flex justify-center items-center h-[90vh] w-[100vw]">
          {" "}
          <DataLoader />
        </div>
      ) : (
        <div
          className={
            isActive_
              ? "ml-[120px] pt-[calc(10vh+15px)] bg-[white] inline-flex flex-col w-[calc(100%-120px)] transition-all px-5 font-[raleway]"
              : "pt-[calc(10vh+15px)] inline-flex flex-col w-full transition-all px-5 bg-[white] font-[raleway]"
          }
        >
          {/* Cards */}
          <div className="flex flex-wrap w-[100%] justify-between items-center">
            {Shops.map((shop, i) => {
              return (
                <BranchCard
                  title={shop}
                  ShopNo={Number(i) + 1}
                  sale={AllShopSale[i]}
                />
              );
            })}
          </div>
          {/* {console.log(Companies)}
        <ul>
          {console.log(Companies)}
        </ul> */}

          <ChartWrapper>
            <div className="chartRev">
              <ApexChart />
              {/* <RevenueChart width={900} height={500} /> */}
            </div>
            <div className="flex flex-col justify-start bg-[aliceblue] items-center h-[380px] w-[300px] border-[2px] border-[#5a4ae3] rounded-b-[10px]">
              <div className="flex flex-col w-full text-[1.2rem] font-bold font-[raleway] select-none mb-[20px]">
                <div className="bg-[#5a4ae3] text-white w-full px-[10px] py-[5px]">
                  Total Payable
                </div>
                <div className="pl-[15px] text-[#5a4ae3] text-[1.2rem]">
                  {TotalPay}/-
                </div>
              </div>
              <div className="flex flex-col w-full text-[1.2rem] font-bold font-[raleway] select-none">
                <div className="bg-[#5a4ae3] text-white w-full px-[10px] py-[5px]">
                  Total Recievable
                </div>
                <div className="pl-[15px] text-[#5a4ae3] text-[1.2rem]">
                  {TotalRec}/-
                </div>
              </div>
            </div>
          </ChartWrapper>
        </div>
      )}
    </>
  );
};

export default Home;
