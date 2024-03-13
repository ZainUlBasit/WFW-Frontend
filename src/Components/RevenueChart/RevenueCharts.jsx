import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RevenueChartsData } from "./RevenueChartsData";

const RevenueChart = ({ width, height }) => {
  return (
    <LineChart width={width} height={height} data={RevenueChartsData}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip bottom />
      <Legend />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#8884d8"
        strokeWidth={2}
      />
    </LineChart>
  );
};

export default RevenueChart;
