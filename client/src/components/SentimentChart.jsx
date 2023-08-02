import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";

const SentimentChart = ({ sentimentData }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Sentiment Distribution
      </Typography>
      <Doughnut data={sentimentData} options={chartOptions} />
    </div>
  );
};

export default SentimentChart;
