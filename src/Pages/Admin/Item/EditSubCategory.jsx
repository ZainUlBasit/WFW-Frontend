import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
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
import subcategoryServices from "../../../Services/subcategory.services";
import { toast } from "react-toastify";
import companyServices from "../../../Services/company.services";
import categoryServices from "../../../Services/category.services";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/TaostMessages";
import {
  CreateSubCategory,
  DeleteSubCategory,
  GetAllCategory,
  GetAllSubCategory,
  GetBranchCategory,
  GetBranchCompany,
  GetBranchSubCategory,
  GetCompany,
  UpdateSubCategory,
} from "../../../Https";
import { fetchSubCategories } from "../../../store/SubCategorySlice";
import { fetchTri } from "../../../store/TriGetSlice";
import AddingLoader from "../../../Components/Loader/AddingLoader";

// *******************************
//         Starting
// *******************************
const EditSubCategory = ({ setSubModal, SubModal }) => {
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

  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const TriData = useSelector((state) => state.TriGet.data);
  const TriDataCompany = useSelector((state) => state.TriGet.data?.company);
  const TriDataCategory = useSelector((state) => state.TriGet.data?.category);
  const TriDataSubCategory = useSelector(
    (state) => state.TriGet.data?.subcategory
  );

  const [Loading, setLoading] = useState(false);

  const [CompanyID, setCompanyID] = useState("");
  const [CategoryID, setCategoryID] = useState("");
  const [SubCategoryID, setSubCategoryID] = useState("");
  const [SubCategoryName, setSubCategoryName] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchCompanies(uData));
    dispatch(fetchTri(uData));
    // dispatch(fetchSubCategories(uData));
  }, []);

  const onUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      CompanyID === "" ||
      CategoryID === "" ||
      SubCategoryID === "" ||
      SubCategoryName === ""
    ) {
      showWarningToast("Required field are undefined!");
      return;
    }
    try {
      const response = await UpdateSubCategory({
        subcategoryId: SubCategoryID,
        new_name: SubCategoryName,
      });
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        showSuccessToast(response.data?.data?.msg);
        setSubModal(false);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  const onDelete = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (CompanyID === "" || CategoryID === "" || SubCategoryID === "") {
      showWarningToast("Required field are undefined!");
      return;
    }
    try {
      const response = await DeleteSubCategory(SubCategoryID);
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        showSuccessToast(response.data?.data?.msg);
        setSubModal(false);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  return (
    <Modal
      open={SubModal}
      onClose={() => setSubModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex-col justify-center items-center">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
          className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
        >
          <PostAddIcon
            className="mr-[5px] mb-[5px]"
            style={{ fontSize: "50px", position: "relative" }}
          />
          Edit Sub Category
          <CrossButton setOpen={setSubModal} />
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            {TriData.loading ? (
              <AddingLoader />
            ) : (
              <form className="flex flex-col items-center justify-center w-[100%]">
                {/* Select Company */}
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemCompany">
                      <ApartmentIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      onChange={(e) => {
                        setCompanyID(e.target.value);
                      }}
                    >
                      <option value="none">Select Company</option>
                      {TriDataCompany &&
                        TriDataCompany.map((company, i) => (
                          <option key={i} value={company._id}>
                            {company.name}
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
                        onChange={(e) => {
                          setCategoryID(e.target.value);
                        }}
                      >
                        <option value="none">Select Category</option>
                        {TriDataCategory &&
                          TriDataCategory.filter(
                            (cat) => cat.company_id === CompanyID
                          ).map((category) => (
                            <option value={category._id}>
                              {category.name}
                            </option>
                          ))}
                      </StyledSelect>
                    </div>
                  </InputWrapper>
                )}
                {CategoryID && (
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel for="itemCategory">
                        <CategoryIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledSelect
                        onChange={(e) => {
                          setSubCategoryID(e.target.value);
                        }}
                      >
                        <option value="none">Select Category</option>
                        {TriDataSubCategory &&
                          TriDataSubCategory.filter(
                            (cat) =>
                              cat.company_id === CompanyID &&
                              cat.category_id === CategoryID
                          ).map((catS) => (
                            <option value={catS._id}>{catS.name}</option>
                          ))}
                      </StyledSelect>
                    </div>
                  </InputWrapper>
                )}
                {/* Enter Sub Category */}
                {CategoryID && SubCategoryID && CompanyID && (
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel for="itemCode">
                        <AssuredWorkloadIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        id="sub-category-name"
                        type="text"
                        name="sub-category-name"
                        placeholder="Sub Category"
                        value={SubCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                      />
                    </div>
                  </InputWrapper>
                )}
                {Loading ? (
                  <AddingLoader />
                ) : (
                  CompanyID &&
                  CategoryID &&
                  SubCategoryName && (
                    <div className="flex w-[90%] justify-between mb-[15px]">
                      <StyledButton primary update onClick={onUpdate}>
                        Update
                      </StyledButton>
                      <StyledButton primary delete onClick={onDelete}>
                        Delete
                      </StyledButton>
                    </div>
                  )
                )}
              </form>
            )}
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default EditSubCategory;
