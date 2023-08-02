// import React, { useState, useContext, useEffect } from "react";
// import { useParams, Link as RouterLink } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Container,
//   Divider,
//   Snackbar,
//   IconButton,
// } from "@mui/material";
// import ReviewsTable from "../components/ReviewsTable";
// import CreateWidgetModal from "../components/CreateWidgetModal";
// import EditRoomModal from "../components/EditRoomModal";
// import CollectionFeedbackModal from "../components/CollectionFeedbackModal";

// import TrendChart from "../components/TrendChart";
// import SentimentChart from "../components/SentimentChart";
// import RatingDistribution from "../components/RatingDistribution";
// import WordCloud from "../components/WordCloud";

// import { AuthContext } from "../context/auth-context";
// import { Close } from "@mui/icons-material";

// const categorizeSentiment = (score) => {
//   if (score >= 4) {
//     return "Positive";
//   } else if (score === 3) {
//     return "Neutral";
//   } else {
//     return "Negative";
//   }
// };

// const RoomPage = () => {
//   const { productId } = useParams();
//   const auth = useContext(AuthContext);
//   const [product, setProduct] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCollModalOpen, setIsCollModalOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [trendData, setTrendData] = useState([]);
//   const [wordCounts, setWordCounts] = useState({});
//   const [timeGranularity, setTimeGranularity] = useState("monthly");

//   const normalizeTrendData = (granularity, data) => {
//     let normalizedData = [];
//     const currentDate = new Date();

//     if (granularity === "weekly") {
//       const daysOfWeek = [
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//       ];
//       daysOfWeek.forEach((day, index) => {
//         const entry = data.find(
//           (item) => item._id && item._id.dayOfWeek === index + 1
//         );
//         normalizedData.push(entry ? entry.averageRating : 0);
//       });
//     } else if (granularity === "monthly") {
//       for (let i = 1; i <= currentDate.getDate(); i++) {
//         const entry = data.find(
//           (item) => item._id && item._id.dayOfMonth === i
//         );
//         normalizedData.push(entry ? entry.averageRating : 0);
//       }
//     } else if (granularity === "yearly") {
//       const monthsOfYear = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//       ];
//       monthsOfYear.forEach((month, index) => {
//         const entry = data.find(
//           (item) => item._id && item._id.month === index + 1
//         );
//         normalizedData.push(entry ? entry.averageRating : 0);
//       });
//     }

//     return normalizedData;
//   };

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/users/${auth.userId}/products/${productId}/reviews/${product._id}/all`,
//           {
//             headers: {
//               Authorization: "Bearer " + auth.token,
//             },
//           }
//         );

//         setReviews(response.data.reviews);
//       } catch (error) {
//         console.log("Error fetching reviews:", error.message);
//       }
//     };

//     if (product) {
//       fetchReviews();
//     }
//   }, [auth.userId, auth.token, product]);

//   useEffect(() => {
//     async function fetchTrendData() {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/users/${auth.userId}/products/${productId}/reviews/trends?granularity=${timeGranularity}`,
//           {
//             headers: {
//               Authorization: "Bearer " + auth.token,
//             },
//           }
//         );

//         const data = await response.json();

//         const normalizedTrendData = normalizeTrendData(timeGranularity, data);
//         setTrendData(normalizedTrendData);
//       } catch (error) {
//         console.log("Error fetching ratings trend data:", error.message);
//       }
//     }

//     fetchTrendData();
//   }, [auth.token, timeGranularity]);

//   useEffect(() => {
//     async function fetchWordCloud() {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/users/${auth.userId}/products/${productId}/reviews/wordcloud`,
//           {
//             headers: {
//               Authorization: "Bearer " + auth.token,
//             },
//           }
//         );
//         const data = await response.json();

//         setWordCounts(data);
//       } catch (error) {
//         console.log("Error fetching word cloud data:", error.message);
//       }
//     }

//     fetchWordCloud();
//   }, [auth.token]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/users/${auth.userId}/products/${productId}`,
//           {
//             headers: {
//               Authorization: "Bearer " + auth.token,
//             },
//           }
//         );

//         setProduct(response.data.product);
//       } catch (error) {
//         console.log("Error fetching product:", error.message);
//       }
//     };

//     fetchProduct();
//   }, [productId, auth.userId, auth.token, refreshTrigger]);

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }

//   const handleCopyLink = (link) => {
//     navigator.clipboard.writeText(link).then(() => {
//       setSnackbarOpen(true);
//     });
//   };

//   const handleSpaceCreated = () => {
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const openCollectingModal = () => {
//     setIsCollModalOpen(true);
//   };

//   const closeCollectingModal = () => {
//     setIsCollModalOpen(false);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//   };

//   const openEditModal = () => {
//     setIsEditModalOpen(true);
//   };

//   const handleEditRoom = () => {
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   const sentimentCounts = {
//     Positive: reviews.filter(
//       (review) => categorizeSentiment(review.sentiment) === "Positive"
//     ).length,
//     Neutral: reviews.filter(
//       (review) => categorizeSentiment(review.sentiment) === "Neutral"
//     ).length,
//     Negative: reviews.filter(
//       (review) => categorizeSentiment(review.sentiment) === "Negative"
//     ).length,
//   };

//   const words = Object.keys(wordCounts).map((word) => ({
//     text: word,
//     value: wordCounts[word],
//   }));

//   const sentimentData = {
//     labels: ["Positive", "Neutral", "Negative"],
//     datasets: [
//       {
//         data: [
//           sentimentCounts.Positive,
//           sentimentCounts.Neutral,
//           sentimentCounts.Negative,
//         ],
//         backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
//       },
//     ],
//   };

//   let trendLabels = [];

//   let currentDate = new Date();

//   if (timeGranularity === "weekly") {
//     trendLabels = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ];
//   } else if (timeGranularity === "monthly") {
//     const daysInMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     ).getDate();
//     trendLabels = Array.from({ length: daysInMonth }, (_, i) =>
//       (i + 1).toString()
//     );
//   } else if (timeGranularity === "yearly") {
//     trendLabels = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//   }

//   return (
//     <Container>
//       <Box py={4}>
//         {/* AppBar Section */}
//         <Box mb={2}>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             sx={{ py: 2, mt: 4, borderColor: "divider", borderBottom: 1 }}>
//             <Typography variant="h4" component="h1">
//               {product.name} Room
//             </Typography>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={openEditModal}>
//               Edit Room
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               component={RouterLink}
//               to="/dashboard">
//               Back
//             </Button>
//           </Box>

//           <Grid
//             container
//             mt={1}
//             spacing={2}
//             sx={{ justifyContent: "space-around" }}>
//             {/* Buttons Section */}
//             <Grid
//               item
//               xs={6}
//               sm={2}
//               sx={{
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "8px",
//               }}>
//               <Typography variant="h6">Pages</Typography>
//               {[
//                 {
//                   label: "Public Feedback Collection page",
//                   path: `http://localhost:3000/reviewSpace/${productId}`,
//                 },
//                 {
//                   label: "Public Show Room page",
//                   path: `http://localhost:3000/showRoom/${productId}`,
//                 },
//               ].map(({ label, path }, index) => (
//                 <div key={index}>
//                   <Button
//                     fullWidth
//                     component={RouterLink}
//                     to={path}
//                     variant="text"
//                     color="primary"
//                     sx={{
//                       fontSize: { xs: "0.6rem", sm: "0.8rem" },
//                       whiteSpace: { xs: "normal", sm: "nowrap" },
//                       padding: "6px 12px",
//                       textTransform: "none",
//                       textDecoration: "none",
//                       "&:hover": {
//                         textDecoration: "underline",
//                         background: "none",
//                       },
//                     }}>
//                     Go to {label}
//                   </Button>
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleCopyLink(path)}
//                     sx={{ ml: 1 }}>
//                     Copy
//                   </Button>
//                 </div>
//               ))}
//             </Grid>

//             {/* Integrations Section */}
//             <Grid
//               item
//               xs={6}
//               sm={2}
//               sx={{
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "8px",
//               }}>
//               <Typography variant="h6">Integrate</Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 disabled
//                 sx={{
//                   fontSize: { xs: "0.6rem", sm: "0.8rem" },
//                   whiteSpace: { xs: "normal", sm: "nowrap" },
//                   padding: "6px 12px",
//                   textTransform: "none",
//                 }}>
//                 COMING SOON
//               </Button>
//             </Grid>

//             {/* Embeds & Metrics Section */}
//             <Grid
//               item
//               xs={6}
//               sm={2}
//               sx={{
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "8px",
//               }}>
//               <Typography variant="h6">Display</Typography>
//               {[
//                 {
//                   label: "Show Room Widgets",
//                   onClick: openModal,
//                 },
//                 {
//                   label: "Feedback Collection Widget",
//                   onClick: openCollectingModal,
//                 },
//               ].map(({ label, path, onClick }, index) => (
//                 <Button
//                   fullWidth
//                   onClick={onClick}
//                   variant="text"
//                   color="primary"
//                   sx={{
//                     fontSize: { xs: "0.6rem", sm: "0.8rem" },
//                     whiteSpace: { xs: "normal", sm: "nowrap" },
//                     padding: "6px 12px",
//                     textTransform: "none",
//                   }}>
//                   {label}
//                 </Button>
//               ))}
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Feedback Rows Section */}
//         <Box>
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             mt={4}
//             mb={2}>
//             <Typography variant="h4">Feedback</Typography>
//           </Box>
//           <Box mb={8}>
//             <Divider />
//           </Box>
//           <Box mt={8} mb={8}>
//             <TrendChart
//               trendData={trendData}
//               trendLabels={trendLabels}
//               timeGranularity={timeGranularity}
//               setTimeGranularity={setTimeGranularity}
//             />
//             <SentimentChart sentimentData={sentimentData} />
//             <RatingDistribution product={product} />
//             <WordCloud words={words} />

//             <Box mb={16}>
//               <ReviewsTable
//                 onSpaceCreated={handleSpaceCreated}
//                 product={product}
//                 userId={auth.userId}
//                 token={auth.token}
//               />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//       {isModalOpen && (
//         <CreateWidgetModal productId={productId} closeModal={closeModal} />
//       )}
//       {isCollModalOpen && (
//         <CollectionFeedbackModal
//           productId={productId}
//           closeModal={closeCollectingModal}
//         />
//       )}
//       <EditRoomModal
//         isOpen={isEditModalOpen}
//         product={product}
//         closeEditModal={closeEditModal}
//         onRoomUpdated={handleEditRoom}
//       />
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         message="Link copied to clipboard!"
//         action={
//           <IconButton
//             size="small"
//             color="inherit"
//             onClick={() => setSnackbarOpen(false)}>
//             <Close fontSize="small" />
//           </IconButton>
//         }
//       />
//     </Container>
//   );
// };

// export default RoomPage;

import React, { useState, useContext, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Container,
  Snackbar,
  IconButton,
  Grid,
  Menu,
} from "@mui/material";

import CreateWidgetModal from "../components/CreateWidgetModal";
import EditRoomModal from "../components/EditRoomModal";
import CollectionFeedbackModal from "../components/CollectionFeedbackModal";
import SidebarSection from "../components/SidebarSection";
import FeedbackSection from "../components/FeebackSection";
import { AuthContext } from "../context/auth-context";
import { Close } from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";

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
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
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
      <Box pt={0}>
        <Grid container spacing={0}>
          {/* Sidebar Section */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              position: "relative",
              borderRight: { xs: "none", md: "1px solid #e0e0e0" },
              // backgroundColor: { xs: "transparent", md: "#F8F9FA" },
              display: "flex",
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: "center",
            }}>
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
          <Grid item xs={12} md={9} sx={{ backgroundColor: "#F8F9FA" }}>
            {/* <Box mb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  py: 2,
                  borderBottom: "1px solid #e0e0e0",
                }}>
                <Typography variant="h7" component="h1" alignItems={"center "}>
                  Feedback Dashboard
                </Typography>
              </Box>
            </Box> */}
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
      </Box>

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
    </>
  );
};

export default RoomPage;
