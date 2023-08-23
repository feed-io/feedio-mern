import React from "react";
import { Bubble } from "react-chartjs-2";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";

const WordBubbleChart = (props) => {
  const theme = useTheme();

  // Define colors for bubbles
  const colors = ["#014751", "#D2C4FB", "#FF3864", "#0F2830", "#00D37F"];

  // Convert words to bubble chart data format
  const data = {
    datasets: [
      {
        label: "Words",
        data: props.words.map((word, index) => ({
          x: word.text,
          y: 1, // You can set y to any constant value or use another variable
          r: word.value * 10, // Adjust the multiplier to scale the bubble sizes
          backgroundColor: colors[index % colors.length], // Assign color from the colors array
        })),
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        position: "bottom",
      },
      y: {
        display: false, // Hide y-axis as it's not used
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend as it's not used
      },
    },

  };

  return (
    <div>
      <Typography variant="h6" color="textSecondary">
        Word Bubble Chart
      </Typography>
      <Bubble data={data} options={options} />
    </div>
  );
};

export default WordBubbleChart;
