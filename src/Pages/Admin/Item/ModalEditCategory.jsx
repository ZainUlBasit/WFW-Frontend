import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from "./Styling/ItemInputStyling";
import { CrossButton, StyledButton } from "./Styling/StyleButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/CategorySlice";
import CategoryIcon from "@mui/icons-material/Category";
import { fetchItems } from "../../../store/ItemSlice";
import { toast } from "react-toastify";
import categoryServices from "../../../Services/category.services";
import companyServices from "../../../Services/company.services";
import AddingLoader from "../../../Components/Loader/AddingLoader";
import { fetchCompanies } from "../../../store/CompanySlice";

const ModalEditCategory = ({ EditCategoryModal, setEditCategoryModal }) => {
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

  const [CategoryId, setCategoryId] = useState("");
  const [CategoryNewName, setCategoryNewName] = useState("");
  const [ProccessLoading, setProccessLoading] = useState(false);

  const company = useSelector((state) => state.CompanySliceReducer.data);
  const category = useSelector((state) => state.CategorySliceReducer.data);

  const [Categories, setCategories] = useState([]);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [CategoryCompanyID, setCategoryCompany] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanies(uData));
    dispatch(fetchCategories(uData));
  }, []);
  const onUpdate = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    let id = Categories.filter(
      (c) => c.categoryname === CategoryName && CategoryCompany === c.company_id
    );
    id = id[0]._id;
    const categoryInfo = {
      categoryname: CategoryNewName,
    };
    if (
      !(CategoryName === "") &&
      !(CategoryName === "none") &&
      !(CategoryNewName === "")
    ) {
      try {
        await categoryServices.updateCategory(id, categoryInfo);
        setEditCategoryModal(false);
        toast.success("Category Successfully Updated...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("Unable to Update Category...", {
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
    let id = Categories.filter((c) => c.categoryname === CategoryName);
    id = id[0]._id;
    if (CategoryName !== "") {
      try {
        await categoryServices.deleteCategory(id);
        toast.success("Category Successfully Deleted...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditCategoryModal(false);
      } catch (err) {
        toast.error("Unable to Delete Category...", {
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
  const [Loading, setLoading] = useState(false);

  return (
    <Modal
      open={EditCategoryModal}
      onClose={() => setEditCategoryModal(false)}
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
          Edit Category
          <CrossButton setOpen={setEditCategoryModal} />
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* Form Portion */}
          <div className="flex-col justify-center items-center">
            <form className="flex flex-col items-center justify-center w-[100%]">
              {/* Select Company */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel for="itemCompany">
                    <CategoryIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    value={CategoryCompanyID}
                    onChange={(e) => setCategoryCompany(e.target.value)}
                  >
                    <option value="none">Select Company</option>
                    {company.map((val, i) => (
                      <option key={i} value={val._id}>
                        {val.name}
                      </option>
                    ))}
                  </StyledSelect>
                </div>
              </InputWrapper>
              {/* Select Category */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel for="itemCompany">
                    <CategoryIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    value={CategoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="none" selected>
                      Select Category
                    </option>
                    {category &&
                      category
                        .filter((cat) => cat.company_id === CategoryCompanyID)
                        .map((val, i) => (
                          <option key={i} value={val._id}>
                            {val.name}
                          </option>
                        ))}
                  </StyledSelect>
                </div>
              </InputWrapper>
              {/* Category New Name */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel for="categoryName">
                    <DriveFileRenameOutlineIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="categoryName"
                    type="text"
                    name="categoryName"
                    placeholder="Category new name"
                    value={CategoryNewName}
                    onChange={(e) => setCategoryNewName(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {ProccessLoading ? (
                <AddingLoader />
              ) : (
                <div className="flex w-[90%] justify-between mb-[15px]">
                  <StyledButton primary update onClick={onUpdate}>
                    Update
                  </StyledButton>
                  <StyledButton primary delete onClick={onDelete}>
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

export default ModalEditCategory;
