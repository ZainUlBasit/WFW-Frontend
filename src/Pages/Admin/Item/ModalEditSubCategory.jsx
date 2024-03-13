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
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "../../../store/SubCategorySlice";
import { toast } from "react-toastify";
import subcategoryServices from "../../../Services/subcategory.services";
import categoryServices from "../../../Services/category.services";
import companyServices from "../../../Services/company.services";
import AddingLoader from "../../../Components/Loader/AddingLoader";

const ModalEditSubCategory = ({
  setEditSubCategoryModal,
  EditSubCategoryModal,
}) => {
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

  const subcategories = useSelector(
    (state) => state.SubCategorySliceReducer.data
  );
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const dispatch = useDispatch();
  const [SubCategories, setSubCategories] = useState([]);

  const onUpdate = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const subCategoryInfo = {
      subcategoryname: SubCategoryName,
    };
    if (SubCategoryName !== "") {
      try {
        await subcategoryServices.updateSubCategory(Category, subCategoryInfo);
        setEditSubCategoryModal(false);
        toast.success("Sub Category Successfully Updated...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("Unable to Update Sub Category...", {
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

  const onDelete = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    console.log(Category);
    // let id = SubCategories.filter((sc) => sc._id === Category);
    // id = id[0]._id;
    if (Category !== "") {
      try {
        await subcategoryServices.deleteSubCategory(Category);
        setEditSubCategoryModal(false);
        toast.success("Sub Category Successfully Deleted...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("Unable to Delete Sub Category...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.warn("Please Select Any Item...", {
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

  const [MainCategorySelected, setMainCategorySelected] = useState("");
  const [MainCategory, setMainCategory] = useState("");
  const [CategorySelected, setCategorySelected] = useState("");
  const [Category, setCategory] = useState("");
  const [SubCategoryName, setSubCategoryName] = useState("");
  const [Company, setCompany] = useState("");
  const [CompanySelected, setCompanySelected] = useState(false);
  const [ProccessLoading, setProccessLoading] = useState(false);

  const [Companies, setCompanies] = useState([]);
  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    const getComp = async () => {
      setProccessLoading(true);
      let response = await companyServices.getCompanies();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setCompanies(response);
    };
    const getCat = async () => {
      setProccessLoading(true);
      let response = await categoryServices.getCategories();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setCategories(response);
    };
    const getSubCat = async () => {
      setProccessLoading(true);
      let response = await subcategoryServices.getSubCategories();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setSubCategories(response);
      setProccessLoading(false);
    };
    getComp();
    getCat();
    getSubCat();
  }, []);

  return (
    <Modal
      open={EditSubCategoryModal}
      onClose={() => setEditSubCategoryModal(false)}
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
          <AppRegistrationIcon
            className="mr-[5px] mb-[5px]"
            style={{ fontSize: "50px" }}
          />
          Edit Sub Category
          <CrossButton setOpen={setEditSubCategoryModal} />
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Select Company */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel for="itemCompany">
                    <ApartmentIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    value={Company}
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
                          setMainCategorySelected(true);
                          setMainCategory(curD);
                        } else {
                          setMainCategorySelected(false);
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
              {/* Select Sub Category */}
              {!MainCategorySelected ? (
                <></>
              ) : (
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
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
                      <option value="none">Select Sub Category</option>
                      {SubCategories.filter(
                        (subC) =>
                          MainCategory === subC.categoryname &&
                          subC.company_id === Company
                      ).map((sub, i) => (
                        <option key={i} value={sub._id}>
                          {sub.subcategoryname}
                        </option>
                      ))}
                    </StyledSelect>
                  </div>
                </InputWrapper>
              )}
              {/* Enter Sub Category */}
              {CategorySelected ? (
                <InputWrapper>
                  <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                    <StyledLabel>
                      <AssuredWorkloadIcon className="LabelIcon" />
                    </StyledLabel>
                    <StyledInput
                      id="itemCode"
                      type="text"
                      name="itemCode"
                      placeholder="Sub Category new name"
                      value={SubCategoryName}
                      onChange={(e) => setSubCategoryName(e.target.value)}
                    />
                  </div>
                </InputWrapper>
              ) : null}
              {ProccessLoading ? (
                <AddingLoader />
              ) : (
                <div className="flex w-[95%] justify-between mb-[15px]">
                  <StyledButton onClick={onUpdate} primary update>
                    Update
                  </StyledButton>
                  <StyledButton onClick={onDelete} primary delete>
                    Delete
                  </StyledButton>
                </div>
              )}
            </form>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalEditSubCategory;
