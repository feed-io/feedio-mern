import { Line } from "react-chartjs-2";
import { Typography, Box } from "@mui/material";

const TrendChart = ({ trendData, timeGranularity, setTimeGranularity }) => {
  console.log(trendData, timeGranularity);

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

  const handleGranularityChange = (e) => {
    setTimeGranularity(e.target.value);
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
      case "daily":
        return Array.from({ length: 24 }, (_, i) => `${i}:00`);
      case "weekly":
        return [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
      case "monthly":
        return Array.from({ length: 31 }, (_, i) => `${i + 1}`);
      case "quarterly":
        return ["Q1", "Q2", "Q3", "Q4"];
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
      data.push(0); // or any default value you want
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
    <div>
      <Box mb={2}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Ratings Trend Over Time
        </Typography>
        <select value={timeGranularity} onChange={handleGranularityChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </Box>
      <div style={{ height: "250px" }}>
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
