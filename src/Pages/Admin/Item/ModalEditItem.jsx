import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "./Styling/ItemInputStyling";
import { Rows } from "../../../DemoData/CompaniesInfo";
import { CrossButton, StyledButton } from "./Styling/StyleButton";
import { ItemUnitData } from "../../../Components/SelectColumns/ItemUnit";
import { fetchItems } from "../../../store/ItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../store/CompanySlice";
import { fetchCategories } from "../../../store/CategorySlice";
import { fetchSubCategories } from "../../../store/SubCategorySlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import companyServices from "../../../Services/company.services";
import categoryServices from "../../../Services/category.services";
import subcategoryServices from "../../../Services/subcategory.services";
import itemServices from "../../../Services/item.services";
import AddingLoader from "../../../Components/Loader/AddingLoader";
import { toast } from "react-toastify";

const ModalEditItem = ({ setOpen, open, selItem }) => {
  const [ItemId, setItemId] = useState("");
  const [ItemCode, setItemCode] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemCompany, setItemCompany] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [ItemSubCategory, setItemSubCategory] = useState("");
  const [ItemUnit, setItemUnit] = useState("");
  const [ItemPurchase, setItemPurchase] = useState(0);
  const [ItemSale, setItemSale] = useState(0);
  const [ProccessLoading, setProccessLoading] = useState(false);
  const companies = useSelector((state) => state.CompanySliceReducer.data);
  const CompanyLoader = useSelector(
    (state) => state.CompanySliceReducer.loader
  );
  const categories = useSelector((state) => state.CategorySliceReducer.data);
  const SubCategoryLoader = useSelector(
    (state) => state.SubCategorySliceReducer.loading
  );
  const SubCategoryError = useSelector(
    (state) => state.SubCategorySliceReducer.isError
  );
  const subcategories = useSelector(
    (state) => state.SubCategorySliceReducer.data
  );

  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    border: "3px solid #5A4AE3",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const setData = () => {
    console.log(selItem);
    selItem.map((item) => {
      setItemId(item.itemid);
      setItemCode(item.itemcode);
      setItemName(item.itemname);
      setItemCompany(item.itemcompany);
      setItemCategory(item.itemcategory);
      setItemSubCategory(item.itemsubcategory);
      setItemUnit(item.itemunit);
      setItemPurchase(item.itempurchase);
      setItemSale(item.itemsale);
      return "";
    });
  };

  const onUpdate = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const itemInfo = {
      itemcode: ItemCode,
      itemname: ItemName,
      itemcompany: ItemCompany,
      itemcategory: ItemCategory,
      itemsubcategory: ItemSubCategory,
      itemunit: ItemUnit,
      itempurchase: ItemPurchase,
      itemsale: ItemSale,
    };
    if (
      !(ItemCode === "") &&
      !(ItemName === "") &&
      !(ItemCompany === "") &&
      !(ItemCategory === "") &&
      !(ItemSubCategory === "") &&
      !(ItemUnit === "") &&
      !(ItemPurchase === 0) &&
      !(ItemSale === 0)
    ) {
      await itemServices.updateItem(ItemId, itemInfo);
      setOpen(false);
      dispatch(fetchItems());
      toast.success("Item Successfully updated...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn("All Fields are Mandatory...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setProccessLoading(false);
  };
  const onDelete = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    if (ItemId !== "") {
      try {
        await itemServices.deleteItem(ItemId);
        setOpen(false);
        toast.success("Item Successfully deleted...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(fetchItems());
      } catch (err) {
        toast.error("Unable to Delete item...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.warn("All Fields are Mandatory...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setProccessLoading(false);
  };

  const [Companies, setCompanies] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    const getComp = async () => {
      setLoading(true);
      let response = await companyServices.getCompanies();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setCompanies(response);
    };
    const getCat = async () => {
      setLoading(true);
      let response = await categoryServices.getCategories();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setCategories(response);
    };
    const getSubCat = async () => {
      setLoading(true);
      let response = await subcategoryServices.getSubCategories();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setSubCategories(response);
      setLoading(false);
    };
    getComp();
    getCat();
    getSubCat();
    setData();
  }, []);

  const handleChange = (e) => {
    let result = null;
    if (e.target.id === "itemCode") {
      result = e.target.value.toUpperCase();
      e.target.value = result;
    }
    // else if (e.target.id === "itemPurchase" || e.target.id === "itemSell") {
    //   result = e.target.value.replace(/\D/g, "");
    //   if (!e.target.value.includes(".")) {
    //     e.target.value = e.target.value + ".00";
    //   }
    //   if (e.target.value.includes(".")) {
    //     let temp = e.target.value.split(".");
    //     if (temp[1].lenght > 2) {
    //       temp[1] = "00";
    //     }
    //     e.target.value = temp[0] + "." + temp[1];
    //   }
    // }
    // switch (e.target.id) {
    //   case "itemCode":
    //     SetFormData({ ...FormData, itemcode: e.target.value });
    //     break;
    //   case "itemName":
    //     SetFormData({ ...FormData, itemname: e.target.value });
    //     break;
    //   case "itemCompany":
    //     SetFormData({ ...FormData, itemcompany: e.target.value });
    //     break;
    //   case "itemCategory":
    //     SetFormData({ ...FormData, itemcategory: e.target.value });
    //     break;
    //   case "itemSubCategory":
    //     SetFormData({ ...FormData, itemsubcategory: e.target.value });
    //     break;
    //   case "itemUnit":
    //     SetFormData({ ...FormData, itemunit: e.target.value });
    //     break;
    //   case "itemPurchase":
    //     SetFormData({ ...FormData, purchase: e.target.value });
    //     break;
    //   case "itemSell":
    //     SetFormData({ ...FormData, sell: e.target.value });
    //     break;
    //   default:
    //     break;
    // }
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* {!CompanyLoader ? console.log(selItem) : null} */}
      {Loading ? (
        <DataLoader />
      ) : (
        <Box sx={style} className="flex-col justify-center items-center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: "bold",
              padding: "0px !important",
            }}
            className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
          >
            <AppRegistrationIcon
              className="mr-[5px] mb-[5px]"
              style={{ fontSize: "45px", position: "relative" }}
            />
            Edit Item
            <CrossButton setOpen={setOpen} />
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Form Portion */}
            <div className="flex-col justify-center items-center">
              <form className="flex flex-col items-center justify-center w-[100%]">
                {/* insert into select tag value="" disabled="" selected="" */}
                {/* Item Code */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <IntegrationInstructionsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemCode"
                      type="text"
                      name="itemCode"
                      placeholder="Item Code"
                      value={ItemCode}
                      onChange={(e) => {
                        handleChange(e);
                        return setItemCode(e.target.value);
                      }}
                    />
                  </div>
                </InputWrapper>
                {/* Item Name */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <DriveFileRenameOutlineIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemName"
                      type="text"
                      name="itemName"
                      placeholder="Item Name"
                      value={ItemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>
                </InputWrapper>
                {/* Select Company */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <AssuredWorkloadIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemCompany}
                      onChange={(e) => setItemCompany(e.target.value)}
                      id="itemCompany"
                    >
                      <option value="none" disabled="">
                        Select Company
                      </option>
                      {Companies.filter((comp) => {
                        if (uData.userdata.fullName === "Admin") return comp;
                        else return uData.userdata.fullName === comp.shop;
                      }).map((val, i) => {
                        return val.name === selItem.itemcompany ? (
                          <option value={val.name}>{val.name}</option>
                        ) : (
                          <option value={val.name} selected>
                            {val.name}
                          </option>
                        );
                      })}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Category */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <CategoryIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemCategory}
                      onChange={(e) => setItemCategory(e.target.value)}
                      id="itemCategory"
                    >
                      <option value="none">Select Category</option>
                      {Categories.filter((cat) => {
                        if (uData.userdata.fullName === "Admin") return cat;
                        else return uData.userdata.fullName === cat.shop;
                      }).map((category, i) => (
                        <option value={category.categoryname}>
                          {category.categoryname}
                        </option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Sub Category */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <SubdirectoryArrowRightIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemSubCategory}
                      onChange={(e) => setItemSubCategory(e.target.value)}
                    >
                      <option value="none">Select Sub Category</option>
                      {SubCategories.filter((cat) => {
                        if (uData.userdata.fullName === "Admin") return cat;
                        else return uData.userdata.fullName === cat.shop;
                      }).map((val, i) => {
                        if (val.subcategoryname === undefined) {
                          console.log("Error ", val.subcategoryname);
                        } else {
                          return (
                            <option key={i} value={val.subcategoryname}>
                              {val.subcategoryname}
                            </option>
                          );
                        }
                      })}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Unit */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <AdUnitsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemUnit}
                      onChange={(e) => setItemUnit(e.target.value)}
                      id="itemUnit"
                    >
                      <option value="none">Select Unit</option>
                      {ItemUnitData.map((val, i) => {
                        return false ? (
                          <option value={val.value} selected>
                            {val.value}
                          </option>
                        ) : (
                          <option value={val.value}>{val.value}</option>
                        );
                      })}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Purchase Rate */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <ShoppingCartIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemPurchase"
                      type="number"
                      name="itemPurchase"
                      value={ItemPurchase}
                      onChange={(e) => setItemPurchase(e.target.value)}
                      placeholder="Purchase Price"
                    />
                  </div>
                </InputWrapper>
                {/* Sale Rate */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <PaymentsIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemSell"
                      type="number"
                      name="itemSell"
                      value={ItemSale}
                      onChange={(e) => setItemSale(e.target.value)}
                      placeholder="Sell Price"
                    />
                  </div>
                </InputWrapper>
              </form>
              {ProccessLoading ? (
                <AddingLoader />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex w-[100%] m-[10px] mb-[5px] justify-between items-center">
                    <StyledButton primary update onClick={onUpdate}>
                      UPDATE
                    </StyledButton>
                    <StyledButton primary delete onClick={onDelete}>
                      DELETE
                    </StyledButton>
                  </div>
                </div>
              )}
            </div>
          </Typography>
        </Box>
      )}
    </Modal>
  );
};

export default ModalEditItem;
