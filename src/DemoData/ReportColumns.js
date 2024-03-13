export const ReportColumns = [
    {
      id: "date",
      label: "Date",
      minWidth: 140,
    },
    {
      id: "desc",
      label: "Description",
      minWidth: 190,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "expense",
      label: "Expense",
      minWidth: 150,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  