import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "./Styling/ItemInputStyling";
import { CrossButton, StyledButton } from "./Styling/StyleButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/CategorySlice";
import { fetchCompanies } from "../../../store/CompanySlice";
import { fetchItems } from "../../../store/ItemSlice";
import { fetchSubCategories } from "../../../store/SubCategorySlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import { toast } from "react-toastify";
import itemServices from "../../../Services/item.services";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import AddingLoader from "../../../Components/Loader/AddingLoader";
import companyServices from "../../../Services/company.services";
import categoryServices from "../../../Services/category.services";
import subcategoryServices from "../../../Services/subcategory.services";
import { CreateItem } from "../../../Https";
import { fetchTri } from "../../../store/TriGetSlice";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/TaostMessages";

const ModalAddNewItem = ({ setOpen, open }) => {
  // States
  // itemCode
  const [ItemCode, setItemCode] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemCompany, setItemCompany] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [ItemSubCategory, setItemSubCategory] = useState("");
  const [ItemUnit, setItemUnit] = useState("");
  const [ItemPurchase, setItemPurchase] = useState("");
  const [ItemSale, setItemSale] = useState("");
  // redux code
  // const companies = useSelector((state) => state.CompanySliceReducer.data);
  // const categories = useSelector((state) => state.CategorySliceReducer.data);
  // const loading = useSelector((state) => state.SubCategorySliceReducer.loading);
  const dispatch = useDispatch();

  const TriData = useSelector((state) => state.TriGet.data);

  // const [Companies, setCompanies] = useState([]);
  // const [SubCategories, setSubCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const Categories = useSelector((state) => state.CategorySliceReducer.data);
  const SubCategories = useSelector(
    (state) => state.SubCategorySliceReducer.data
  );
  const Companies = useSelector((state) => state.CompanySliceReducer.data);
  const [ProccessLoading, setProccessLoading] = useState(false);

  const [CompanyID, setCompanyID] = useState("");
  const [CategoryID, setCategoryID] = useState("");
  const [SubCategoryID, setSubCategoryID] = useState("");

  const [CompanyName, setCompanyName] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [SubCategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchTri(uData));
  }, []);

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

  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();

    const itemInfo = {
      code: ItemCode,
      name: ItemName,
      companyId: CompanyID,
      categoryId: CategoryID,
      subcategoryId: SubCategoryID,
      unit: ItemUnit,
      purchase: ItemPurchase,
      sale: ItemSale,
      qty: 0,
      branch: uData.branch_number,
    };
    if (
      !(ItemCode === "") ||
      !(ItemName === "") ||
      !(ItemCompany === "") ||
      !(ItemCategory === "") ||
      !(ItemSubCategory === "") ||
      !(ItemUnit === "") ||
      !(ItemPurchase === 0) ||
      !(ItemSale === 0)
    ) {
      try {
        const response = await CreateItem(itemInfo);
        if (!response.data?.success) showErrorToast(response.data?.error?.msg);
        else {
          showSuccessToast(response.data?.data?.msg);
          setOpen(false);
          dispatch(fetchItems(uData));
        }
      } catch (err) {
        showErrorToast(err.response?.data?.error?.msg || err.message);
      }
    } else {
      showWarningToast("All Fields are Mandatory...");
    }
    setProccessLoading(false);
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {!TriData.loading ? (
        <Box sx={style} className="flex-col justify-center items-center w-fit">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
            className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3] py-5"
          >
            <PostAddIcon
              className="mr-[5px] mb-[5px]"
              style={{ fontSize: "50px", position: "relative" }}
            />
            Add New Item
            <CrossButton setOpen={setOpen} />
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Form Portion */}
            <div className="flex-col justify-center items-center w-fit">
              <form className="flex flex-col items-center justify-center w-fit pb-10">
                <div className="flex gap-x-10 items-center justify-center flex-wrap w-fit p-7">
                  <div>
                    {/* Item Code */}
                    <InputWrapper>
                      <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                        <StyledLabel for="itemCode">
                          <IntegrationInstructionsIcon className="LabelIcon" />
                        </StyledLabel>
                        <StyledInput
                          id="itemCode"
                          type="text"
                          name="itemCode"
                          placeholder="Item Code"
                          value={ItemCode}
                          onChange={(e) =>
                            setItemCode(e.target.value.toUpperCase())
                          }
                        />
                      </div>
                    </InputWrapper>
                    {/* Item Name */}
                    <InputWrapper>
                      <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                        <StyledLabel for="itemName">
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
                        <StyledLabel for="itemUnit">
                          <ShoppingCartIcon className="LabelIcon" />
                        </StyledLabel>
                        <StyledInput
                          id="itemPurchase"
                          type="number"
                          name="itemPurchase"
                          value={ItemPurchase}
                          onChange={(e) => setItemPurchase(e.target.value)}
                          placeholder="Item Purchase Rate"
                        />
                      </div>
                    </InputWrapper>
                    {/* Sale Rate */}
                    <InputWrapper>
                      <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                        <StyledLabel for="itemUnit">
                          <PaymentsIcon className="LabelIcon" />
                        </StyledLabel>
                        <StyledInput
                          id="itemPurchase"
                          type="number"
                          name="itemPurchase"
                          value={ItemSale}
                          onChange={(e) => setItemSale(e.target.value)}
                          placeholder="Item Sale Rate"
                        />
                      </div>
                    </InputWrapper>
                  </div>
                  <div>
                    {/* Select Company */}
                    <InputWrapper>
                      <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                        <StyledLabel for="itemCompany">
                          <AssuredWorkloadIcon className="LabelIcon" />
                        </StyledLabel>
                        <StyledSelect
                          value={CompanyID}
                          onChange={(e) => {
                            setCompanyID(e.target.value);
                          }}
                        >
                          <option value="none">Select Company</option>
                          {TriData.company &&
                            TriData.company.map((comp, i) => (
                              <option key={i} value={comp._id}>
                                {comp.name}
                              </option>
                            ))}
                        </StyledSelect>
                      </div>
                    </InputWrapper>
                    {/* Select Category */}
                    {CompanyID && (
                      <InputWrapper>
                        <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                          <StyledLabel for="itemCategory">
                            <CategoryIcon className="LabelIcon" />
                          </StyledLabel>
                          <StyledSelect
                            value={CategoryID}
                            onChange={(e) => {
                              setCategoryID(e.target.value);
                            }}
                          >
                            <option value="none">Select Category</option>
                            {TriData.category &&
                              TriData.category
                                .filter((data) => {
                                  return data.company_id === CompanyID;
                                })
                                .map((val, i) => (
                                  <option key={i} value={val._id}>
                                    {val.name}
                                  </option>
                                ))}
                          </StyledSelect>
                        </div>
                      </InputWrapper>
                    )}
                    {/* Select Sub Category */}
                    {CategoryID && (
                      <InputWrapper>
                        <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                          <StyledLabel for="itemSubCategory">
                            <SubdirectoryArrowRightIcon className="LabelIcon" />
                          </StyledLabel>
                          <StyledSelect
                            value={SubCategoryID}
                            onChange={(e) => {
                              setSubCategoryID(e.target.value);
                            }}
                          >
                            <option value="none">Select Sub Category</option>
                            {TriData.subcategory &&
                              TriData.subcategory
                                .filter(
                                  (subcat) =>
                                    subcat.company_id === CompanyID &&
                                    subcat.category_id === CategoryID
                                )
                                .map((val, i) => (
                                  <option key={i} value={val._id}>
                                    {val.name}
                                  </option>
                                ))}
                          </StyledSelect>
                        </div>
                      </InputWrapper>
                    )}
                    {/* Select Unit */}
                    {true && (
                      <InputWrapper>
                        <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                          <StyledLabel for="itemUnit">
                            <AdUnitsIcon className="LabelIcon" />
                          </StyledLabel>
                          <StyledSelect
                            value={ItemUnit}
                            onChange={(e) => setItemUnit(e.target.value)}
                          >
                            <option value="none">Select Unit</option>
                            <option value="Bowl">Bowl</option>
                            <option value="Ltr">Ltr</option>
                            <option value="Bottle">Bottle</option>
                            <option value="ml">ml</option>
                            <option value="Kg">Kg</option>
                            <option value="Gram">Gram</option>
                            <option value="No.">No.</option>
                            <option value="Pkt">Pkt</option>
                            <option value="Plate">Plate</option>
                            <option value="Cup">Cup</option>
                            <option value="Piece">Piece</option>
                            <option value="Box">Box</option>
                            <option value="Bundle">Bundle</option>
                          </StyledSelect>
                        </div>
                      </InputWrapper>
                    )}
                  </div>
                </div>

                {ProccessLoading ? (
                  <AddingLoader />
                ) : (
                  <StyledButton onClick={onSubmit} primary>
                    ADD ITEM
                  </StyledButton>
                )}
              </form>
            </div>
          </Typography>
        </Box>
      ) : (
        <DataLoader />
      )}
    </Modal>
  );
};

export default ModalAddNewItem;
