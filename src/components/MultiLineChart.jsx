import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Head from "next/head";

const LineChartOptions = {
  series: {
    1: { curveType: "function" },
  },
};

const MultiLineChart = ({lineData}) => {
  const LineData = lineData?.graph?.map((row, index) => {
    if (Array.isArray(row) && index > 0) {
      return row.map(value => parseFloat(value));
    } else {
      return row;
    }
  });
  // console.log(LineData);
  // const LineData = lineData?.graph;
//   [
//   ["x", "Created", "Issued","Closed"],
//   ['0', '1', '0','2'],
//   [1, 10, 5,36],
//   [2, 23, 15,56]
// ];
  return (
    <div className="container mt-5 overflow-x-scroll sm:overflow-hidden">
      {/* <Head>
        <title>MultiLineChart</title>
      </Head> */}

      <Chart
        width={"650px"}
        height={"350px"}
        min-height={"255px"}
        chartType="LineChart"
        data={LineData}
        options={LineChartOptions}
        rootProps={{ "data-testid": "0" }}
      />
    </div>
  );
};

export default MultiLineChart;