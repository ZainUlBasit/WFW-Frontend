export const Columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 150,
  },
  {
    id: "bill",
    label: "Bill No",
    minWidth: 150,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 140,
  },
  {
    id: "amount",
    label: "Amount",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
];
