import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, 
         faUser, 
         faBoxOpen, 
         faBuilding, 
         faChartColumn, 
         faMoneyCheck, 
         faAddressCard,
         faChartPie } from "@fortawesome/free-solid-svg-icons";

const SideBarData = [
    {
        key: '0',
        title: "Dashboard",
        path: "/",
        icon: faChartLine,
        subMenu: [
            {
                title: "Shop 1",
                path: "./admin/shop1",
                icon: faChartLine
            },
            {
                title: "Shop 2",
                path: "./admin/shop2",
                icon: faChartLine
            },
            {
                title: "Shop 3",
                path: "./admin/shop3",
                icon: faChartLine
            }
        ]
    },
    {
        key: '1',
        title: "Company",
        path: "/companies_info",
        icon: faBuilding,
        subMenu: [
            {
                title: "Add New Company",
                path: "/admin/add_new_company",
                icon: faChartLine
            },
            {
                title: "Companies Kata",
                path: "/admin/companies_kata",
                icon: faChartLine
            },
        ],
    },
    {
        key: '2',
        title: "Items",
        path: "/items",
        icon: faBoxOpen,
        subMenu: [
            {
                title: "Add Items",
                path: "/add_item",
                icon: faChartLine
            },
            {
                title: "Add Stock",
                path: "/add_stock",
                icon: faChartLine
            },
            {
                title: "Stock Statictics",
                path: "/stock_statictics",
                icon: faChartLine
            },
        ],
    },
    {
        key: '3',
        title: "Customer",
        path: "/customer_info",
        icon: faUser,
        subMenu: [
            {
                title: "Add New Customer",
                path: "/admin/add_new_customer",
                icon: faChartLine
            },
            {
                title: "Customer Kata",
                path: "/admin/customer_kata",
                icon: faChartLine
            },
            {
                title: "Customer Invoice Edit",
                path: "/admin/customer_invoice_edit",
                icon: faChartLine
            },
        ],
    },
    {
        key: '4',
        title: "Reports",
        path: "/expense_report",
        icon: faChartColumn,
    },
    {
        key: '5',
        title: "Cash Payment",
        path: "/cash_payment",
        icon: faMoneyCheck,
        subMenu: [
            {
                title: "Company Payment",
                path: "./admin/company_payment",
                icon: faChartLine
            },
            {
                title: "Customer Payment",
                path: "./admin/customer_payment",
                icon: faChartLine
            },
            {
                title: "Profit",
                path: "./admin/profit",
                icon: faChartLine
            },
        ],
    },

];


export default SideBarData;