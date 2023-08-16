import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Snackbar,
  IconButton,
  useTheme,
} from "@mui/material";
import LayoutDashboard from "../components/LayoutDashboard";
import SidebarSection from "../components/SidebarSection";
import FeedbackSection from "../components/FeebackSection";
import CreateWidgetModal from "../components/CreateWidgetModal";
import EditRoomModal from "../components/EditRoomModal";
import CollectionFeedbackModal from "../components/CollectionFeedbackModal";
import { AuthContext } from "../context/auth-context";
import { Close } from "@mui/icons-material";
import axios from "axios";

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
  const theme = useTheme();

  const normalizeTrendData = (granularity, data) => {
    let normalizedData = {
      average: [],
      highest: [],
      lowest: [],
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    function getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

      const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      return weekNo;
    }

    const currentWeek = getWeekNumber(new Date());

    const pushData = (entry) => {
      if (entry) {
        normalizedData.average.push(entry.averageRating);
        normalizedData.highest.push(entry.highestRating);
        normalizedData.lowest.push(entry.lowestRating);
      } else {
        normalizedData.average.push(null);
        normalizedData.highest.push(null);
        normalizedData.lowest.push(null);
      }
    };

    if (granularity === "daily") {
      for (let i = 1; i <= currentDay; i++) {
        const entry = data.find(
          (item) =>
            item &&
            item._id &&
            item._id.dayOfMonth === i &&
            item._id.month === currentMonth &&
            item._id.year === currentYear
        );
        pushData(entry);
      }
    } else if (granularity === "weekly") {
      // Create an array for the entire week
      const weeklyData = [null, null, null, null, null, null, null];

      // Map the data based on the dayOfWeek property
      data.forEach((entry) => {
        if (
          entry &&
          entry._id &&
          entry._id.week === currentWeek &&
          entry._id.year === currentYear
        ) {
          // Adjust the index since dayOfWeek starts from 1 (Monday) and array index starts from 0
          weeklyData[entry._id.dayOfWeek - 1] = entry;
        }
      });

      weeklyData.forEach((entry) => pushData(entry));
    } else if (granularity === "monthly") {
      for (let i = 1; i <= 12; i++) {
        const entry = data.find(
          (item) =>
            item &&
            item._id &&
            item._id.month === i &&
            item._id.year === currentYear
        );
        pushData(entry);
      }
    } else if (granularity === "quarterly") {
      for (let i = 1; i <= 4; i++) {
        const entry = data.find(
          (item) =>
            item &&
            item._id &&
            item._id.quarter === i &&
            item._id.year === currentYear
        );
        pushData(entry);
      }
    }
    console.log("n", normalizedData);
    return normalizedData;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://feedio-server.onrender.com/api/users/${auth.userId}/products/${productId}/reviews/${product._id}/all`,
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
    const fetchTrendData = async () => {
      try {
        const response = await fetch(
          `https://feedio-server.onrender.com/api/users/${auth.userId}/products/${productId}/reviews/trends?granularity=${timeGranularity}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        const data = await response.json();
        console.log("trendData", data);
        const normalizedTrendData = normalizeTrendData(timeGranularity, data);
        setTrendData(normalizedTrendData);
      } catch (error) {
        console.log("Error fetching ratings trend data:", error.message);
      }
    };

    fetchTrendData();
  }, [auth.token, timeGranularity, auth.userId, productId]);

  useEffect(() => {
    async function fetchWordCloud() {
      try {
        const response = await fetch(
          `https://feedio-server.onrender.com/api/users/${auth.userId}/products/${productId}/reviews/wordcloud`,
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
          `https://feedio-server.onrender.com/api/users/${auth.userId}/products/${productId}`,
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

  const categorizeSentiment = (score) => {
    if (score >= 4) {
      return "Positive";
    } else if (score === 3) {
      return "Neutral";
    } else {
      return "Negative";
    }
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
      },
    ],
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

  return (
    <>
      <LayoutDashboard>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pb: 4,
            bgcolor: theme.palette.primary.contrastText,
          }}>
          <Container maxWidth="xxl">
            <Grid container>
              {/* Sidebar Section */}
              <Grid item xs={12} md={2} lg={1}>
                <SidebarSection
                  productId={productId}
                  handleCopyLink={handleCopyLink}
                  openModal={openModal}
                  openCollectingModal={openCollectingModal}
                  openEditModal={openEditModal}
                  productName={product.name}
                />
              </Grid>

              {/* Feedback Section */}
              <Grid item xs={12} md={10}>
                <FeedbackSection
                  product={product}
                  reviews={reviews}
                  trendData={trendData}
                  trendLabels={trendLabels}
                  timeGranularity={timeGranularity}
                  setTimeGranularity={setTimeGranularity}
                  words={words}
                  sentimentData={sentimentData}
                  handleSpaceCreated={handleSpaceCreated}
                  userId={auth.userId}
                  token={auth.token}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          {/* Modals and Snackbar */}
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
        </Box>
      </LayoutDashboard>
    </>
  );
};

export default RoomPage;
