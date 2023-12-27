import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const SentimentChart = ({ sentimentData }) => {
  const modifiedSentimentData = {
    ...sentimentData,
    datasets: sentimentData.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: ["#00D37F", "#D2C4FB", "#FF3864"],
      hoverBackgroundColor: ["#00B36B", "#B1A2E3", "#FF165D"],
    })),
  };

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <Doughnut data={modifiedSentimentData} options={chartOptions} />
    </div>
  );
};

export default SentimentChart;
