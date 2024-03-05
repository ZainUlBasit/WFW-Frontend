export const Columns = [
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
