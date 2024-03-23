export const CustomerColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 190,
  },
  {
    id: "contact",
    label: "Phone",
    minWidth: 150,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cnic",
    label: "CNIC",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ref",
    label: "Referenece",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "page",
    label: "Page",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "branch",
    label: "Branch #",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export const AdminCustomerColumns = [
  {
    id: "fullname",
    label: "Name",
    minWidth: 190,
  },
  {
    id: "contact",
    label: "Phone",
    minWidth: 150,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cnic",
    label: "CNIC",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 130,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "shop",
    label: "Shop",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createCustomerData(name, phone, email, cnic, address, shop) {
  return { name, phone, email, cnic, address, shop };
}

export const CustomerRows = [
  createCustomerData(
    "Ubaid Ur Rehman",
    "+92311-0312452",
    "ubaidzain425@gmail.com",
    "17301-6782267-9",
    "Peshawar",
    "Shop 1"
  ),
  createCustomerData(
    "Zain Ul Basit",
    "+92333-0745643",
    "zainulbasit486@gmail.com",
    "17101-2992880-3",
    "Charsadda",
    "Shop 3"
  ),
];

// Companies Kata
export const CompaniesKataColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
  },
  {
    id: "total",
    label: "Total Amount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paid",
    label: "Paid Amount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "remaining",
    label: "Remaining Amount",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function CompaniesKataCreateData(
  id,
  name,
  description,
  totalAmount,
  paidAmount,
  remainingAmount
) {
  return { id, name, description, totalAmount, paidAmount, remainingAmount };
}

export const CompaniesKataRows = [
  CompaniesKataCreateData(
    1,
    "NASIR PKGS",
    "Carton",
    1000000,
    500000,
    1000000 - 500000
  ),
  CompaniesKataCreateData(
    2,
    "IMTYAZ PKGS",
    "Carton",
    7000000,
    600000,
    7000000 - 600000
  ),
  CompaniesKataCreateData(
    3,
    "NOBEL PKGS",
    "Carton",
    1000000,
    900000,
    1000000 - 900000
  ),
  CompaniesKataCreateData(
    4,
    "ARSHID PKGS",
    "Carton",
    4000000,
    400000,
    4000000 - 400000
  ),
  CompaniesKataCreateData(
    5,
    "ZAHID PKGZ",
    "Carton",
    5000000,
    300000,
    5000000 - 300000
  ),
  CompaniesKataCreateData(
    6,
    "IRSHAD PKGS",
    "Carton",
    9000000,
    700000,
    9000000 - 700000
  ),
  CompaniesKataCreateData(
    7,
    "SARDAR PKGS",
    "Carton",
    8000000,
    100000,
    8000000 - 100000
  ),
];

// Companies Kata
export const CustomerKataColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  {
    id: "total",
    label: "Total Amount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "return_amount",
    label: "Return",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paid",
    label: "Paid Amount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "remaining",
    label: "Remaining Amount",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function CustomerKataCreateData(
  name,
  totalAmount,
  paidAmount,
  remainingAmount
) {
  return { name, totalAmount, paidAmount, remainingAmount };
}

export const CustomerKataRows = [
  CustomerKataCreateData("ZAIN UL BASIT", 1000000, 500000, 1000000 - 500000),
  CustomerKataCreateData("WAHAB ALI", 7000000, 600000, 7000000 - 600000),
  CustomerKataCreateData("EYSA JAN", 1000000, 900000, 1000000 - 900000),
  CustomerKataCreateData("GUL JAN", 4000000, 400000, 4000000 - 400000),
  CustomerKataCreateData("YASEEN KHAN", 5000000, 300000, 5000000 - 300000),
  CustomerKataCreateData("IFTEKHAR", 9000000, 700000, 9000000 - 700000),
  CustomerKataCreateData("MAAZ ALAM", 8000000, 100000, 8000000 - 100000),
];
