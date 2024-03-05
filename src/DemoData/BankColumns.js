export const BankColumns = [
  {
    id: "bankname",
    label: "Bank",
    minWidth: 150,
  },
  {
    id: "accountno",
    label: "Account",
    minWidth: 100,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 230,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
