export const Columns = [
  {
    id: "name",
    label: "Name",
    minWidth: "100px",
    align: "left",
  },
  {
    id: "qty",
    label: "Quantity",
    minWidth: "100px",
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    minWidth: "100px",
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: "100px",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
