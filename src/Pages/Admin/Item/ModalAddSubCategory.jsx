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

  const [Company, setCompany] = useState("");
  const [Category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");

  const [CompanySelected, setCompanySelected] = useState(false);
  const [CategorySelected, setCategorySelected] = useState(false);
  const [Categories, setCategories] = useState([]);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [Companies, setCompanies] = useState([]);
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
    getComp();
    getCat();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const shopName = uData.userdata.fullName;
    const SubCatInfo = {
      company_id: Company,
      categoryname: Category,
      subcategoryname: SubCategory,
      shop: shopName,
    };
    if (Company !== "" && Category !== "" && SubCategory !== "") {
      try {
        await subcategoryServices.addSubCategory(SubCatInfo);
        toast.success("SubCategory Successfully Added...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSubModal(false);
      } catch (error) {
        toast.error("Unable to add new Sub Category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.warn("All Fields are mandatory", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: "bold" }}
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
                      const curD = e.target.value;
                      if (curD !== "none") {
                        setCompanySelected(true);
                        setCompany(curD);
                      } else {
                        setCompanySelected(false);
                        setCategorySelected(false);
                      }
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
              {CompanySelected ? (
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemCategory">
                      <CategoryIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledSelect
                      onChange={(e) => {
                        const curD = e.target.value;
                        if (curD !== "none") {
                          setCategorySelected(true);
                          setCategory(curD);
                        } else {
                          setCategorySelected(false);
                        }
                      }}
                    >
                      <option value="none">Select Category</option>
                      {Categories.filter((cat) => {
                        if (cat.company_id === Company) return cat;
                      }).map((category) => (
                        <option value={category.categoryname}>
                          {category.categoryname}
                        </option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
              ) : null}
              {/* Enter Sub Category */}
              {CategorySelected ? (
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel for="itemCode">
                      <AssuredWorkloadIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemCode"
                      type="text"
                      name="itemCode"
                      placeholder="Sub Category"
                      value={SubCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                </InputWrapper>
              ) : null}
              {CompanySelected && CategorySelected && (
                <StyledButton primary>ADD SUB CATEGORY</StyledButton>
              )}
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalAddSubCategory;
