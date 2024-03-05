import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./BranchDetails.css";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";

const ShopCard = ({
  title,
  AcceptReturn,
  setAcceptReturn,
  EditCompanyInvoice,
  setEditCompanyInvoice,
  EditCustomerInvoice,
  setEditCustomerInvoice,
}) => {
  return (
    <>
      <Accordion className="ShopWrapper">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="Title"
        >
          <Typography className="TitleText">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Badge color="success">
            <h4 className="bg-green-500 text-white px-[8px] py-[1px] rounded-[15px] select-none">
              {title} - Permissions
            </h4>
          </Badge>
          <Typography component={"div"}>
            <ul className="flex flex-col list-disc pl-[25px] pt-[10px] sm:pl-[10px]">
              <li>
                <div className="ListItemWrapper flex w-[360px] sm:pl-[0px] justify-between font-[raleway]">
                  <h1 className="select-none">
                    Accept Return Items From Customer
                  </h1>
                  {AcceptReturn ? (
                    <input
                      type="checkbox"
                      checked
                      onChange={(e) =>
                        e.target.checked
                          ? setAcceptReturn(true)
                          : setAcceptReturn(false)
                      }
                    />
                  ) : (
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        e.target.checked
                          ? setAcceptReturn(true)
                          : setAcceptReturn(false)
                      }
                    />
                  )}
                </div>
              </li>
              <li>
                <div className="ListItemWrapper flex w-[360px] sm:pl-[0px] justify-between font-[raleway]">
                  <h1 className="select-none">
                    Edit Company Invoice Items From Customer
                  </h1>
                  {EditCompanyInvoice ? (
                    <input
                      type="checkbox"
                      checkedonChange={(e) =>
                        e.target.checked
                          ? setEditCompanyInvoice(true)
                          : setEditCompanyInvoice(false)
                      }
                    />
                  ) : (
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        e.target.checked
                          ? setEditCompanyInvoice(true)
                          : setEditCompanyInvoice(false)
                      }
                    />
                  )}
                </div>
              </li>
              <li>
                <div className="ListItemWrapper flex w-[360px] sm:pl-[0px] justify-between font-[raleway]">
                  <h1 className="select-none">
                    Edit Customer Invoice Items From Customer
                  </h1>
                  {EditCustomerInvoice ? (
                    <input
                      type="checkbox"
                      checked
                      onChange={(e) =>
                        e.target.checked
                          ? setEditCustomerInvoice(true)
                          : setEditCustomerInvoice(false)
                      }
                    />
                  ) : (
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        e.target.checked
                          ? setEditCustomerInvoice(true)
                          : setEditCustomerInvoice(false)
                      }
                    />
                  )}
                </div>
              </li>
            </ul>
            {/* footer */}
            <div className="flex justify-end mt-[10px]">
              <Button variant="contained" color="success">
                Update
              </Button>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ShopCard;
