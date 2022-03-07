import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "../../variables/charts";

const BarChart = () => {
  const [chartData, getChartData] = useState<any[]>([]);
  const [chartOptions, getChartOptions] = useState<any>({});

  useEffect(() => {
    getChartData(lineChartData);
    getChartOptions(lineChartOptions);
  }, []);

  return <ReactApexChart options={chartOptions} series={chartData} type="area" width="100%" height="100%" />;
};

export default BarChart;
