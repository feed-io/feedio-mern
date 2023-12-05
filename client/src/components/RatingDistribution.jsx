import React from "react";
import Typography from "@mui/material/Typography";
import { Bar } from "react-chartjs-2";

const RatingDistribution = ({ product }) => {
  const data = {
    labels: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
    datasets: [
      {
        data: [
          product.ratingDistribution.oneStar,
          product.ratingDistribution.twoStar,
          product.ratingDistribution.threeStar,
          product.ratingDistribution.fourStar,
          product.ratingDistribution.fiveStar,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      // y: {
      //   beginAtZero: true,
      // },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Typography variant="h6" color="textSecondary" mb={8} gutterBottom>
        Rating Distribution
      </Typography>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RatingDistribution;
