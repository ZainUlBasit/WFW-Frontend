export const Columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "total_amount",
    label: "Total Amount",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paid_amount",
    label: "Paid Amount",
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "discount_amount",
    label: "Discount Amount",
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "remaining_amount",
    label: "Remaining Amount",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
];
