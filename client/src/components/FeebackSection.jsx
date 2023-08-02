import React from "react";
import { Box, Grid, Card, CardContent, Container } from "@mui/material";
import ReviewsTable from "../components/ReviewsTable";
import TrendChart from "../components/TrendChart";
import SentimentChart from "../components/SentimentChart";
import RatingDistribution from "../components/RatingDistribution";
import WordCloud from "../components/WordCloud";
const FeedbackSection = ({
  product,
  trendData,
  trendLabels,
  timeGranularity,
  setTimeGranularity,
  words,
  sentimentData,
  handleSpaceCreated,
  userId,
  token,
}) => {
  return (
    <Box py={4}>
      <Container sx={{ width: "100%" }}>
        <Grid container spacing={4}>
          {/* Trend Chart */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card
              sx={{
                borderRadius: 4,
                height: "95%",
                backgroundColor: "#F8F9FA",
              }}>
              <CardContent>
                <TrendChart
                  trendData={trendData}
                  trendLabels={trendLabels}
                  timeGranularity={timeGranularity}
                  setTimeGranularity={setTimeGranularity}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Sentiment Chart */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                borderRadius: 4,
                height: "95%",
                backgroundColor: "#F8F9FA",
              }}>
              <CardContent>
                <SentimentChart sentimentData={sentimentData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Word Cloud */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card
              sx={{
                borderRadius: 4,
                height: "85%",
                backgroundColor: "#F8F9FA",
              }}>
              <CardContent>
                <WordCloud words={words} />
              </CardContent>
            </Card>
          </Grid>

          {/* Rating Distribution */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card
              sx={{
                borderRadius: 4,
                height: "85%",
                width: "65%",
                backgroundColor: "#F8F9FA",
              }}>
              <CardContent>
                <RatingDistribution product={product} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Reviews Table (Outside of the container) */}
      <Grid item xs={12}>
        <CardContent>
          <ReviewsTable
            onSpaceCreated={handleSpaceCreated}
            product={product}
            userId={userId}
            token={token}
          />
        </CardContent>
      </Grid>
    </Box>
  );
};

export default FeedbackSection;
