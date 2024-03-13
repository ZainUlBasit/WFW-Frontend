import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import ShopInfo from "../../Components/ShopInfo/ShopInfo";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import AddNewShop from "../../Components/Modals/AddNewShop";
import DataLoader from "../../Components/Loader/DataLoader";
import LoadingError from "../../Components/Loader/LoadingError";
import { fetchBranches } from "../../store/BranchSlice";

const StyledIconWrapper = styled.div`
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  border: 2px solid white;
  overflow: hidden;
  .icon {
    margin: 8px;
  }
  cursor: pointer;
  :hover {
    /* color: #5a4ae3 !important; */
    /* background-color: white; */
  }
`;

const ShopsInfo = () => {
  const [AllShops, setAllShops] = useState([]);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [AddShopModal, setAddShopModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const Branches = useSelector((state) => state.branches);
  const dispatch = useDispatch()
  const FetchData = async () => {
    setLoading(true);
    let data = await getDocs(collection(db, "users"));
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    data = data.filter((dt) => dt.role === "shop");
    setAllShops(data);
    setLoading(false);
  };
  useEffect(() => {
    dispatch(fetchBranches())
    FetchData();
  }, []);
  return (
    <>
      <Navbar />
      {Branches.loading ? (
        <DataLoader />
      ) : (
        <div className="pt-[12vh] flex justify-center items-center">
          <div className="w-[80%] border-[#5a4ae3] border-[2px] rounded-[10px] overflow-hidden pb-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="py-[10px] px-[10px] flex justify-between items-center uppercase bg-[#5a4ae3] text-white font-[raleway] font-bold text-[1.3rem] mb-[10px]">
              <div>Branches</div>
              <StyledIconWrapper onClick={() => setAddShopModal(!AddShopModal)}>
                <AddBusinessIcon
                  className="icon"
                  style={{
                    color: "#fff",
                    fontSize: "3ch",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </StyledIconWrapper>
            </div>
            <div className="px-[10px]">
              {Branches && Branches.data.map((branch) => {
                return <ShopInfo shop={branch} RefreshData={FetchData} />;
              })}
              {AllShops.length === 0 ? (
                <div className="h-[60vh] w-full flex justify-center items-center">
                  <LoadingError />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
      {AddShopModal ? (
        <AddNewShop
          open={AddShopModal}
          setOpen={setAddShopModal}
          RefreshData={FetchData}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ShopsInfo;
