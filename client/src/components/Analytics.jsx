// import React, { useState, useEffect } from "react";
// import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
// import { Doughnut } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";
// import ReactWordcloud from "react-wordcloud";
// import axios from "axios";

// const Analytics = (props) => {
//   const [reviews, setReviews] = useState([]);
//   const [trendData, setTrendData] = useState([]);
//   const [wordCounts, setWordCounts] = useState({});
//   const [product, setProduct] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   console.log(props);
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/users/${props.auth.userId}/products/${props.productId}`,
//           {
//             headers: {
//               Authorization: "Bearer " + props.auth.userId,
//             },
//           }
//         );

//         setProduct(response.data.product);
//       } catch (error) {
//         console.log("Error fetching product:", error.message);
//       }
//     };

//     fetchProduct();
//   }, [props.productId, props.auth.userId, refreshTrigger]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/users/${props.auth.userId}/products/${props.productId}/reviews/${props.productId}/all`,
//           {
//             headers: {
//               Authorization: "Bearer " + props.auth.userId,
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
//   }, [props.auth.userId, product]);

//   useEffect(() => {
//     async function fetchTrendData() {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/users/${props.auth.userId}/products/${props.productId}/reviews/trends/monthly`,
//           {
//             headers: {
//               Authorization: "Bearer " + props.auth.userId,
//             },
//           }
//         );
//         console.log(response);
//         const data = await response.json();
//         setTrendData(data);
//       } catch (error) {
//         console.log("Error fetching ratings trend data:", error.message);
//       }
//     }

//     fetchTrendData();
//   }, [props.auth.userId]);

//   useEffect(() => {
//     async function fetchWordCloud() {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/users/${props.auth.userId}/products/${props.productId}/reviews/wordcloud`,
//           {
//             headers: {
//               Authorization: "Bearer " + props.auth.userId,
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
//   }, [props.auth.userId]);

//   const maxRating = Math.max(
//     product.ratingDistribution.oneStar,
//     product.ratingDistribution.twoStar,
//     product.ratingDistribution.threeStar,
//     product.ratingDistribution.fourStar,
//     product.ratingDistribution.fiveStar
//   );

//   let cardBackgroundColor;

//   if (product.reviews && product.reviews.length > 0) {
//     if (product.averageRating > 40) {
//       cardBackgroundColor = "rgba(119, 221, 119, 0.5)";
//     } else if (product.averageRating <= 40 && product.averageRating > 20) {
//       cardBackgroundColor = "rgba(255, 179, 71, 0.5)";
//     } else {
//       cardBackgroundColor = "rgba(255, 105, 97, 0.5)";
//     }
//   } else {
//     cardBackgroundColor = "#f5f5f5";
//   }

//   const categorizeSentiment = (score) => {
//     if (score > 0.6) {
//       return "Positive";
//     } else if (score >= 0.4 && score <= 0.6) {
//       return "Neutral";
//     } else {
//       return "Negative";
//     }
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

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Sentiment Distribution",
//       },
//     },
//   };

//   const options = {
//     colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
//     enableTooltip: true,
//     deterministic: false,
//     fontFamily: "impact",
//     fontSizes: [5, 60],
//     fontStyle: "normal",
//     fontWeight: "normal",
//     padding: 1,
//     rotations: 3,
//     rotationAngles: [0, 90],
//     scale: "sqrt",
//     spiral: "archimedean",
//     transitionDuration: 1000,
//   };

//   const trendLabels = trendData.map(
//     (entry) => `${entry._id.month}/${entry._id.year}`
//   );
//   const trendDataset = trendData.map((entry) => entry.averageRating);

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box mt={8} mb={8}>
//       <Grid container spacing={3}>
//         {/* Trend Chart */}
//         <Grid item xs={12}>
//           <Card
//             style={{
//               backgroundColor: "#f5f5f5",
//               borderRadius: "8px",
//               boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
//             }}>
//             <CardContent>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Ratings Trend Over Time
//               </Typography>
//               <Line
//                 data={{
//                   labels: trendLabels,
//                   datasets: [
//                     {
//                       label: "Average Rating",
//                       data: trendDataset,
//                       fill: false,
//                       backgroundColor: "rgba(75,192,192,0.4)",
//                       borderColor: "rgba(75,192,192,1)",
//                       borderWidth: 1,
//                     },
//                   ],
//                 }}
//                 options={{ maintainAspectRatio: true }}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Average Rating Card */}
//         <Grid item xs={12} sm={4}>
//           <Card
//             style={{
//               backgroundColor: cardBackgroundColor,
//               borderRadius: "8px",
//               boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
//             }}>
//             <CardContent>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Average Rating
//               </Typography>
//               <Typography variant="h4" style={{ fontWeight: "bold" }}>
//                 {product.reviews.length > 0
//                   ? product.averageRating.toFixed(1)
//                   : "N/A"}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Distribution Card */}
//         <Grid item xs={12} sm={4}>
//           <Card
//             style={{
//               backgroundColor: "#f5f5f5",
//               borderRadius: "8px",
//               boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
//             }}>
//             <CardContent>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Distribution
//               </Typography>
//               {[
//                 {
//                   label: "5 stars",
//                   value: product.ratingDistribution.fiveStar,
//                 },
//                 {
//                   label: "4 stars",
//                   value: product.ratingDistribution.fourStar,
//                 },
//                 {
//                   label: "3 stars",
//                   value: product.ratingDistribution.threeStar,
//                 },
//                 {
//                   label: "2 stars",
//                   value: product.ratingDistribution.twoStar,
//                 },
//                 {
//                   label: "1 star",
//                   value: product.ratingDistribution.oneStar,
//                 },
//               ].map(({ label, value }) => {
//                 return (
//                   <div
//                     key={label}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginBottom: "8px",
//                     }}>
//                     <Typography style={{ flex: 1 }}>{label}:</Typography>
//                     <div
//                       style={{
//                         backgroundColor: "#FFD700",
//                         height: "12px",
//                         flex: value / maxRating,
//                         marginRight: "8px",
//                       }}></div>
//                     <Typography>{value}</Typography>
//                   </div>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Number of Reviews Card */}
//         <Grid item xs={12} sm={4}>
//           <Card
//             style={{
//               backgroundColor: "#f5f5f5",
//               borderRadius: "8px",
//               boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
//             }}>
//             <CardContent>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Total Number of Reviews
//               </Typography>
//               <Typography
//                 variant="h4"
//                 style={{ fontWeight: "bold", color: "#333" }}>
//                 {product.reviews.length}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Sentiment Chart */}
//         <Grid item xs={12} sm={4}>
//           <Card
//             style={{
//               backgroundColor: "#f5f5f5",
//               borderRadius: "8px",
//               boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
//             }}>
//             <CardContent>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Sentiment Distribution
//               </Typography>
//               <Doughnut data={sentimentData} options={chartOptions} />
//             </CardContent>
//           </Card>
//         </Grid>
//         {/* Word Cloud */}
//         <Grid item xs={12} sm={4}>
//           <Card
//             style={{
//               backgroundColor: "#f5f5f5",
//               borderRadius: "8px",
//               boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
//             }}>
//             <CardContent>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Word Cloud
//               </Typography>
//               <ReactWordcloud options={options} words={words} />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Analytics;
