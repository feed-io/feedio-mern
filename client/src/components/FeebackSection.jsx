// import React, { Suspense, useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Container,
//   ToggleButtonGroup,
//   ToggleButton,
// } from "@mui/material";
// import LogoSpinner from "../components/spinner/LogoSpinner";

// const ReviewsTable = React.lazy(() => import("../components/ReviewsTable"));
// const TrendChart = React.lazy(() => import("../components/TrendChart"));
// const WidgetsOverview = React.lazy(() =>
//   import("../components/WidgetsOverview")
// );
// const NpsScoreDistribution = React.lazy(() =>
//   import("../components/NpsScoreDistribution")
// );
// const SentimentChart = React.lazy(() => import("../components/SentimentChart"));
// const RatingDistribution = React.lazy(() =>
//   import("../components/RatingDistribution")
// );
// const WordCloud = React.lazy(() => import("../context/WordCloud"));

// const FeedbackSection = ({
//   product,
//   trendData,
//   trendLabels,
//   timeGranularity,
//   setTimeGranularity,
//   words,
//   sentimentData,
//   handleSpaceCreated,
//   userId,
//   token,
// }) => {
//   const [selectedOption, setSelectedOption] = useState("All");

//   const handleOptionChange = (event, newOption) => {
//     if (newOption !== null) {
//       setSelectedOption(newOption);
//     }
//   };

//   return (
//     <Box py={4}>
//       <Container maxWidth="xl">
//         {/* Toggle Button Group for Options */}
//         <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//           <ToggleButtonGroup
//             value={selectedOption}
//             exclusive
//             onChange={handleOptionChange}
//             color="primary">
//             <ToggleButton value="All">All</ToggleButton>
//             <ToggleButton value="Reviews">Reviews</ToggleButton>
//             <ToggleButton value="Widgets">Widgets</ToggleButton>
//           </ToggleButtonGroup>
//         </Box>

//         {/* Grid Container */}
//         <Grid container spacing={4}>
//           {(selectedOption === "All" || selectedOption === "Reviews") && (
//             <>
//               <Grid item xs={12}>
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     height: "95%",
//                   }}>
//                   <CardContent>
//                     <Suspense fallback={<LogoSpinner />}>
//                       <TrendChart
//                         trendData={trendData}
//                         trendLabels={trendLabels}
//                         timeGranularity={timeGranularity}
//                         setTimeGranularity={setTimeGranularity}
//                       />
//                     </Suspense>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               {/* Sentiment Chart */}
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     height: "95%",
//                   }}>
//                   <CardContent>
//                     <Suspense fallback={<LogoSpinner />}>
//                       <SentimentChart sentimentData={sentimentData} />
//                     </Suspense>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               {/* Word Cloud */}
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     height: "95%",
//                   }}>
//                   <CardContent style={{ height: "400px" }}>
//                     <Suspense fallback={<LogoSpinner />}>
//                       <WordCloud words={words} />
//                     </Suspense>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               {/* <Grid item xs={12} sm={6} md={4} lg={4}>
//             <Card
//               sx={{
//                 borderRadius: 4,
//                 height: "95%",
//                 // backgroundColor: theme.palette.primary.contrastText,
//               }}>
//               <CardContent style={{ height: "400px" }}>
//                 <Suspense fallback={<LogoSpinner />}>
//                   <NpsScoreDistribution product={product} />
//                 </Suspense>
//               </CardContent>
//             </Card>
//           </Grid> */}

//               {/* Rating Distribution */}
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     height: "95%",
//                     // backgroundColor: theme.palette.primary.contrastText,
//                   }}>
//                   <CardContent>
//                     <Suspense fallback={<LogoSpinner />}>
//                       <RatingDistribution product={product} />
//                     </Suspense>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} mt={4}>
//                 <ReviewsTable
//                   onSpaceCreated={handleSpaceCreated}
//                   product={product}
//                   userId={userId}
//                   token={token}
//                 />
//               </Grid>
//             </>
//           )}

//           {(selectedOption === "All" || selectedOption === "Widgets") && (
//             <Grid item xs={12}>
//               {/* Widgets Overview */}
//               <Card sx={{ borderRadius: 4, height: "95%" }}>
//                 <CardContent>
//                   <Suspense fallback={<LogoSpinner />}>
//                     <WidgetsOverview product={product} />
//                   </Suspense>
//                 </CardContent>
//               </Card>
//             </Grid>
//           )}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

import React, { Suspense, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import LogoSpinner from "../components/spinner/LogoSpinner";

const ReviewsTable = React.lazy(() => import("../components/ReviewsTable"));
const TrendChart = React.lazy(() => import("../components/TrendChart"));
const WidgetsOverview = React.lazy(() =>
  import("../components/WidgetsOverview")
);
const NpsScoreDistribution = React.lazy(() =>
  import("../components/NpsScoreDistribution")
);
const SentimentChart = React.lazy(() => import("../components/SentimentChart"));
const RatingDistribution = React.lazy(() =>
  import("../components/RatingDistribution")
);
const WordCloud = React.lazy(() => import("../context/WordCloud"));

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
  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const renderAnalytics = () => (
    <>
      <Grid item xs={12}>
        <Card
          sx={{
            borderRadius: 4,
            height: "95%",
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
                // backgroundColor: theme.palette.primary.contrastText,
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
            // backgroundColor: theme.palette.primary.contrastText,
          }}>
          <CardContent>
            <Suspense fallback={<LogoSpinner />}>
              <RatingDistribution product={product} />
            </Suspense>
          </CardContent>
        </Card>
      </Grid>
    </>
  );

  const renderWidgets = () => (
    <Suspense fallback={<LogoSpinner />}>
      <WidgetsOverview product={product} />
    </Suspense>
  );

  return (
    <Box
      py={4}
      sx={{
        height:
          selectedOption === "Reviews" || selectedOption === "Widgets"
            ? "100vh"
            : "auto",
      }}>
      {" "}
      <Container maxWidth="xl">
        {/* Toggle Button Group for Options */}
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ToggleButtonGroup
            value={selectedOption}
            exclusive
            onChange={handleOptionChange}
            color="primary">
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Reviews">Reviews</ToggleButton>
            <ToggleButton value="Analytics">Analytics</ToggleButton>
            <ToggleButton value="Widgets">Widgets</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Grid Container */}
        <Grid container spacing={4}>
          {selectedOption === "All" && (
            <>
              {renderAnalytics()}
              <Grid item xs={12}>
                <Suspense fallback={<LogoSpinner />}>
                  <ReviewsTable
                    onSpaceCreated={handleSpaceCreated}
                    product={product}
                    userId={userId}
                    token={token}
                  />
                </Suspense>
              </Grid>
              <Grid item xs={12}>
                {renderWidgets()}
              </Grid>
            </>
          )}

          {selectedOption === "Reviews" && (
            <Grid item xs={12}>
              <Suspense fallback={<LogoSpinner />}>
                <ReviewsTable
                  onSpaceCreated={handleSpaceCreated}
                  product={product}
                  userId={userId}
                  token={token}
                />
              </Suspense>
            </Grid>
          )}

          {selectedOption === "Analytics" && renderAnalytics()}

          {selectedOption === "Widgets" && (
            <Grid item xs={12}>
              {renderWidgets()}
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeedbackSection;
