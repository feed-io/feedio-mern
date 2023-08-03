import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { Typography, Box } from "@mui/material";

const TrendChart = ({
  trendData,
  trendLabels,
  timeGranularity,
  setTimeGranularity,
}) => {
  const lineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        radius: function (context) {
          var value = context.dataset.data[context.dataIndex];
          return value === 0 ? 5 : 5;
        },
      },
    },
  };

  return (
    <div>
      <Box mb={2}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Ratings Trend Over Time
        </Typography>
        <select
          value={timeGranularity}
          onChange={(e) => setTimeGranularity(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </Box>
      <div style={{ height: "250px" }}>
        <Line
          data={{
            labels: trendLabels,
            datasets: [
              {
                label: "Average Rating",
                data: trendData,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
            ],
          }}
          options={lineChartOptions}
        />
      </div>
    </div>
  );
};

export default TrendChart;