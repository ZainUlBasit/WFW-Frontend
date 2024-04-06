// export const Columns = [
//   {
//     id: "date",
//     label: "Date",
//     minWidth: 100,
//   },
//   {
//     id: "accountno",
//     label: "Account No",
//     minWidth: 140,
//   },

//   {
//     id: "description",
//     label: "Description",
//     minWidth: 140,
//   },
//   {
//     id: "cash",
//     label: "Amount",
//     align: "left",
//     minWidth: 150,
//     format: (value) => value.toLocaleString("en-US"),
//   },
// ];

export const Columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },

  {
    id: "user_name",
    label: "Name",
    minWidth: 140,
  },
  {
    id: "depositor",
    label: "Depositor",
    minWidth: 140,
  },
  {
    id: "payment_type",
    label: "Payment Type",
    minWidth: 140,
  },
  {
    id: "bank_name",
    label: "Bank Name",
    minWidth: 140,
  },
  {
    id: "bank_number",
    label: "Bank Number",
    minWidth: 140,
  },
  {
    id: "amount",
    label: "Amount",
    align: "left",
    minWidth: 150,
  },
  {
    id: "desc",
    label: "Description",
    minWidth: 140,
  },
  {
    id: "branch",
    label: "Branch",
    minWidth: 140,
  },
];

export const AdminColumns = [
  {
    id: "shop",
    label: "Shop",
    minWidth: 90,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "accountno",
    label: "Account No",
    minWidth: 140,
  },

  {
    id: "description",
    label: "Description",
    minWidth: 140,
  },
  {
    id: "cash",
    label: "Amount",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
];
