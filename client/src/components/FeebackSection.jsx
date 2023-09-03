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
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 4,
                height: "95%",
                backgroundColor: "#FfffFF",
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
                backgroundColor: "#FfffFF",
              }}>
              <CardContent>
                <SentimentChart sentimentData={sentimentData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Word Cloud */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                borderRadius: 4,
                height: "95%",
                backgroundColor: "#FfffFF",
              }}>
              <CardContent style={{ height: "400px" }}>
                <WordCloud words={words} />
              </CardContent>
            </Card>
          </Grid>

          {/* Rating Distribution */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                borderRadius: 4,
                height: "95%",
                backgroundColor: "#FfffFF",
              }}>
              <CardContent>
                <RatingDistribution product={product} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          paddingBottom={24}
          height="100%"
          mt={4}>
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
      </Container>
    </Box>
  );
};

export default FeedbackSection;
