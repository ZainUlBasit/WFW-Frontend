export const StockDataColumns = [
  {
    id: "item_name",
    label: "Item Name",
    minWidth: 200,
  },
  {
    id: "purchase",
    label: "Purchase",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "qty",
    label: "Qty",
    minWidth: 110,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "invoice",
    label: "Invoice",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "truck",
    label: "Truck",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
