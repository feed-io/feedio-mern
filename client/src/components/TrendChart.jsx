import { Line } from "react-chartjs-2";
import { Typography, Box } from "@mui/material";

const TrendChart = ({
  trendData,
  trendLabels,
  timeGranularity,
  setTimeGranularity,
}) => {
  console.log(trendData, trendLabels, timeGranularity);

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

  const roundToOneDecimal = (data) => {
    return data.map((value) =>
      value !== null ? parseFloat(value.toFixed(1)) : null
    );
  };

  const fillDataToCurrentDay = (data, granularity) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

    if (granularity === "daily") {
      return data.map((value, index) => {
        if (index <= currentDay - 1) {
          return value !== null ? value : 0;
        }
        return value;
      });
    } else if (granularity === "weekly") {
      return data.map((value, index) => {
        if (index <= currentDayOfWeek) {
          return value !== null ? value : 0;
        }
        return value;
      });
    } else if (granularity === "monthly") {
      return data.map((value, index) => {
        if (index <= currentMonth - 1) {
          return value !== null ? value : 0;
        }
        return value;
      });
    } else if (granularity === "quarterly") {
      const currentQuarter = Math.ceil(currentMonth / 3);
      return data.map((value, index) => {
        if (index <= currentQuarter - 1) {
          return value !== null ? value : 0;
        }
        return value;
      });
    }
    return data;
  };

  const roundedAverage = fillDataToCurrentDay(
    roundToOneDecimal(trendData.average),
    timeGranularity
  );
  const roundedHighest = fillDataToCurrentDay(
    roundToOneDecimal(trendData.highest),
    timeGranularity
  );
  const roundedLowest = fillDataToCurrentDay(
    roundToOneDecimal(trendData.lowest),
    timeGranularity
  );

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
            labels: trendLabels,
            datasets: [
              {
                label: "Average Rating",
                data: roundedAverage,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
              {
                label: "Highest Rating",
                data: roundedHighest,
                fill: false,
                backgroundColor: "rgba(0,123,255,0.4)",
                borderColor: "rgba(0,123,255,1)",
                borderWidth: 1,
              },
              {
                label: "Lowest Rating",
                data: roundedLowest,
                fill: false,
                backgroundColor: "rgba(255,99,132,0.4)",
                borderColor: "rgba(255,99,132,1)",
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
