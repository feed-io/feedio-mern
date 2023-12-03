import React, { useState, useContext, useEffect, lazy, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Snackbar,
  IconButton,
  useTheme,
} from "@mui/material";
import LayoutDashboard from "../components/LayoutDashboard";
import SidebarSection from "../components/SidebarSection";
import FeedbackSection from "../components/FeebackSection";
import { AuthContext } from "../context/auth-context";
import { Close } from "@mui/icons-material";
import LogoSpinner from "../components/spinner/LogoSpinner";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CreateWidgetModal = lazy(() => import("../components/CreateWidgetModal"));
const EditRoomModal = lazy(() => import("../components/EditRoomModal"));
const CollectionFeedbackModal = lazy(() =>
  import("../components/CollectionFeedbackModal")
);

const DashboardPage = () => {
  const { productId } = useParams();
  const auth = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollModalOpen, setIsCollModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDateRange, setCurrentDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [reviews, setReviews] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [wordCounts, setWordCounts] = useState({});
  const [timeGranularity, setTimeGranularity] = useState("monthly");
  const theme = useTheme();

  const categorizeSentiment = (score) => {
    if (score >= 4) {
      return "Positive";
    } else if (score === 3) {
      return "Neutral";
    } else {
      return "Negative";
    }
  };

  const sentimentCounts = useMemo(() => {
    const counts = { Positive: 0, Neutral: 0, Negative: 0 };

    reviews.forEach((review) => {
      const sentiment = categorizeSentiment(review.sentiment);
      counts[sentiment]++;
    });

    return counts;
  }, [reviews]);

  const words = useMemo(() => {
    return Object.keys(wordCounts).map((word) => ({
      text: word,
      value: wordCounts[word],
    }));
  }, [wordCounts]);

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}/products/${productId}/reviews/${product._id}/all`,

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
  }, [auth.userId, auth.token, product, refreshTrigger, productId]);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/api/users/${
            auth.userId
          }/products/${productId}/reviews/trends?granularity=${timeGranularity}&startDate=${currentDateRange.start.toISOString()}&endDate=${currentDateRange.end.toISOString()}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        const data = await response.json();
        setTrendData(data);
      } catch (error) {
        console.log("Error fetching ratings trend data:", error.message);
      }
    };

    fetchTrendData();
  }, [
    auth.token,
    timeGranularity,
    auth.userId,
    productId,
    refreshTrigger,
    currentDateRange,
  ]);

  useEffect(() => {
    async function fetchWordCloud() {
      try {
        const response = await fetch(
          `${SERVER_URL}/api/users/${auth.userId}/products/${productId}/reviews/wordcloud`,
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
  }, [auth.token, refreshTrigger, auth.userId, productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}/products/${productId}`,

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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={theme.palette.success.main}>
        <LogoSpinner />
      </Box>
    );
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
                  timeGranularity={timeGranularity}
                  setTimeGranularity={setTimeGranularity}
                  currentDateRange={currentDateRange}
                  setCurrentDateRange={setCurrentDateRange}
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

export default DashboardPage;
