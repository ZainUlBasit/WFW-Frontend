export const InvoiceColumns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 140,
  },

  {
    id: "qty",
    label: "Quantity",
    minWidth: 140,
  },
  {
    id: "unitprice",
    label: "Unit Price",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Amount",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
];