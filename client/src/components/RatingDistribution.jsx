import React from "react";
import Typography from "@mui/material/Typography";

const RatingDistribution = ({ product }) => {
  const maxRating = Math.max(
    product.ratingDistribution.oneStar,
    product.ratingDistribution.twoStar,
    product.ratingDistribution.threeStar,
    product.ratingDistribution.fourStar,
    product.ratingDistribution.fiveStar
  );

  return (
    <div>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Rating Distribution
      </Typography>
      {[
        {
          label: "5 stars",
          value: product.ratingDistribution.fiveStar,
        },
        {
          label: "4 stars",
          value: product.ratingDistribution.fourStar,
        },
        {
          label: "3 stars",
          value: product.ratingDistribution.threeStar,
        },
        {
          label: "2 stars",
          value: product.ratingDistribution.twoStar,
        },
        {
          label: "1 star",
          value: product.ratingDistribution.oneStar,
        },
      ].map(({ label, value }) => {
        return (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}>
            <Typography style={{ flex: 1 }}>{label}:</Typography>
            <div
              style={{
                backgroundColor: "#FFD700",
                height: "12px",
                flex: value / maxRating,
                marginRight: "8px",
              }}></div>
            <Typography>{value}</Typography>
          </div>
        );
      })}
    </div>
  );
};

export default RatingDistribution;
