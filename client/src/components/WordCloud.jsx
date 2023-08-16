import React from "react";
import Typography from "@mui/material/Typography";
import ReactWordcloud from "react-wordcloud";
import { useTheme } from "@mui/material";

const WordCloud = (props) => {
  const theme = useTheme();

  const options = {
    colors: ["#014751", "#D2C4FB", "#FF3864", "#0F2830", "#00D37F"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: theme.typography.fontFamily.h5,
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 1,
    rotationAngles: [0],
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
