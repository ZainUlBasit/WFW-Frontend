export const Columns = [
  {
    id: "itemName",
    label: "Item Name",
    minWidth: "100px",
    align: "left",
  },
  {
    id: "itemQuantity",
    label: "Item Quantity",
    minWidth: "100px",
    align: "left",
  },
  {
    id: "itemPrice",
    label: "Item Price",
    minWidth: "100px",
    align: "left",
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: "100px",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
