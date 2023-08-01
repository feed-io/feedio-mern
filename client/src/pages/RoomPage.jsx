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
  Divider,
  Card,
  CardContent,
  Snackbar,
  IconButton,
} from "@mui/material";
import ReviewsTable from "../components/ReviewsTable";
import CreateWidgetModal from "../components/CreateWidgetModal";
import EditRoomModal from "../components/EditRoomModal";
import CollectionFeedbackModal from "../components/CollectionFeedbackModal";
import { AuthContext } from "../context/auth-context";
import { Close } from "@mui/icons-material";

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
  const [isCollModalOpen, setIsCollModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [wordCounts, setWordCounts] = useState({});
  const [timeGranularity, setTimeGranularity] = useState("monthly");

  const normalizeTrendData = (granularity, data) => {
    let normalizedData = [];
    const currentDate = new Date();

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
        const entry = data.find(
          (item) => item._id && item._id.dayOfWeek === index + 1
        );
        normalizedData.push(entry ? entry.averageRating : 0);
      });
    } else if (granularity === "monthly") {
      for (let i = 1; i <= currentDate.getDate(); i++) {
        const entry = data.find(
          (item) => item._id && item._id.dayOfMonth === i
        );
        normalizedData.push(entry ? entry.averageRating : 0);
      }
    } else if (granularity === "yearly") {
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
      monthsOfYear.forEach((month, index) => {
        const entry = data.find(
          (item) => item._id && item._id.month === index + 1
        );
        normalizedData.push(entry ? entry.averageRating : 0);
      });
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

  const maxRating = Math.max(
    product.ratingDistribution.oneStar,
    product.ratingDistribution.twoStar,
    product.ratingDistribution.threeStar,
    product.ratingDistribution.fourStar,
    product.ratingDistribution.fiveStar
  );

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openCollectingModal = () => {
    setIsCollModalOpen(true);
  };

  const closeCollectingModal = () => {
    setIsCollModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditRoom = () => {
    setRefreshTrigger((prev) => prev + 1);
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

  if (timeGranularity === "weekly") {
    trendLabels = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
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
    trendLabels = [
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
              {product.name} Room
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={openEditModal}>
              Edit Room
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/dashboard">
              Go back
            </Button>
          </Box>

          <Grid
            container
            mt={1}
            spacing={2}
            sx={{ justifyContent: "space-around" }}>
            {/* Buttons Section */}
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
              <Typography variant="h6">Pages</Typography>
              {[
                {
                  label: "Public Feedback Collection page",
                  path: `http://localhost:3000/reviewSpace/${productId}`,
                },
                {
                  label: "Public Show Room page",
                  path: `http://localhost:3000/showRoom/${productId}`,
                },
              ].map(({ label, path }, index) => (
                <div key={index}>
                  <Button
                    fullWidth
                    component={RouterLink}
                    to={path}
                    variant="text"
                    color="primary"
                    sx={{
                      fontSize: { xs: "0.6rem", sm: "0.8rem" },
                      whiteSpace: { xs: "normal", sm: "nowrap" },
                      padding: "6px 12px",
                      textTransform: "none",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                        background: "none",
                      },
                    }}>
                    Go to {label}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleCopyLink(path)}
                    sx={{ ml: 1 }}>
                    Copy
                  </Button>
                </div>
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
              <Typography variant="h6">Display</Typography>
              {[
                {
                  label: "Show Room Widgets",
                  onClick: openModal,
                },
                {
                  label: "Feedback Collection Widget",
                  onClick: openCollectingModal,
                },
              ].map(({ label, path, onClick }, index) => (
                <Button
                  fullWidth
                  onClick={onClick}
                  variant="text"
                  color="primary"
                  sx={{
                    fontSize: { xs: "0.6rem", sm: "0.8rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    padding: "6px 12px",
                    textTransform: "none",
                  }}>
                  {label}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Box>

        {/* Feedback Rows Section */}
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
            mb={2}>
            <Typography variant="h4">Feedback</Typography>
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
                    paddingBottom: 8,
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
              <ReviewsTable
                onSpaceCreated={handleSpaceCreated}
                product={product}
                userId={auth.userId}
                token={auth.token}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {isModalOpen && (
        <CreateWidgetModal productId={productId} closeModal={closeModal} />
      )}
      {isCollModalOpen && (
        <CollectionFeedbackModal
          productId={productId}
          closeModal={closeCollectingModal}
        />
      )}
      <EditRoomModal
        isOpen={isEditModalOpen}
        product={product}
        closeEditModal={closeEditModal}
        onRoomUpdated={handleEditRoom}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
      ;
    </Container>
  );
};

export default RoomPage;
