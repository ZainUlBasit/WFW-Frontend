export const Columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "invoice_no",
    label: "Bill No",
    align: "center",
    minWidth: 150,
  },
  {
    id: "name",
    label: "Name",
    align: "center",
    minWidth: 150,
  },
  {
    id: "qty",
    label: "Quantity",
    minWidth: 140,
    align: "right",
  },
  {
    id: "price",
    label: "Unit Price",
    align: "right",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Total",
    align: "right",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
];
export const AdminColumns = [
  {
    id: "date",
    label: "Date",
    minWidth: 150,
  },
  {
    id: "shop",
    label: "Shop",
    minWidth: 150,
  },
  {
    id: "billNo",
    label: "Bill No",
    minWidth: 150,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 150,
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
    label: "Total",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
];
