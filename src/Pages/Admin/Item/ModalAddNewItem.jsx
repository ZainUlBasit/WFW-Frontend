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

const ModalAddNewItem = ({ setOpen, open }) => {
  // States
  // itemCode
  const [ItemCode, setItemCode] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemCompany, setItemCompany] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [ItemSubCategory, setItemSubCategory] = useState("");
  const [ItemUnit, setItemUnit] = useState("");
  const [ItemPurchase, setItemPurchase] = useState(0);
  const [ItemSale, setItemSale] = useState(0);
  // redux code
  const companies = useSelector((state) => state.CompanySliceReducer.data);
  const categories = useSelector((state) => state.CategorySliceReducer.data);
  const subcategories = useSelector(
    (state) => state.SubCategorySliceReducer.data
  );
  const loading = useSelector((state) => state.SubCategorySliceReducer.loading);
  const dispatch = useDispatch();

  const [Companies, setCompanies] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [ProccessLoading, setProccessLoading] = useState(false);

  useEffect(() => {
    const getComp = async () => {
      let response = await companyServices.getCompanies();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setCompanies(response);
    };
    const getCat = async () => {
      let response = await categoryServices.getCategories();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setCategories(response);
    };
    const getSubCat = async () => {
      let response = await subcategoryServices.getSubCategories();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setSubCategories(response);
    };
    getComp();
    getCat();
    getSubCat();
  }, []);

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
  
  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const shopName = uData.userdata.fullName;
    let it_company = Companies.filter((comp) => comp._id === ItemCompany);
    it_company = it_company[0];
    it_company = it_company.name;

    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());

    const itemInfo = {
      itemcode: ItemCode,
      itemname: ItemName,
      itemcompany: it_company,
      itemcategory: ItemCategory,
      itemsubcategory: ItemSubCategory,
      itemunit: ItemUnit,
      itempurchase: ItemPurchase,
      itemsale: ItemSale,
      itemqty: 0,
      itemshop: shopName,
      itemaddeddate: timestamp,
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
        await itemServices.addItem(itemInfo);
        setOpen(false);
        dispatch(fetchItems());
        toast.success("Item Successfully Added...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("Unable to add item...", {
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
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {SubCategories ? (
        <Box sx={style} className="flex-col justify-center items-center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
            className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
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
            <div className="flex-col justify-center items-center">
              <form className="flex flex-col items-center justify-center w-[100%]">
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
                {/* Select Company */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemCompany">
                      <AssuredWorkloadIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemCompany}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setItemCompany(e.target.value);
                      }}
                    >
                      <option value="none">Select Company</option>
                      {Companies.map((comp, i) => (
                        <option key={i} value={comp._id}>
                          {comp.name}
                        </option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Category */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemCategory">
                      <CategoryIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemCategory}
                      onChange={(e) => setItemCategory(e.target.value)}
                    >
                      <option value="none">Select Category</option>
                      {Categories.filter(
                        (cat) => cat.company_id === ItemCompany
                      ).map((val, i) => (
                        <option key={i} value={val.categoryname}>
                          {val.categoryname}
                        </option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Sub Category */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemSubCategory">
                      <SubdirectoryArrowRightIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      value={ItemSubCategory}
                      onChange={(e) => setItemSubCategory(e.target.value)}
                    >
                      <option value="none">Select Sub Category</option>
                      {SubCategories.filter(
                        (subcat) =>
                          subcat.company_id === ItemCompany &&
                          subcat.categoryname === ItemCategory
                      ).map((val, i) => (
                        <option key={i} value={val.subcategoryname}>
                          {val.subcategoryname}
                        </option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
                {/* Select Unit */}
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
