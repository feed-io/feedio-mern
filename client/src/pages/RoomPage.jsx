import React, { useState, useContext, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  SvgIcon,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { Star } from "@mui/icons-material";

import ReviewRows from "../components/ReviewRows";
import CreateWidgetModal from "../components/CreateWidgetModal";
import { AuthContext } from "../context/auth-context";

const categorizeSentiment = (score) => {
  if (score >= 4) {
    return "Positive";
  } else if (score === 3) {
    return "Neutral";
  } else {
    return "Negative";
  }
};

const RoomPage = () => {
  const { productId } = useParams();
  const auth = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [wordCounts, setWordCounts] = useState({});
  const [timeGranularity, setTimeGranularity] = useState("monthly");

  const WallOfLoveIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </SvgIcon>
  );

  const SingleTestimonialIcon = () => (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </SvgIcon>
  );

  const CollectingWidgetIcon = () => (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
    </SvgIcon>
  );

  const normalizeTrendData = (granularity, data) => {
    let normalizedData = [];

    if (granularity === "weekly") {
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      daysOfWeek.forEach((day, index) => {
        const entry = data.find((item) => item._id.week === index + 1);
        normalizedData.push(entry ? entry.averageRating : 0);
      });
    } else if (granularity === "monthly") {
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const entry = data.find((item) => item._id.month === i);
        normalizedData.push(entry ? entry.averageRating : 0);
      }
    } else if (granularity === "yearly") {
      for (let i = 1; i <= 12; i++) {
        const entry = data.find((item) => item._id.month === i);
        normalizedData.push(entry ? entry.averageRating : 0);
      }
    }

    return normalizedData;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}/products/${productId}/reviews/${product._id}/all`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setReviews(response.data.reviews);
      } catch (error) {
        console.log("Error fetching reviews:", error.message);
      }
    };

    if (product) {
      fetchReviews();
    }
  }, [auth.userId, auth.token, product]);

  useEffect(() => {
    async function fetchTrendData() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${auth.userId}/products/${productId}/reviews/trends?granularity=${timeGranularity}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        const data = await response.json();

        const normalizedTrendData = normalizeTrendData(timeGranularity, data);
        setTrendData(normalizedTrendData);
      } catch (error) {
        console.log("Error fetching ratings trend data:", error.message);
      }
    }

    fetchTrendData();
  }, [auth.token, timeGranularity]);

  useEffect(() => {
    async function fetchWordCloud() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${auth.userId}/products/${productId}/reviews/wordcloud`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const data = await response.json();

        setWordCounts(data);
      } catch (error) {
        console.log("Error fetching word cloud data:", error.message);
      }
    }

    fetchWordCloud();
  }, [auth.token]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}/products/${productId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setProduct(response.data.product);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId, auth.userId, auth.token, refreshTrigger]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const ReviewContainer = (props) => {
    return (
      <Box
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
          padding: "16px",
        }}>
        {props.children}
      </Box>
    );
  };

  const maxRating = Math.max(
    product.ratingDistribution.oneStar,
    product.ratingDistribution.twoStar,
    product.ratingDistribution.threeStar,
    product.ratingDistribution.fourStar,
    product.ratingDistribution.fiveStar
  );

  let cardBackgroundColor;

  if (product.reviews && product.reviews.length > 0) {
    if (product.averageRating > 40) {
      cardBackgroundColor = "rgba(119, 221, 119, 0.5)";
    } else if (product.averageRating <= 40 && product.averageRating > 20) {
      cardBackgroundColor = "rgba(255, 179, 71, 0.5)";
    } else {
      cardBackgroundColor = "rgba(255, 105, 97, 0.5)";
    }
  } else {
    cardBackgroundColor = "#f5f5f5";
  }

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sentimentCounts = {
    Positive: reviews.filter(
      (review) => categorizeSentiment(review.sentiment) === "Positive"
    ).length,
    Neutral: reviews.filter(
      (review) => categorizeSentiment(review.sentiment) === "Neutral"
    ).length,
    Negative: reviews.filter(
      (review) => categorizeSentiment(review.sentiment) === "Negative"
    ).length,
  };

  const words = Object.keys(wordCounts).map((word) => ({
    text: word,
    value: wordCounts[word],
  }));

  const sentimentData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [
          sentimentCounts.Positive,
          sentimentCounts.Neutral,
          sentimentCounts.Negative,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

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
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  let trendLabels = [];

  let currentDate = new Date();
  let currentDay = currentDate.getDay(); // This will return a number between 0 (Sunday) and 6 (Saturday).
  let currentMonth = currentDate.getMonth(); // This will return a number between 0 (January) and 11 (December).

  if (timeGranularity === "weekly") {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    trendLabels = daysOfWeek.slice(0, currentDay === 0 ? 7 : currentDay);
  } else if (timeGranularity === "monthly") {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    trendLabels = Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString()
    );
  } else if (timeGranularity === "yearly") {
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    trendLabels = monthsOfYear.slice(0, currentMonth + 1);
  }

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

  return (
    <Container>
      <Box py={4}>
        {/* AppBar Section */}
        <Box mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 2, mt: 4, borderColor: "divider", borderBottom: 1 }}>
            <Typography variant="h4" component="h1">
              {product.name}
            </Typography>
            <Button variant="contained" color="secondary">
              Edit space
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/dashboard">
              Go to Dashboard
            </Button>
          </Box>

          <Grid
            container
            mt={1}
            spacing={2}
            sx={{ justifyContent: "space-around" }}>
            {/* Links Section */}
            <Grid
              item
              xs={6}
              sm={2}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}>
              <Typography variant="h6">Go to</Typography>
              {[
                {
                  icon: <Star />,
                  label: "Public landing page",
                  path: `http://localhost:3000/reviewSpace/${productId}`,
                },
                {
                  icon: <Star />,
                  label: "Show Room page",
                  path: `http://localhost:3000/showRoom/${productId}`,
                },
              ].map(({ icon, label, path }, index) => (
                <Button
                  fullWidth
                  startIcon={icon}
                  href={path}
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: { xs: "0.6rem", sm: "0.8rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    padding: "6px 12px",
                    textTransform: "none",
                    // fontWeight: "lighter",
                  }}>
                  {label}
                </Button>
              ))}
            </Grid>

            {/* Integrations Section */}
            <Grid
              item
              xs={6}
              sm={2}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}>
              <Typography variant="h6">Integrate</Typography>
              <Button
                fullWidth
                variant="contained"
                disabled
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.8rem" },
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  padding: "6px 12px",
                  textTransform: "none",
                  // fontWeight: "lighter",
                }}>
                COMING SOON
              </Button>
            </Grid>

            {/* Embeds & Metrics Section */}
            <Grid
              item
              xs={6}
              sm={2}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}>
              <Typography variant="h6">Share</Typography>
              {[
                {
                  icon: <WallOfLoveIcon />,
                  label: "Show Room",
                  onClick: openModal,
                },
                {
                  icon: <SingleTestimonialIcon />,
                  label: "Single review",
                  path: "",
                },
                {
                  icon: <CollectingWidgetIcon />,
                  label: "Colleting widget",
                  path: "",
                },
              ].map(({ icon, label, path, onClick }, index) => (
                <Button
                  fullWidth
                  onClick={onClick}
                  startIcon={icon}
                  href={path}
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: { xs: "0.6rem", sm: "0.8rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    padding: "6px 12px",
                    textTransform: "none",
                    // fontWeight: "lighter",
                  }}>
                  {label}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Box>

        {/* Review Rows Section */}
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
            mb={2}>
            <Typography variant="h4">Reviews</Typography>
          </Box>
          <Box mb={8}>
            <Divider />
          </Box>
          <Box mt={8} mb={8}>
            <Grid container spacing={3} pb={8}>
              {/* Trend Chart */}
              <Grid item xs={12}>
                <Card
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  }}>
                  <CardContent
                    style={{ maxHeight: "300px", overflow: "hidden" }}>
                    <Box mb={2}>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        gutterBottom>
                        Ratings Trend Over Time
                      </Typography>
                      <select
                        value={timeGranularity}
                        onChange={(e) => setTimeGranularity(e.target.value)}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </Box>
                    <div style={{ height: "250px" }}>
                      <Line
                        data={{
                          labels: trendLabels,
                          datasets: [
                            {
                              label: "Average Rating",
                              data: trendData,
                              fill: false,
                              backgroundColor: "rgba(75,192,192,0.4)",
                              borderColor: "rgba(75,192,192,1)",
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={lineChartOptions}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Sentiment Chart */}
              <Grid item xs={12} sm={4}>
                <Card
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  }}>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      Sentiment Distribution
                    </Typography>
                    <Doughnut data={sentimentData} options={chartOptions} />
                  </CardContent>
                </Card>
              </Grid>
              {/* Distribution Card */}
              <Grid item xs={12} sm={4}>
                <Card
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  }}>
                  <CardContent>
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
                  </CardContent>
                </Card>
              </Grid>

              {/* Word Cloud */}
              <Grid item xs={12} sm={4}>
                <Card
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  }}>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      Word Cloud
                    </Typography>
                    <ReactWordcloud options={options} words={words} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box mb={16}>
              <ReviewContainer>
                <ReviewRows
                  onSpaceCreated={handleSpaceCreated}
                  product={product}
                  userId={auth.userId}
                  token={auth.token}
                />
              </ReviewContainer>
            </Box>
          </Box>
        </Box>
      </Box>
      {isModalOpen && (
        <CreateWidgetModal productId={productId} closeModal={closeModal} />
      )}
    </Container>
  );
};

export default RoomPage;
