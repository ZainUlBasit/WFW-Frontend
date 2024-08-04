import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import { useDispatch, useSelector } from "react-redux";
import CustomerPoperOver from "../../../Components/Popover/CustomPopOver";
import { fetchCustomers } from "../../../store/CustomerSlice";
import TableComp from "../../../Components/Tables/TableComponent";
import ItemSummaryTable from "../../../Components/Tables/ItemSummaryTable";
import { Columns } from "../../../DemoData/ItemSummaryColumns";
import { ClearData, fetchItemSummary } from "../../../store/ItemSummarySlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AddNewBillReport from "../../../Components/Reports/AddNewBillReport";
import ItemSummaryReport from "../../../Components/Reports/ItemSummaryReport";
import moment from "moment";
import DataLoader from "../../../Components/Loader/DataLoader";
import { fetchCompanies } from "../../../store/CompanySlice";
import AdminCompanyNav from "../../../Components/NavBar/AdminNavbars/AdminCompanyNav";
import { fetchCompanyItemSummary } from "../../../store/CompanyItemSummarySlice";
import { CompanyColumns } from "../../../DemoData/ItemSummaryColumns";

const CompanyItemSummary = () => {
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState("");
  const [UserName, setUserName] = useState("");

  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const ItemSummaryData = useSelector((state) => state.CompanyItemSummaryState);

  let CompanyState = useSelector((state) => state.CompanySliceReducer);
  useEffect(() => {
    dispatch(fetchCompanies(uData));
  }, []);
  useEffect(() => {
    if (UserId !== "") dispatch(fetchCompanyItemSummary({ companyId: UserId }));
    else dispatch(ClearData());
  }, [UserId]);

  // const totalAmount = useMemo(() => {
  //   return ItemSummaryData.data.reduce((total, item) => {
  //     return total + item.price * item.qty;
  //   }, 0);
  // }, [ItemSummaryData.data]);

  // const totalPrice = useMemo(() => {
  //   return ItemSummaryData.data.reduce((total, item) => {
  //     return total + item.price;
  //   }, 0);
  // }, [ItemSummaryData.data]);

  const totalQty = useMemo(() => {
    return ItemSummaryData.data
      .filter((dt) => dt.code !== "SH")
      .reduce((total, item) => {
        return total + item.in_qty;
      }, 0);
  }, [ItemSummaryData.data]);

  return (
    <>
      <Navbar />
      <AdminCompanyNav setOpen={setOpen} />
      <div className="flex flex-col gap-y-4 py-4">
        <div className="flex w-full justify-center items-center">
          <div className="w-full flex justify-center items-center max-w-[400px]">
            <CustomerPoperOver
              Label={"Company"}
              placeholder={"Select Company..."}
              ValueId={UserId === ""}
              setValueId={setUserId}
              ValueName={UserName === "" ? "Select Company..." : UserName}
              setValueName={setUserName}
              Values={CompanyState?.data}
            />
          </div>
        </div>
        {ItemSummaryData.loading ? (
          <DataLoader />
        ) : (
          ItemSummaryData.data.length !== 0 &&
          ItemSummaryData.loading === false && (
            <>
              <div>
                <ItemSummaryTable
                  rows={ItemSummaryData.loading ? [{}] : ItemSummaryData.data}
                  columns={CompanyColumns}
                  isActive_={false}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex font-bold text-2xl">
                  Total Qty: {Number(totalQty).toLocaleString()}
                </div>

                <div className="flex font-bold text-2xl">
                  Total Amount:{" "}
                  {ItemSummaryData.data
                    .map((dt) => {
                      if (dt.code === "SH") {
                        return {
                          ...dt,
                          in_qty: 1,
                          qty: 1,
                        };
                      } else {
                        return { ...dt };
                      }
                    })
                    .reduce((total, Item) => {
                      return total + Number(Item.in_qty) * Number(Item.price);
                    }, 0)
                    .toLocaleString()}
                </div>
                <div className="flex font-bold text-2xl">
                  Paid:{" "}
                  {Number(
                    CompanyState.data.find((dt) => dt._id === UserId)?.paid
                  ).toLocaleString()}
                </div>
                <div className="flex font-bold text-2xl">
                  Remaining:{" "}
                  {(
                    ItemSummaryData.data
                      .map((dt) => {
                        if (dt.code === "SH") {
                          return {
                            ...dt,
                            in_qty: 1,
                            qty: 1,
                          };
                        } else {
                          return { ...dt };
                        }
                      })
                      .reduce((total, Item) => {
                        return total + Number(Item.in_qty) * Number(Item.price);
                      }, 0) -
                    Number(
                      CompanyState.data.find((dt) => dt._id === UserId)?.paid
                    )
                  ).toLocaleString()}
                </div>
              </div>
              {/* <div className="flex justify-center items-center">
                <PDFDownloadLink
                  document={
                    <ItemSummaryReport
                      Data={ItemSummaryData.data.map((dt) => {
                        if (dt.code === "SH") {
                          return {
                            ...dt,
                            qty: 1,
                          };
                        } else {
                          return { ...dt };
                        }
                      })}
                      date={moment(new Date()).format("DD/MM/YYYY")}
                      name={
                        CompanyState.data.find((dt) => dt._id === UserId)
                          ?.name || "-"
                      }
                      address={
                        CompanyState.data.find((dt) => dt._id === UserId)
                          ?.address || "not specified"
                      }
                      cRemaining={
                        ItemSummaryData.data
                          .map((dt) => {
                            if (dt.code === "SH") {
                              return {
                                ...dt,
                                qty: 1,
                              };
                            } else {
                              return { ...dt };
                            }
                          })
                          .reduce((total, Item) => {
                            return (
                              total + Number(Item.qty) * Number(Item.price)
                            );
                          }, 0) -
                          Number(
                            CompanyState.data.find((dt) => dt._id === UserId)
                              ?.paid
                          ) || "not specified"
                      }
                      cReturn={
                        CompanyState.data.find((dt) => dt._id === UserId)
                          ?.return_amount
                      }
                      cDiscount={
                        CompanyState.data.find((dt) => dt._id === UserId)
                          ?.discount
                      }
                      cPaid={
                        CompanyState.data.find((dt) => dt._id === UserId)?.paid
                      }
                      total={
                        ItemSummaryData.data &&
                        ItemSummaryData.data
                          .map((dt) => {
                            if (dt.code === "SH") {
                              return {
                                ...dt,
                                qty: 1,
                              };
                            } else {
                              return { ...dt };
                            }
                          })
                          .reduce((total, Item) => {
                            return (
                              total + Number(Item.qty) * Number(Item.price)
                            );
                          }, 0)
                      }
                      qty={totalQty}
                      price={totalPrice}
                    />
                  }
                  fileName={`${
                    CompanyState.data.find((dt) => dt._id === UserId)?.name ||
                    "CompanyItemSummary"
                  }`}
                >
                  <button className="text-white bg-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[Roboto] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:rounded-2xl hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem] text-3xl">
                    Download Summary
                  </button>
                </PDFDownloadLink>
              </div> */}
            </>
          )
        )}
      </div>
    </>
  );
};

export default CompanyItemSummary;
