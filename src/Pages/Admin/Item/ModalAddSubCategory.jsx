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
import { CreateSubCategory } from "../../../Https";
import DataLoader from "../../../Components/Loader/DataLoader";

// *******************************
//         Starting
// *******************************
const ModalAddSubCategory = ({ setSubModal, SubModal }) => {
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

  const Companies = useSelector((state) => state.CompanySliceReducer.data);
  const Categories = useSelector((state) => state.CategorySliceReducer.data);

  const [CompanyID, setCompanyID] = useState("");
  const [CategoryID, setCategoryID] = useState("");
  const [SubCategoryName, setSubCategoryName] = useState("");

  const [ProccessLoading, setProccessLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanies(uData));
    dispatch(fetchCategories(uData));
  }, []);

  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    if (CompanyID == "" || CategoryID == "" || SubCategoryName == "") {
      showWarningToast("Required field are undefined!");
      return;
    }
    try {
      const response = await CreateSubCategory({
        company_id: CompanyID,
        category_id: CategoryID,
        name: SubCategoryName,
        branch: uData.branch_number,
      });
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        showSuccessToast(response.data?.data?.msg);
        setSubModal(false);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setProccessLoading(false);
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
          Add Sub Category
          <CrossButton setOpen={setSubModal} />
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form
              onSubmit={onSubmit}
              className="flex flex-col items-center justify-center w-[100%]"
            >
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
                    {Companies.map((company, i) => (
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
                      {Categories.filter(
                        (cat) => cat.company_id === CompanyID
                      ).map((category) => (
                        <option value={category._id}>{category.name}</option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
              )}
              {/* Enter Sub Category */}
              {CategoryID && CompanyID && (
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

              {ProccessLoading ? (
                <DataLoader />
              ) : (
                CompanyID &&
                CategoryID &&
                SubCategoryName && (
                  <StyledButton primary>ADD SUB CATEGORY</StyledButton>
                )
              )}
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalAddSubCategory;
