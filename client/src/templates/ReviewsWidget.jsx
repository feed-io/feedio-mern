// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Card, Typography, Box } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import axios from "axios";

// import { AuthContext } from "../context/auth-context";

// const ShowRoom = () => {
//   const [reviews, setReviews] = useState([]);
//   const { productId } = useParams();
//   const auth = useContext(AuthContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://feedio-server.vercel.app/api/users/${auth.userId}/products/${productId}/reviews/${productId}/all`,
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

//     fetchData();
//   }, [productId, auth.userId, auth.token]);

//   return (
//     <>
//       <main>
//         <Box
//           sx={{
//             bgcolor: "background.paper",
//             pt: 8,
//             pb: 6,
//           }}>
//           <Container maxWidth="sm">
//             <Typography
//               component="h1"
//               variant="h2"
//               align="center"
//               color="text.primary"
//               gutterBottom>
//               Show Room
//             </Typography>
//             <Typography
//               variant="h5"
//               align="center"
//               color="text.secondary"
//               paragraph>
//               Something short and leading about the collection below—its
//               contents, the creator, etc. Make it short and sweet, but not too
//               short so folks don&apos;t simply skip over it entirely.
//             </Typography>
//           </Container>
//         </Box>
//         <Container sx={{ py: 8, bgcolor: "background.paper" }} maxWidth="md">
//           <Grid container spacing={4}>
//             {reviews.map((review) => (
//               <Grid item xs={12} sm={6} md={4}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                   }}>
//                   <CardMedia
//                     component="div"
//                     sx={{
//                       pt: "56.25%",
//                     }}
//                     image="https://source.unsplash.com/random?wallpapers"
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       {review.author} - Rating: {review.rating}/5
//                     </Typography>
//                     <Typography>{review.content}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </main>
//     </>
//   );
// };

// export default ShowRoom;

import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// const CustomIcon1 = (props) => (
//   <SvgIcon {...props}>{/* SVG Path for the first icon */}</SvgIcon>
// );

// const CustomIcon2 = (props) => (
//   <SvgIcon {...props}>{/* SVG Path for the second icon */}</SvgIcon>
// );

export default function TranslatedComponent() {
  return (
    <Box className="flex-grow">
      <Box
        className="relative"
        maxWidth="6xl"
        mx="auto"
        height="0"
        pointerEvents="none"
        aria-hidden={true}
      />

      <Box position="relative">
        <Box position="absolute" top="0" left="0" right="0" bottom="0">
          <img
            loading="lazy"
            src="https://source.unsplash.com/random/1920x480"
            alt="About"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgcolor="gray.900"
            opacity="0.75"
            aria-hidden={true}
          />
        </Box>

        <Box maxWidth="6xl" mx="auto" px={{ xs: 4, sm: 6 }} position="relative">
          <Box pt={{ xs: 32, md: 40 }} pb={{ xs: 12, md: 20 }}>
            <Typography variant="h1" align="center" color="white" mb={4}>
              fgghsdg
            </Typography>
            <Box maxWidth="xs" mx="auto">
              {/* <Button
                variant="contained"
                color="primary"
                href="https://testimonial.to/dasdsa">
                Submit your testimonial
              </Button> */}
              <Link to="/signup">
                <Typography
                  variant="body2"
                  align="center"
                  underline="always"
                  color="white">
                  Build your own wall? It's free 👉
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box position="relative">
        <Box maxWidth="6xl" mx="auto" px={{ xs: 4, sm: 6 }}>
          <Box py={{ xs: 8, lg: 6 }}>
            <Box maxWidth="3xl" mx="auto">
              <Box overflow="hidden" mx="auto">
                <img
                  loading="lazy"
                  src="/static/media/no-message.18de8749.svg"
                  alt="success"
                  sx={{
                    width: { xs: "3/4", sm: "1/5" },
                    mx: "auto",
                    my: 5,
                    borderRadius: "lg",
                  }}
                />
                <Typography variant="h3" align="center" color="gray.600" mt={5}>
                  No testimonials found
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
