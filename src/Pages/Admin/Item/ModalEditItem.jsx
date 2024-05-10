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
import { fetchTri } from "../../../store/TriGetSlice";
import { DeleteItem, UpdateItem } from "../../../Https";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/TaostMessages";

const ModalEditItem = ({ setOpen, open, state }) => {
  const [ItemId, setItemId] = useState("");
  const [ItemCode, setItemCode] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemCompanyId, setItemCompanyId] = useState("");
  const [ItemCategoryId, setItemCategoryId] = useState("");
  const [ItemSubCategoryId, setItemSubCategoryId] = useState("");
  const [ItemUnit, setItemUnit] = useState("");
  const [ItemPurchase, setItemPurchase] = useState(0);
  const [ItemSale, setItemSale] = useState(0);
  const [ItemSaleShop, setItemSaleShop] = useState("");
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
    bgcolor: "background.paper",
    border: "3px solid #5A4AE3",
    borderRadius: "10px",
    boxShadow: 24,
  };

  const setData = () => {
    setItemId(state._id);
    setItemCode(state.code);
    setItemName(state.name);
    setItemCompanyId(state.companyId._id);
    setItemCategoryId(state.categoryId._id);
    setItemSubCategoryId(state.subcategoryId._id);
    setItemUnit(state.unit);
    setItemPurchase(state.purchase);
    setItemSale(state.sale);
    setItemSaleShop(state?.sale_shop || 0);
  };

  const onUpdate = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const itemInfo = {
      code: ItemCode,
      name: ItemName,
      companyId: ItemCompanyId,
      categoryId: ItemCategoryId,
      subcategoryId: ItemSubCategoryId,
      unit: ItemUnit,
      purchase: ItemPurchase,
      sale: ItemSale,
    };
    const payload = {
      code: ItemCode,
      name: ItemName,
      companyId: ItemCompanyId,
      categoryId: ItemCategoryId,
      subcategoryId: ItemSubCategoryId,
      unit: ItemUnit,
      purchase: ItemPurchase,
      sale: ItemSale,
      sale_shop: ItemSaleShop,
    };
    if (
      !(ItemCode === "") &&
      !(ItemName === "") &&
      !(ItemCompanyId === "") &&
      !(ItemCategoryId === "") &&
      !(ItemSubCategoryId === "") &&
      !(ItemUnit === "") &&
      !(ItemPurchase === 0) &&
      !(ItemSale === 0) &&
      !(ItemSaleShop === 0)
    ) {
      try {
        const response = await UpdateItem({ itemId: ItemId, payload: payload });
        if (!response.data?.success) {
          showErrorToast(response.data?.error?.msg);
        } else {
          showSuccessToast(response.data?.data?.msg);
          dispatch(fetchItems(uData));
          setOpen(false);
        }
      } catch (err) {
        showErrorToast(err.response?.data?.error?.msg);
      }
    } else {
      showWarningToast("All Fields are Mandatory...");
    }
    setProccessLoading(false);
  };
  const onDelete = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    if (ItemId !== "") {
      try {
        const response = await DeleteItem(ItemId);
        if (!response.data?.success) {
          showErrorToast(response.data?.error?.msg);
        } else {
          showSuccessToast(response.data?.data?.msg);
          dispatch(fetchItems(uData));
          setOpen(false);
        }
      } catch (err) {
        showErrorToast(err.response?.data?.error?.msg);
      }
    } else {
      showWarningToast("ItemId Fields are Mandatory...");
    }
    setProccessLoading(false);
  };

  const [Companies, setCompanies] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const TriData = useSelector((state) => state.TriGet.data);

  useEffect(() => {
    dispatch(fetchTri(uData));
    setData();
  }, []);

  const handleChange = (e) => {
    let result = null;
    if (e.target.id === "itemCode") {
      result = e.target.value.toUpperCase();
      e.target.value = result;
    }
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
            className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3] py-5"
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
              <form className="flex flex-col items-center justify-center w-fit pb-10">
                {/* insert into select tag value="" disabled="" selected="" */}
                <div className="flex gap-x-10 items-center justify-center flex-wrap w-fit p-7">
                  <div>
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
                    {/* Shop Sale Rate */}
                    <InputWrapper>
                      <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                        <StyledLabel for="itemUnit">
                          <PaymentsIcon className="LabelIcon" />
                        </StyledLabel>
                        <StyledInput
                          id="itemSaleShop"
                          type="number"
                          name="itemSaleShop"
                          value={ItemSaleShop}
                          onChange={(e) => setItemSaleShop(e.target.value)}
                          placeholder="Item Shop Sale Rate"
                        />
                      </div>
                    </InputWrapper>
                  </div>
                  <div>
                    {/* Select Company */}
                    <InputWrapper>
                      <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                        <StyledLabel>
                          <AssuredWorkloadIcon className="LabelIcon" />
                        </StyledLabel>
                        <StyledSelect
                          value={ItemCompanyId}
                          onChange={(e) => setItemCompanyId(e.target.value)}
                          id="itemCompany"
                        >
                          <option value="none" disabled="">
                            Select Company
                          </option>
                          {TriData.company &&
                            TriData.company.map((val, i) => {
                              return val._id !== state.companyId._id ? (
                                <option value={val._id}>{val.name}</option>
                              ) : (
                                <option value={val._id} selected>
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
                          value={ItemCategoryId}
                          onChange={(e) => setItemCategoryId(e.target.value)}
                          id="itemCategory"
                        >
                          <option value="none">Select Category</option>
                          {TriData.category &&
                            TriData.category.map((val, i) =>
                              val._id !== state.categoryId._id ? (
                                <option value={val._id}>{val.name}</option>
                              ) : (
                                <option value={val._id} selected>
                                  {val.name}
                                </option>
                              )
                            )}
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
                          value={ItemSubCategoryId}
                          onChange={(e) => setItemSubCategoryId(e.target.value)}
                        >
                          <option value="none">Select Sub Category</option>
                          {TriData.subcategory &&
                            TriData.subcategory.map((val, i) =>
                              val._id !== state.subcategoryId._id ? (
                                <option value={val._id}>{val.name}</option>
                              ) : (
                                <option value={val._id} selected>
                                  {val.name}
                                </option>
                              )
                            )}
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
                  </div>
                </div>
                {ProccessLoading ? (
                  <AddingLoader />
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="flex w-fit gap-x-5 m-[10px] mb-[5px] justify-between items-center">
                      <StyledButton primary update onClick={onUpdate}>
                        UPDATE
                      </StyledButton>
                      <StyledButton primary delete onClick={onDelete}>
                        DELETE
                      </StyledButton>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </Typography>
        </Box>
      )}
    </Modal>
  );
};

export default ModalEditItem;
