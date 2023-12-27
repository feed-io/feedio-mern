import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordCloudChart = ({ words }) => {
  const cloudRef = useRef(null);

  const getSentimentLabel = (value) => {
    if (value < 0) return "Negative";
    if (value === 0) return "Neutral";
    return "Positive";
  };

  useEffect(() => {
    const drawWordCloud = () => {
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const cloudWidth = 669.6;
      const cloudHeight = 400;

      const mappedWords = words.map((d) => ({
        text: d.text,
        size: d.value + 10,
        originalSize: d.value + 10,
        sentiment: getSentimentLabel(d.value),
      }));

      const layout = cloud()
        .size([cloudWidth, cloudHeight])
        .words(mappedWords)
        .padding(2)
        .rotate(0)
        .spiral("archimedean")
        .font("Times New Roman")
        .fontSize((d) => d.size)
        .on("end", draw);

      layout.start();

      function draw(words) {
        let svg = d3.select(cloudRef.current).select("svg");
        if (svg.empty()) {
          svg = d3.select(cloudRef.current).append("svg");
        }
        svg
          .attr("width", cloudWidth)
          .attr("height", cloudHeight)
          .style("display", "block");

        let g = svg.select("g");
        if (g.empty()) {
          g = svg.append("g");
        }

        g.attr("transform", `translate(${cloudWidth / 2}, ${cloudHeight / 2})`);

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
            (d) => `translate(${[d.x, d.y]}) rotate(${d.rotate})`
          )
          .text((d) => d.text)
          .on("mouseover", function (event, d) {
            d3.select(this)
              .style("font-size", `${d.originalSize + 20}px`)
              .style("cursor", "pointer")
              .attr("title", `Sentiment: ${d.sentiment}`);
          })
          .on("mouseout", function (event, d) {
            d3.select(this)
              .style("font-size", `${d.originalSize}px`)
              .style("cursor", "default");
          });

        text.exit().remove();
      }
    };

    drawWordCloud();
  }, [words]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div ref={cloudRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default WordCloudChart;
