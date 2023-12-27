import React from "react";
import { Line } from "react-chartjs-2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const TrendChart = ({
  trendData,
  timeGranularity,
  onPreviousMonth,
  onNextMonth,
  currentMonth,
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

  const roundRating = (rating) => {
    return rating !== null ? Math.round(rating) : null;
  };

  const averageRatings = trendData.map((item) =>
    roundRating(item.averageRating)
  );
  const highestRatings = trendData.map((item) =>
    roundRating(item.highestRating)
  );
  const lowestRatings = trendData.map((item) => roundRating(item.lowestRating));

  const generateTrendLabels = (granularity) => {
    switch (granularity) {
      case "monthly":
        return Array.from({ length: 31 }, (_, i) => `${i + 1}`);

      default:
        return [];
    }
  };

  const labels = generateTrendLabels(timeGranularity);

  const fillMissingData = (data, defaultValue = 0) => {
    return data.map((value) => (value !== null ? value : defaultValue));
  };

  const filledAverageRatings = fillMissingData(averageRatings);
  const filledHighestRatings = fillMissingData(highestRatings);
  const filledLowestRatings = fillMissingData(lowestRatings);

  const ensureLength = (data, length) => {
    while (data.length < length) {
      data.push(0);
    }
    return data.slice(0, length);
  };

  const adjustedAverageRatings = ensureLength(
    filledAverageRatings,
    labels.length
  );
  const adjustedHighestRatings = ensureLength(
    filledHighestRatings,
    labels.length
  );
  const adjustedLowestRatings = ensureLength(
    filledLowestRatings,
    labels.length
  );

  const datasets = [
    {
      label: "Average Rating",
      data: adjustedAverageRatings,
      fill: false,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
  ];

  const hasDifferentHighestFromAverage = trendData.some(
    (item) => item.highestRating !== item.averageRating
  );

  const hasDifferentLowestFromHighest = trendData.some(
    (item) => item.lowestRating !== item.highestRating
  );

  if (hasDifferentHighestFromAverage) {
    datasets.push({
      label: "Highest Rating",
      data: adjustedHighestRatings,
      fill: false,
      backgroundColor: "rgba(0,123,255,0.4)",
      borderColor: "rgba(0,123,255,1)",
      borderWidth: 1,
    });
  }

  if (hasDifferentLowestFromHighest) {
    datasets.push({
      label: "Lowest Rating",
      data: adjustedLowestRatings,
      fill: false,
      backgroundColor: "rgba(255,99,132,0.4)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <IconButton onClick={onPreviousMonth}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" style={{ margin: "0 10px" }}>
          {currentMonth.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={onNextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <div style={{ height: "250px", width: "100%" }}>
        <Line
          data={{
            labels: labels,
            datasets: datasets,
          }}
          options={lineChartOptions}
        />
      </div>
    </div>
  );
};

export default TrendChart;
