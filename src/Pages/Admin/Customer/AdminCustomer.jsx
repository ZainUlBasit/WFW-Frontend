import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import TableComp from "../../../Components/Tables/TableComponent";
import {
  CustomerRows as rows,
  CustomerColumns,
  AdminCustomerColumns,
} from "../../../DemoData/TempData";
import { fetchCustomers } from "../../../store/CustomerSlice";
import { CircularProgress } from "@mui/material";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import moment from "moment";

const ContactMask = "+{92}300-0000000";
const CnicMask = "00000-0000000-0";

const AdminCustomer = () => {

  const AllItems = [
    {
      id: 1,
      itemcode: "2KGN",
      itemname: "Mix FURIT 2 KG",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Mix Fruit 2kg Nasir",
      itemunit: "Box",
      itempurchase: 36,
      itemsale: 42,
      itemaddeddate: "5/15/2023",
      itemqty: 71006,
      itemshop: "Shop 1",
    },
    {
      id: 2,
      itemcode: "4KGN",
      itemname: "Mix Fruit 4KG Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Mix Fruit 4kg Nasir",
      itemunit: "Box",
      itempurchase: 56,
      itemsale: 60,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 3,
      itemcode: "MFN",
      itemname: "Mix Fruit Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Mix Fruit Nasir",
      itemunit: "Box",
      itempurchase: 64,
      itemsale: 76,
      itemaddeddate: "5/15/2023",
      itemqty: 903,
      itemshop: "Shop 1",
    },
    {
      id: 4,
      itemcode: "2NS",
      itemname: "2 qat small nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Peach 2Layer Small Nasir",
      itemunit: "Box",
      itempurchase: 66,
      itemsale: 78,
      itemaddeddate: "5/15/2023",
      itemqty: 243,
      itemshop: "Shop 1",
    },
    {
      id: 5,
      itemcode: "2BN",
      itemname: "2 qat big nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Peach 2 Qat Big Nasir",
      itemunit: "Box",
      itempurchase: 71,
      itemsale: 82,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 6,
      itemcode: "1QN",
      itemname: "1 qat nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Single 1 Qat Nasir",
      itemunit: "Box",
      itempurchase: 77,
      itemsale: 90,
      itemaddeddate: "5/15/2023",
      itemqty: 3037,
      itemshop: "Shop 1",
    },
    {
      id: 7,
      itemcode: "3SN",
      itemname: "3 Qat RS small Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Peach RS small Nasir",
      itemunit: "Box",
      itempurchase: 68,
      itemsale: 80,
      itemaddeddate: "5/15/2023",
      itemqty: 82187,
      itemshop: "Shop 1",
    },
    {
      id: 8,
      itemcode: "3RS20N",
      itemname: "3 Qat RS20 Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Peach RS20 Nasir",
      itemunit: "Box",
      itempurchase: 70,
      itemsale: 82,
      itemaddeddate: "5/15/2023",
      itemqty: 71066,
      itemshop: "Shop 1",
    },
    {
      id: 9,
      itemcode: "3RSBN",
      itemname: "3 Qat RS Big Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Peach RS big Nasir",
      itemunit: "Box",
      itempurchase: 76,
      itemsale: 85,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 10,
      itemcode: "SQN",
      itemname: "Square Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Peach Square Nasir",
      itemunit: "Box",
      itempurchase: 86,
      itemsale: 100,
      itemaddeddate: "5/15/2023",
      itemqty: 11044,
      itemshop: "Shop 1",
    },
    {
      id: 11,
      itemcode: "SQBN",
      itemname: "Square Big Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Peach Square big Nasir",
      itemunit: "Box",
      itempurchase: 88,
      itemsale: 96,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 12,
      itemcode: "1SI",
      itemname: "1 QAT IMTAYZ SWAT",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "1 Qat Imtiaz",
      itemunit: "Box",
      itempurchase: 74,
      itemsale: 85,
      itemaddeddate: "5/15/2023",
      itemqty: 4000,
      itemshop: "Shop 1",
    },
    {
      id: 13,
      itemcode: "2BI",
      itemname: "2 Qat Big Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "2 Qat big Imtiaz",
      itemunit: "Box",
      itempurchase: 71,
      itemsale: 82,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 14,
      itemcode: "2SI",
      itemname: "2 Qat Small Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "2 Qat small Imtiaz",
      itemunit: "Box",
      itempurchase: 66,
      itemsale: 80,
      itemaddeddate: "5/15/2023",
      itemqty: 3690,
      itemshop: "Shop 1",
    },
    {
      id: 15,
      itemcode: "2KGI",
      itemname: "Mix Fruit 2KG Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "Mix Fruit 2kg Imtiaz",
      itemunit: "Box",
      itempurchase: 30,
      itemsale: 37,
      itemaddeddate: "5/15/2023",
      itemqty: 8186,
      itemshop: "Shop 1",
    },
    {
      id: 16,
      itemcode: "4KGI",
      itemname: "Mix Fruit 4 KG Imtyaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "Mix Fruit 4kg Imtiaz",
      itemunit: "Box",
      itempurchase: 38,
      itemsale: 50,
      itemaddeddate: "5/15/2023",
      itemqty: 17250,
      itemshop: "Shop 1",
    },
    {
      id: 17,
      itemcode: "3RS20I",
      itemname: "3 Qat RS20 Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "3 Qat RS20 Imtiaz",
      itemunit: "Box",
      itempurchase: 70,
      itemsale: 82,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 18,
      itemcode: "3RSBI",
      itemname: "3 Qat RS big Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "3 Qat RS big Imtiaz",
      itemunit: "Box",
      itempurchase: 76,
      itemsale: 85,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 19,
      itemcode: "3SI",
      itemname: "3 Qat RS small Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "3 Qat RS small Imtiaz",
      itemunit: "Box",
      itempurchase: 68,
      itemsale: 78,
      itemaddeddate: "5/15/2023",
      itemqty: 6550,
      itemshop: "Shop 1",
    },
    {
      id: 20,
      itemcode: "MFI",
      itemname: "Mix Fruit Imtiaz Swat",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "Mix Fruit Imtiaz",
      itemunit: "Box",
      itempurchase: 66,
      itemsale: 74,
      itemaddeddate: "5/15/2023",
      itemqty: 42100,
      itemshop: "Shop 1",
    },
    {
      id: 21,
      itemcode: "SQBI",
      itemname: "Square Big Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "Square Big Imtiaz",
      itemunit: "Box",
      itempurchase: 88,
      itemsale: 96,
      itemaddeddate: "5/15/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 22,
      itemcode: "SQI",
      itemname: "Square Imtiaz",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "Square Imtiaz",
      itemunit: "Box",
      itempurchase: 86,
      itemsale: 95,
      itemaddeddate: "5/15/2023",
      itemqty: 24879,
      itemshop: "Shop 1",
    },
    {
      id: 23,
      itemcode: "3QSNB",
      itemname: "3 Qat RS small Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "3 Qat RS small Nobel",
      itemunit: "Box",
      itempurchase: 69,
      itemsale: 78,
      itemaddeddate: "5/16/2023",
      itemqty: 5042,
      itemshop: "Shop 1",
    },
    {
      id: 24,
      itemcode: "3QMNB",
      itemname: "3 Qat RS Medium Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "3 Qat RS Medium Nobel",
      itemunit: "Box",
      itempurchase: 71,
      itemsale: 80,
      itemaddeddate: "5/16/2023",
      itemqty: 14427,
      itemshop: "Shop 1",
    },
    {
      id: 25,
      itemcode: "2QSNB",
      itemname: "2 Qat Shaheen  Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "2 Qat Shaheen Nobel",
      itemunit: "Box",
      itempurchase: 67,
      itemsale: 76,
      itemaddeddate: "5/16/2023",
      itemqty: 3170,
      itemshop: "Shop 1",
    },
    {
      id: 26,
      itemcode: "2QNB",
      itemname: "2 Qat Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "2 Qat Nobel",
      itemunit: "Box",
      itempurchase: 67,
      itemsale: 76,
      itemaddeddate: "5/16/2023",
      itemqty: 9020,
      itemshop: "Shop 1",
    },
    {
      id: 27,
      itemcode: "1QNB",
      itemname: "1 Qat Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "1 Qat Nobel",
      itemunit: "Box",
      itempurchase: 77,
      itemsale: 85,
      itemaddeddate: "5/16/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 28,
      itemcode: "SQNB",
      itemname: "Square Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "Square Nobel",
      itemunit: "Box",
      itempurchase: 86,
      itemsale: 95,
      itemaddeddate: "5/16/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 29,
      itemcode: "MX6KGNB",
      itemname: "Mix Fruit 6KG Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "Mix Fruit 6KG Nobel",
      itemunit: "Box",
      itempurchase: 64,
      itemsale: 72,
      itemaddeddate: "5/16/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 30,
      itemcode: "MX4KGNB",
      itemname: "Mix Fruit 4KG Nobel",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "Mix Fruit 4KG Nobel",
      itemunit: "Box",
      itempurchase: 55,
      itemsale: 65,
      itemaddeddate: "5/16/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 31,
      itemcode: "MX2KGG",
      itemname: "Mix Fruit 2KG Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "Mix Fruit 2KG Gold",
      itemunit: "Box",
      itempurchase: 36,
      itemsale: 40,
      itemaddeddate: "5/16/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 32,
      itemcode: "MX4KGG",
      itemname: "Mix Fruit 4KG Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "Mix Fruit 4KG Gold",
      itemunit: "Box",
      itempurchase: 54,
      itemsale: 60,
      itemaddeddate: "5/16/2023",
      itemqty: 0,
      itemshop: "Shop 1",
    },
    {
      id: 33,
      itemcode: "MFG",
      itemname: "Mix Fruit Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "Mix Fruit 5KG Gold",
      itemunit: "Box",
      itempurchase: 64,
      itemsale: 74,
      itemaddeddate: "5/16/2023",
      itemqty: 72730,
      itemshop: "Shop 1",
    },
    {
      id: 34,
      itemcode: "2QG",
      itemname: "2 Qat Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "2 Qat Gold",
      itemunit: "Box",
      itempurchase: 65,
      itemsale: 76,
      itemaddeddate: "5/16/2023",
      itemqty: 21975,
      itemshop: "Shop 1",
    },
    {
      id: 35,
      itemcode: "3QG",
      itemname: "3 Qat Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "3 Qat Gold",
      itemunit: "Box",
      itempurchase: 68,
      itemsale: 78,
      itemaddeddate: "5/16/2023",
      itemqty: 59550,
      itemshop: "Shop 1",
    },
    {
      id: 36,
      itemcode: "1QG",
      itemname: "1 Qat Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "1 Qat Gold",
      itemunit: "Box",
      itempurchase: 71,
      itemsale: 85,
      itemaddeddate: "5/16/2023",
      itemqty: 1100,
      itemshop: "Shop 1",
    },
    {
      id: 37,
      itemcode: "SQG",
      itemname: "Square Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "Square Gold",
      itemunit: "Box",
      itempurchase: 82,
      itemsale: 95,
      itemaddeddate: "5/16/2023",
      itemqty: 371,
      itemshop: "Shop 1",
    },
    {
      id: 38,
      itemcode: "2FM",
      itemname: "2 qat FM",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "2 qat FM",
      itemunit: "Box",
      itempurchase: 58,
      itemsale: 66,
      itemaddeddate: "5/23/2023",
      itemqty: 1,
      itemshop: "Shop 1",
    },
    {
      id: 39,
      itemcode: "3FM",
      itemname: "3 QAT FM",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "3 qat FM",
      itemunit: "Box",
      itempurchase: 60,
      itemsale: 68,
      itemaddeddate: "5/23/2023",
      itemqty: 4,
      itemshop: "Shop 1",
    },
    {
      id: 40,
      itemcode: "2IS",
      itemname: "2 QAT IMTYAZ SWAT",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "2 qat swat quality imtiaz",
      itemunit: "Box",
      itempurchase: 66,
      itemsale: 74,
      itemaddeddate: "5/23/2023",
      itemqty: 86540,
      itemshop: "Shop 1",
    },
    {
      id: 41,
      itemcode: "3IS",
      itemname: "3 QAT IMTAYZ SWAT QUALITY",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "3 qat swat quality imtiaz",
      itemunit: "Box",
      itempurchase: 68,
      itemsale: 78,
      itemaddeddate: "5/23/2023",
      itemqty: 317176,
      itemshop: "Shop 1",
    },
    {
      id: 42,
      itemcode: "2SN",
      itemname: "2 qat small M Nasir",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "2 qat smal M Nasir",
      itemunit: "Box",
      itempurchase: 64,
      itemsale: 78,
      itemaddeddate: "5/24/2023",
      itemqty: 66151,
      itemshop: "Shop 1",
    },
    {
      id: 43,
      itemcode: "2NP",
      itemname: "2 qat nasir pws",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "2 qat pws nasir",
      itemunit: "Piece",
      itempurchase: 63,
      itemsale: 78,
      itemaddeddate: "5/24/2023",
      itemqty: 8320,
      itemshop: "Shop 1",
    },
    {
      id: 44,
      itemcode: "3NP",
      itemname: "3 qat nasir pws",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "3 qat nasir pws",
      itemunit: "Box",
      itempurchase: 66,
      itemsale: 78,
      itemaddeddate: "5/24/2023",
      itemqty: 36970,
      itemshop: "Shop 1",
    },
    {
      id: 45,
      itemcode: "4KGA",
      itemname: "4 KG ARSHID",
      itemcompany: "Arshad Packages Lahore",
      itemcategory: "carton",
      itemsubcategory: "Loquat gold",
      itemunit: "Box",
      itempurchase: 35,
      itemsale: 50,
      itemaddeddate: "5/24/2023",
      itemqty: 8066,
      itemshop: "Shop 1",
    },
    {
      id: 46,
      itemcode: "LG",
      itemname: "Loquat Gold",
      itemcompany: "Gold Packages",
      itemcategory: "carton",
      itemsubcategory: "Loquat gold",
      itemunit: "Box",
      itempurchase: 64,
      itemsale: 70,
      itemaddeddate: "5/24/2023",
      itemqty: 13640,
      itemshop: "Shop 1",
    },
    {
      id: 47,
      itemcode: "3NBP",
      itemname: "3 qat nobil pws",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "3 qat Nobil pws",
      itemunit: "Box",
      itempurchase: 60,
      itemsale: 70,
      itemaddeddate: "5/24/2023",
      itemqty: 4570,
      itemshop: "Shop 1",
    },
    {
      id: 48,
      itemcode: "1NBP",
      itemname: "1 qat nobil pws",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "1 qat Nobil pws",
      itemunit: "Box",
      itempurchase: 65,
      itemsale: 80,
      itemaddeddate: "5/24/2023",
      itemqty: 4156,
      itemshop: "Shop 1",
    },
    {
      id: 49,
      itemcode: "LNB",
      itemname: "Loquat nobil pws",
      itemcompany: "Nobel Packaging",
      itemcategory: "carton",
      itemsubcategory: "Loquat  nobil pws",
      itemunit: "Box",
      itempurchase: 58,
      itemsale: 70,
      itemaddeddate: "5/24/2023",
      itemqty: 3150,
      itemshop: "Shop 1",
    },
    {
      id: 50,
      itemcode: "SH",
      itemname: "SHOPING",
      itemcompany: "IRSHAD SONS",
      itemcategory: "MIX",
      itemsubcategory: "SHOPING",
      itemunit: "No.",
      itempurchase: 1,
      itemsale: 1,
      itemaddeddate: "5/26/2023",
      itemqty: 800156760,
      itemshop: "Shop 1",
    },
    {
      id: 51,
      itemcode: "3QSBPL",
      itemname: "3 QAT SMALL BPL",
      itemcompany: "Zia BPL and Zahid",
      itemcategory: "carton",
      itemsubcategory: "3 QAT SMALL BPL",
      itemunit: "Box",
      itempurchase: 56,
      itemsale: 78,
      itemaddeddate: "5/26/2023",
      itemqty: 1590,
      itemshop: "Shop 1",
    },
    {
      id: 52,
      itemcode: "SQBPL",
      itemname: "SQUARE BPL",
      itemcompany: "Zia BPL and Zahid",
      itemcategory: "carton",
      itemsubcategory: "2 KG WF",
      itemunit: "Box",
      itempurchase: 70,
      itemsale: 95,
      itemaddeddate: "5/26/2023",
      itemqty: 3330,
      itemshop: "Shop 1",
    },
    {
      id: 53,
      itemcode: "2KGWF",
      itemname: "2 KG WF",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "2 KG WF",
      itemunit: "Box",
      itempurchase: 25,
      itemsale: 37,
      itemaddeddate: "5/27/2023",
      itemqty: 4003,
      itemshop: "Shop 1",
    },
    {
      id: 54,
      itemcode: "2KGA",
      itemname: "2 kg Arshad",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "2 kg Arshad",
      itemunit: "Box",
      itempurchase: 26,
      itemsale: 37,
      itemaddeddate: "6/2/2023",
      itemqty: 3051,
      itemshop: "Shop 1",
    },
    {
      id: 55,
      itemcode: "3QSI",
      itemname: "3 Qat Shama",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "3 Qat Shama",
      itemsubcategory: "carton",
      itemunit: "Box",
      itempurchase: 68,
      itemsale: 78,
      itemaddeddate: "6/3/2023",
      itemqty: 147,
      itemshop: "Shop 1",
    },
    {
      id: 56,
      itemcode: "3QB",
      itemname: "3 QAT BURAQ",
      itemcompany: "Buraq Packages",
      itemcategory: "carton",
      itemsubcategory: "3 qat Buraq",
      itemunit: "Box",
      itempurchase: 68,
      itemsale: 78,
      itemaddeddate: "6/5/2023",
      itemqty: 5635,
      itemshop: "Shop 1",
    },
    {
      id: 57,
      itemcode: "PT",
      itemname: "Petai",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "Mix Fruit Petai",
      itemunit: "Box",
      itempurchase: 45,
      itemsale: 60,
      itemaddeddate: "6/6/2023",
      itemqty: 6880,
      itemshop: "Shop 1",
    },
    {
      id: 58,
      itemcode: "MFNS",
      itemname: "Mix Fruit New Small",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Mix Fruit New Small",
      itemunit: "Box",
      itempurchase: 60,
      itemsale: 76,
      itemaddeddate: "6/8/2023",
      itemqty: 110381,
      itemshop: "Shop 1",
    },
    {
      id: 59,
      itemcode: "SNPWS",
      itemname: "Single Nasir PWS",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "Single Nasir PWS",
      itemunit: "Box",
      itempurchase: 74,
      itemsale: 95,
      itemaddeddate: "6/8/2023",
      itemqty: 4950,
      itemshop: "Shop 1",
    },
    {
      id: 60,
      itemcode: "3QBPL",
      itemname: "3 qat bpl",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "3 qat Bpl",
      itemunit: "Box",
      itempurchase: 56,
      itemsale: 78,
      itemaddeddate: "6/8/2023",
      itemqty: 1948,
      itemshop: "Shop 1",
    },
    {
      id: 61,
      itemcode: "3QM",
      itemname: "3 QAT MINI Pws",
      itemcompany: "Zia BPL and Zahid",
      itemcategory: "carton",
      itemsubcategory: "3 QAT MINI",
      itemunit: "Box",
      itempurchase: 64,
      itemsale: 78,
      itemaddeddate: "6/8/2023",
      itemqty: 48,
      itemshop: "Shop 1",
    },
    {
      id: 62,
      itemcode: "2FMF",
      itemname: "2 QAT FMF",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "2 Qat FM F",
      itemunit: "Box",
      itempurchase: 58,
      itemsale: 66,
      itemaddeddate: "6/8/2023",
      itemqty: 2420,
      itemshop: "Shop 1",
    },
    {
      id: 63,
      itemcode: "OL",
      itemname: "OLD Balance",
      itemcompany: "IRSHAD SONS",
      itemcategory: "Balance",
      itemsubcategory: "Old Balance",
      itemunit: "No.",
      itempurchase: 1,
      itemsale: 1,
      itemaddeddate: "6/11/2023",
      itemqty: 99997552201,
      itemshop: "Shop 1",
    },
    {
      id: 65,
      itemcode: "3FMF",
      itemname: "3 Qat FM Fix",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "3 qat fm fix",
      itemunit: "Box",
      itempurchase: 60,
      itemsale: 68,
      itemaddeddate: "6/13/2023",
      itemqty: 2919,
      itemshop: "Shop 1",
    },
    {
      id: 66,
      itemcode: "PTN",
      itemname: "mixfurit pati new",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "mixfurit pati new",
      itemunit: "Box",
      itempurchase: 50,
      itemsale: 65,
      itemaddeddate: "7/11/2023",
      itemqty: 6452,
      itemshop: "Shop 1",
    },
    {
      id: 67,
      itemcode: "2KGZ",
      itemname: "2KG ZAM ZAM",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "2KG ZAM ZAM",
      itemunit: "Box",
      itempurchase: 30,
      itemsale: 37,
      itemaddeddate: "7/29/2023",
      itemqty: 179,
      itemshop: "Shop 1",
    },
    {
      id: 68,
      itemcode: "3RSBKN",
      itemname: "3 qat rs big nasir karachi quality",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "3  Qat RS Big Karachi quality",
      itemunit: "Box",
      itempurchase: 78,
      itemsale: 85,
      itemaddeddate: "7/30/2023",
      itemqty: 4000,
      itemshop: "Shop 1",
    },
    {
      id: 69,
      itemcode: "ANI",
      itemname: "apple nelum",
      itemcompany: "Imtiaz Packages Swat",
      itemcategory: "Carton",
      itemsubcategory: "apple nelum",
      itemunit: "Box",
      itempurchase: 90,
      itemsale: 110,
      itemaddeddate: "7/31/2023",
      itemqty: 7530,
      itemshop: "Shop 1",
    },
    {
      id: 70,
      itemcode: "2NB",
      itemname: "2 qat nasir big",
      itemcompany: "IRSHAD SONS",
      itemcategory: "carton",
      itemsubcategory: "2 QAT NASIR BIG",
      itemunit: "Box",
      itempurchase: 71,
      itemsale: 80,
      itemaddeddate: "8/1/2023",
      itemqty: 4970,
      itemshop: "Shop 1",
    },
    {
      id: 71,
      itemcode: "TWFS",
      itemname: "TOMATO WF SPECIAL",
      itemcompany: "Nasir Khursheed Packages",
      itemcategory: "Carton",
      itemsubcategory: "TOMATO WF SPECIAL",
      itemunit: "Box",
      itempurchase: 45,
      itemsale: 50,
      itemaddeddate: "8/1/2023",
      itemqty: 16780,
      itemshop: "Shop 1",
    },
  ];

  const [selID, setSelID] = useState(-1);
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CompanySliceReducer.loading);
  const isError = useSelector((state) => state.CompanySliceReducer.isError);
  useEffect(() => {
    dispatch(fetchCustomers({ shop: data.userdata.fullName }));
  }, []);

  const [Loading, setLoading] = useState(false);

  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);

  // if(Loading) return <DataLoader />

  return (
    <>
      <NavBar />
      <CustomerNav />
      {loading || Loading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : customer ? (
        <div>
          <TableComp
            title={"CUSTOMERS INFO"}
            rows={customer}
            columns={
              data.userdata.name !== "Admin"
                ? CustomerColumns
                : AdminCustomerColumns
            }
            isActive_={isActive_}
            setSelID={setSelID}
          />
        </div>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default AdminCustomer;
