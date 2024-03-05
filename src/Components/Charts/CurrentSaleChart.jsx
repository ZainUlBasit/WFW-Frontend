import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    shop1: 4000,
    shop2: 2400,
    shop3: 2000,
    amt: 2400,
  },
  {
    name: "Feb",
    shop1: 3000,
    shop2: 1398,
    shop3: 2000,
    amt: 2210,
  },
  {
    name: "Mar",
    shop1: 2000,
    shop2: 9800,
    shop3: 2000,
    amt: 2290,
  },
  {
    name: "Apr",
    shop1: 2780,
    shop2: 3908,
    shop3: 2000,
    amt: 2000,
  },
  {
    name: "May",
    shop1: 1890,
    shop2: 4800,
    shop3: 2000,
    amt: 2181,
  },
  {
    name: "Jun",
    shop1: 2390,
    shop2: 3800,
    shop3: 2000,
    amt: 2500,
  },
  {
    name: "Jul",
    shop1: 3490,
    shop2: 4300,
    shop3: 2000,
    amt: 2100,
  },
  {
    name: "Aug",
    shop1: 1490,
    shop2: 2300,
    shop3: 2000,
    amt: 4100,
  },
  {
    name: "Sep",
    shop1: 2490,
    shop2: 1300,
    shop3: 2000,
    amt: 4100,
  },
  {
    name: "Oct",
    shop1: 4490,
    shop2: 1300,
    shop3: 2000,
    amt: 3100,
  },
  {
    name: "Nov",
    shop1: 1490,
    shop2: 3300,
    shop3: 2000,
    amt: 4100,
  },
  {
    name: "Dec",
    shop1: 2490,
    shop2: 3300,
    shop3: 2000,
    amt: 1100,
  },
];

export default function CurrentSaleChart() {
  return (
    <div className="mt-[100px] w-full h-full">
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="shop2" fill="#8884d8" />
        <Bar dataKey="shop1" fill="#82ca9d" />
        <Bar dataKey="shop3" fill="#5A4AE3" />
      </BarChart>
    </div>
  );
}
