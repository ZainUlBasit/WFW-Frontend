export const Columns = [
  {
    id: "date",
    label: "Date",
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
    align: "right",
  },
  {
    id: "unitprice",
    label: "Unit Price",
    align: "right",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    align: "right",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
];
