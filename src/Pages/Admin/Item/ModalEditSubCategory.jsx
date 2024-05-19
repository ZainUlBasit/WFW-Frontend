import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { CrossButton, StyledButton } from "./Styling/StyleButton";
import { fetchSubCategories } from "../../../store/SubCategorySlice";
import AddingLoader from "../../../Components/Loader/AddingLoader";
import { fetchCompanies } from "../../../store/CompanySlice";
import { fetchCategories } from "../../../store/CategorySlice";
import CustomerPoperOver from "../../../Components/Popover/CustomPopOver";
import DataLoader from "../../../Components/Loader/DataLoader";

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

  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();

  const [ProccessLoading, setProccessLoading] = useState(false);
  // const Companies = useSelector((state) => state.CompanySliceReducer);
  const Categories = useSelector((state) => state.CategorySliceReducer);
  const SubCategories = useSelector((state) => state.SubCategorySliceReducer);

  const [CompanyId, setCompanyId] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [SubCategoryId, setSubCategoryId] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [SubCategoryName, setSubCategoryName] = useState("");
  const [SubCategoryNewName, setSubCategoryNewName] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies(uData));
  }, []);

  useEffect(() => {
    dispatch(fetchCategories(uData));
  }, []);

  useEffect(() => {
    dispatch(fetchSubCategories(uData));
  }, []);

  const onUpdate = () => {};
  const onDelete = () => {};

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
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
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
          {Categories.loading || SubCategories.loading ? (
            <DataLoader />
          ) : (
            <div className="flex-col justify-center items-center">
              {/* Select Company */}

              {/* <CustomerPoperOver
                Label={"Company"}
                Placeholder={"Select Company..."}
                ValueId={CompanyId}
                ValueName={CompanyName}
                setValueId={setCompanyId}
                setValueName={setCompanyName}
                Values={Companies.data}
              /> */}
              <CustomerPoperOver
                Label={"Category"}
                Placeholder={"Select Category..."}
                ValueId={CategoryId}
                ValueName={CategoryName}
                setValueId={setCategoryId}
                setValueName={setCategoryName}
                Values={Categories.data}
              />
              <CustomerPoperOver
                Label={"Sub Category"}
                Placeholder={"Select Sub Category..."}
                ValueId={SubCategoryId}
                ValueName={SubCategoryName}
                setValueId={setSubCategoryId}
                setValueName={setSubCategoryName}
                Values={SubCategories.data}
              />

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
            </div>
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalEditSubCategory;
