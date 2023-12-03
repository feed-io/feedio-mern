import React, { Suspense } from "react";
import { Box, Grid, Card, CardContent, Container } from "@mui/material";
import LogoSpinner from "../components/spinner/LogoSpinner";
const ReviewsTable = React.lazy(() => import("../components/ReviewsTable"));
const TrendChart = React.lazy(() => import("../components/TrendChart"));
const NpsScoreDistribution = React.lazy(() =>
  import("../components/NpsScoreDistribution")
);
const SentimentChart = React.lazy(() => import("../components/SentimentChart"));
const RatingDistribution = React.lazy(() =>
  import("../components/RatingDistribution")
);
const WordCloud = React.lazy(() => import("../components/WordCloud"));

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
      <Container maxWidth="xl">
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
                <Suspense fallback={<LogoSpinner />}>
                  <TrendChart
                    trendData={trendData}
                    trendLabels={trendLabels}
                    timeGranularity={timeGranularity}
                    setTimeGranularity={setTimeGranularity}
                  />
                </Suspense>
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
                <Suspense fallback={<LogoSpinner />}>
                  <SentimentChart sentimentData={sentimentData} />
                </Suspense>
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
                <Suspense fallback={<LogoSpinner />}>
                  <WordCloud words={words} />
                </Suspense>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                borderRadius: 4,
                height: "95%",
                backgroundColor: "#FfffFF",
              }}>
              <CardContent style={{ height: "400px" }}>
                <Suspense fallback={<LogoSpinner />}>
                  <NpsScoreDistribution product={product} />
                </Suspense>
              </CardContent>
            </Card>
          </Grid> */}

          {/* Rating Distribution */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                borderRadius: 4,
                height: "95%",
                backgroundColor: "#FfffFF",
              }}>
              <CardContent>
                <Suspense fallback={<LogoSpinner />}>
                  <RatingDistribution product={product} />
                </Suspense>
              </CardContent>
            </Card>
          </Grid>

          {/* Reviews Section */}
          <Grid item xs={12} mt={4}>
            <ReviewsTable
              onSpaceCreated={handleSpaceCreated}
              product={product}
              userId={userId}
              token={token}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default FeedbackSection;
