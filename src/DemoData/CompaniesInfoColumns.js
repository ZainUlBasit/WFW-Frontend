export const Columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 230,
  },
  {
    id: "contact",
    label: "Contact",
    align: "left",
    minWidth: 120,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cnic",
    label: "Cnic",
    minWidth: 155,
  },
  {
    id: "address",
    label: "Address",
    align: "left",
    minWidth: 140,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "branch",
    label: "Branch #",
    align: "center",
    minWidth: 140,
    format: (value) => value.toLocaleString("en-US"),
  },
];
