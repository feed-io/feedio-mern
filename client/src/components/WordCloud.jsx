import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import Typography from "@mui/material/Typography";

const WordCloudChart = ({ words }) => {
  const cloudRef = useRef(null);

  useEffect(() => {
    const drawWordCloud = () => {
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const layout = cloud()
        .size([500, 500])
        .words(words.map((d) => ({ text: d.text, size: d.value * 10 })))
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font("Impact")
        .fontSize((d) => d.size)
        .on("end", draw);

      layout.start();

      function draw(words) {
        let svg = d3.select(cloudRef.current).select("svg");
        if (svg.empty()) {
          svg = d3.select(cloudRef.current).append("svg");
        }
        svg
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", `0 0 ${layout.size()[0]} ${layout.size()[1]}`)
          .attr("preserveAspectRatio", "xMinYMin meet");

        let g = svg.select("g");
        if (g.empty()) {
          g = svg.append("g");
        }

        g.attr(
          "transform",
          `translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`
        );

        const text = g.selectAll("text").data(words);

        text
          .enter()
          .append("text")
          .merge(text)
          .style("font-size", (d) => `${d.size}px`)
          .style("font-family", "Impact")
          .style("fill", (d, i) => color(i))
          .attr("text-anchor", "middle")
          .attr(
            "transform",
            (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`
          )
          .text((d) => d.text)
          .on("mouseover", function (d, i) {
            d3.select(this).style("fill", "black");
          })
          .on("mouseout", function (d, i) {
            d3.select(this).style("fill", color(i));
          });

        text.exit().remove();
      }
    };

    drawWordCloud();
  }, [words]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Typography variant="h6" color="textSecondary">
        Word Cloud Chart
      </Typography>
      <div ref={cloudRef}></div>
    </div>
  );
};

export default WordCloudChart;
