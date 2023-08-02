import React from "react";
import Typography from "@mui/material/Typography";
import ReactWordcloud from "react-wordcloud";

const WordCloud = (props) => {
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90, 360],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 2000,
  };

  return (
    <div>
      <Typography variant="h6" color="textSecondary">
        Word Cloud
      </Typography>
      <ReactWordcloud options={options} words={props.words} />
    </div>
  );
};

export default WordCloud;
