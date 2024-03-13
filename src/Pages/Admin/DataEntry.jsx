import React, { useEffect } from "react";
import { AddNewCompany, StaticSignup } from "../../https";

const DataEntry = () => {
  const Data = [
    {
      name: "Nasir Khursheed Packages",
      email: "nasir_khursheed_packages@wfw.com",
      description: "Fruits Carton Company",
      address: "Lahore Shekhpura",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03219555550",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "Imtiaz Packages Swat",
      email: "imtiaz_packages_swat@wfw.com",
      description: "Fruits Carton Company",
      address: "Swat",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "0946722937",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "Arshad Packages Lahore",
      email: "arshad_packages_lahore@wfw.com",
      description: "Fruits Carton Company",
      address: "Lahore",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03004607762",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "Nobel Packaging",
      email: "nobel_packaging@wfw.com",
      description: "Fruits Carton Company",
      address: "Chakwal Mandra",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03004110250",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "Zahid Packages",
      email: "zahid_packages@wfw.com",
      description: "Fruits Carton Company",
      address: "Bhalwal",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03004109880",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "Buraq Packages",
      email: "buraq_packages@wfw.com",
      description: "Fruits Caton Company",
      address: "Lahore Shekhpura",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03217499453",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "Gold Packages",
      email: "gold_packages@wfw.com",
      description: "Carton Company",
      address: "Lahore",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03215959539",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "IRSHAD SONS",
      email: "irshad_sons@wfw.com",
      description: "MIX",
      address: "charbagh",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03459693409",
      paid: 0,
      remaining: 0,
      total: 0,
    },
    {
      name: "Zia BPL and Zahid",
      email: "zia_bpl_and_zahid@wfw.com",
      description: "MIX",
      address: "Manglaver",
      cnic: 1910280000000,
      shop: "Shop 1",
      contact: "03459523262",
      paid: 0,
      remaining: 0,
      total: 0,
    },
  ];

  const UploadData = async () => {
    Data.filter(async (dt) => {
      try {
        await AddNewCompany(dt);
      } catch (err) {
        console.log("Error Occured: ", err);
      }
    });
  };
  return (
    <button className="bg-[#5a4ae3] text-white" onClick={() => UploadData()}>
      Upload
    </button>
  );
};

export default DataEntry;
