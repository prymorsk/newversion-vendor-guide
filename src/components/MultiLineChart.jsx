"use client";

import Chart from "react-google-charts";

const LineChartOptions = {
  series: {
    1: { curveType: "function" },
  },
};

const MultiLineChart = ({ lineData }) => {
  const chartData = lineData?.graph
    ? lineData.graph.map((row, index) => {
        if (Array.isArray(row) && index > 0) {
          return row.map((value) => Number(value));
        }
        return row;
      })
    : [];

  return (
    <div className="container mt-5 overflow-x-scroll sm:overflow-hidden">
      {chartData.length > 0 && (
        <Chart
          width="650px"
          height="350px"
          chartType="LineChart"
          data={chartData}
          options={LineChartOptions}
          rootProps={{ "data-testid": "0" }}
        />
      )}
    </div>
  );
};

export default MultiLineChart;
