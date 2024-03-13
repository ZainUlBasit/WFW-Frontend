export const Columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 140,
  },
  {
    id: "company",
    label: "Company",
    align: "left",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "purchase",
    label: "Purchase Price",
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "sale",
    label: "Sale Price",
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "profit_per_item",
    label: "Profit Per Item",
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];
