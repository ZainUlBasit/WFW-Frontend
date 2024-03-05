import easyinvoice from "easyinvoice";
import moment from "moment";

const PrintInvoice = (props) => {
  let data = {
    customize: {},
    images: {},
    // Company data
    sender: {
      company: "Irshad Carton Dealer",
      zip: "Swat",
      city: "KPK",
      country: "Pakistan",
    },
    // Your recipient
    client: {
      company: "Ali Khan Kaka",
      zip: "Swat",
      city: "Pakistan",
    },
    information: {
      // Invoice number
      number: "2021.0001",
      // Invoice data
      date: moment(new Date()).format("DD/MM/YYYY"),
      // Invoice due date
      "due-date": moment(new Date()).format("DD/MM/YYYY"),
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: props.CurItems,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": `Developed By: XEE Tech, Email: zainulbasit486@gmail.com`,
    // Settings to customize your invoice
    settings: {},
    translate: {
      subtotal: "Current Total", // Defaults to 'Subtotal'
      products: "Items", // Defaults to 'Products'
      total: "Grand Total", // Defaults to 'Total'
      vat: "Discount", // Defaults to 'vat'
    },
  };
  easyinvoice.createInvoice(data, function (result) {
    easyinvoice.download("invoice.pdf");
  });
};

export default PrintInvoice;
