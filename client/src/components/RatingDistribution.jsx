import React from "react";
import { Bar } from "react-chartjs-2";

const RatingDistribution = ({ product }) => {
  const distributionCounts = [
    product.ratingDistribution.oneStar,
    product.ratingDistribution.twoStar,
    product.ratingDistribution.threeStar,
    product.ratingDistribution.fourStar,
    product.ratingDistribution.fiveStar,
  ];

  const data = {
    labels: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
    datasets: [
      {
        data: distributionCounts,
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
      y: {
        min: 0,
        max: Math.max(100, ...distributionCounts),
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        maxWidth: "700px",
        margin: "auto",
      }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RatingDistribution;
