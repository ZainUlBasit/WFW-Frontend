import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [State, setState] = useState({
    series: [
      {
        name: "Servings",
        data: [
          412237, 512376, 234124, 564512, 231247, 231248, 216457, 1231224,
          786575, 321231, 342356, 645674,
        ],
      },
    ],
    options: {
      annotations: {
        points: [
          {
            x: "June",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Half",
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [
          "January",
          "Feburary",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Sale",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  });
  return (
    <ReactApexChart
      options={State.options}
      series={State.series}
      type="bar"
      height={380}
      width={850}
    />
  );
};

export default ApexChart;
