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
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import CategoryIcon from "@mui/icons-material/Category";
import { toast } from "react-toastify";
import categoryServices from "../../../Services/category.services";
import companyServices from "../../../Services/company.services";

const ModalAddCategory = ({ setCategoryModal, CategoryModal }) => {
  const [CompanyID, setCompanyID] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const company = useSelector((state) => state.CompanySliceReducer.data);
  const loading = useSelector((state) => state.CompanySliceReducer.loading);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);
  // const dispatch = useDispatch();
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

  const [Companies, setCompanies] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getComp = async () => {
      let response = await companyServices.getCompanies();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setCompanies(response);
    };
    getComp();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let shopName = data.userdata.fullName;
    const categoryInfo = {
      company_id: CompanyID,
      categoryname: CategoryName,
      shop: shopName,
    };
    if (!(CategoryName === "") && !(CompanyID === "")) {
      try {
        await categoryServices.addCategory(categoryInfo);
        toast.success("Category Successfully Added...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCategoryModal(false);
      } catch (err) {
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
      open={CategoryModal}
      onClose={() => setCategoryModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex-col justify-center items-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: "bold",
              }}
              className="flex justify-center items-center border-b-2 border-[#5A4AE3] pb-0 text-[#5A4AE3]"
            >
              <PostAddIcon
                className="mr-[5px] mb-[5px]"
                style={{ fontSize: "50px" }}
              />
              Add New Category
              <CrossButton setOpen={setCategoryModal} />
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
                        <CategoryIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledSelect
                        value={CompanyID}
                        onChange={(e) => setCompanyID(e.target.value)}
                      >
                        <option value="none">Select Company</option>
                        {Companies.map((val, i) => (
                          <option key={i} value={val._id}>
                            {val.name}
                          </option>
                        ))}
                      </StyledSelect>
                    </div>
                  </InputWrapper>
                  {/* Category Name */}
                  <InputWrapper>
                    <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                      <StyledLabel for="categoryName">
                        <DriveFileRenameOutlineIcon className="LabelIcon" />
                      </StyledLabel>
                      <StyledInput
                        id="categoryName"
                        type="text"
                        name="categoryName"
                        placeholder="Category name"
                        value={CategoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>
                  </InputWrapper>
                  <StyledButton primary>ADD CATEGORY</StyledButton>
                </form>
              </div>
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ModalAddCategory;
