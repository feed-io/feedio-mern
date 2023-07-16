// import React from "react";
// import { Container, Typography, Button, Box, Grid } from "@mui/material";
// import { styled } from "@mui/system";

// const StyledImage = styled("img")({
//   borderRadius: "16px",
// });

// const HeaderTypography = styled(Typography)(({ theme }) => ({
//   fontWeight: "bold",
//   color: theme.palette.text.primary,
// }));

// const BodyTypography = styled(Typography)(({ theme }) => ({
//   color: theme.palette.text.secondary,
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   padding: "12px 36px",
//   borderRadius: "24px",
//   fontWeight: "600",
//   backgroundColor: theme.palette.background.default,
//   color: theme.palette.primary.contrastText,
//   "&:hover": {
//     backgroundColor: theme.palette.background.default,
//   },
// }));

// const CTASection = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         py={8}>
//         <Box>
//           <StyledImage
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQiX4ELo5VzbWMbWxQV3VpUibCQfLK1RKsw&usqp=CAU"
//             alt=""
//           />
//         </Box>
//         <Box
//           display="flex"
//           flexDirection="column"
//           justifyContent="center"
//           alignItems="flex-end">
//           <HeaderTypography variant="h4" component="h2" gutterBottom>
//             Start Building Trust with your Show Room
//           </HeaderTypography>
//           <BodyTypography variant="h6" component="p" gutterBottom>
//             Experience the power of customer testimonials and let your Show Room
//             speak for your brand.
//           </BodyTypography>
//           <StyledButton variant="contained" size="large">
//             Create Your Show Room Now
//           </StyledButton>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// const FeaturesSection = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box py={8}>
//         <Typography
//           variant="h4"
//           component="h2"
//           gutterBottom
//           sx={{ textAlign: "center", fontWeight: "bold" }}>
//           Why Choose Feedio for Show Room?
//         </Typography>
//         <Grid container spacing={4}>
//           {[
//             {
//               title: "Effortless Integration",
//               description:
//                 "Easily collect and showcase testimonials from various sources with our seamless integration options.",
//             },
//             {
//               title: "Customizable Design",
//               description:
//                 "Personalize your Wall of Love with our flexible design options to match your brand's unique style.",
//             },
//             {
//               title: "Powerful Analytics",
//               description:
//                 "Measure your Wall of Love's impact with in-depth analytics that reveal insights about customer engagement.",
//             },
//           ].map((feature, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   gap: 2,
//                 }}>
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyLTYr1mEDHKHvJ1WFA4FH-8v9D7n1I03wWg&usqp=CAU"
//                   alt={`Feature ${index + 1}`}
//                   style={{ borderRadius: "16px" }}
//                 />
//                 <Typography
//                   variant="h6"
//                   component="h3"
//                   gutterBottom
//                   sx={{ fontWeight: "bold" }}>
//                   {feature.title}
//                 </Typography>
//                 <Typography>{feature.description}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// const HeaderSection = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         minHeight="80vh">
//         <Box>
//           <Typography
//             variant="h2"
//             component="h1"
//             gutterBottom
//             sx={{ fontWeight: "bold" }}>
//             Share the Love with Feedio
//           </Typography>
//           <Typography
//             variant="h6"
//             component="p"
//             gutterBottom
//             sx={{ color: "gray" }}>
//             Showcase your customer success stories and build trust with our
//             beautifully designed Show Room page.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{
//               padding: "12px 36px",
//               borderRadius: "24px",
//               fontWeight: "600",
//             }}>
//             Get Started for Free
//           </Button>
//         </Box>
//         <Box>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmGac4rHQocj96nrvEi7E19quDVfoOgdWGDg&usqp=CAU"
//             alt="Header "
//             style={{ borderRadius: "16px" }}
//           />
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// const LandingPage = () => {
//   return (
//     <div>
//       <HeaderSection />
//       <FeaturesSection />
//       <CTASection />
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Star } from "@mui/icons-material";

const HeroImage = styled("div")({
  height: "400px",
  background: "url('hero-image.jpg') no-repeat center center",
  backgroundSize: "cover",
});

const FeatureItem = ({ title, description }) => (
  <Box my={4}>
    <Typography variant="h6" component="h3">
      {title}
    </Typography>
    <Typography variant="body1">{description}</Typography>
  </Box>
);

const TestimonialItem = ({ quote, author }) => (
  <Box my={2} p={2} sx={{ border: "1px solid #ddd", borderRadius: "8px" }}>
    <Typography variant="body1">"{quote}"</Typography>
    <Typography variant="subtitle2" align="right">
      - {author}
    </Typography>
  </Box>
);

function LandingPage() {
  return (
    <Container>
      <Box my={4}>
        <HeroImage />
        <Typography variant="h2" component="h1">
          Capture Authentic Testimonials With Ease
        </Typography>
        <Typography variant="h6" component="p">
          Easily gather and display powerful testimonials and reviews on your
          website. Boost your brand's credibility and increase conversions.
        </Typography>
        <Button variant="contained" color="primary">
          Start Your Free Trial
        </Button>
      </Box>

      <Box my={4}>
        <Typography variant="h3" component="h2">
          Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FeatureItem
              title="Automatic Collection"
              description="Send out automated requests for testimonials, making the process efficient and effortless."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FeatureItem
              title="Robust Display"
              description="Showcase your testimonials in a visually appealing and customizable format on your website."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FeatureItem
              title="Trust Boost"
              description="Build trust with potential customers by displaying authentic reviews and ratings."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FeatureItem
              title="Conversion Improvement"
              description="Increase conversions by leveraging social proof and positive customer experiences."
            />
          </Grid>
        </Grid>
      </Box>

      <Box my={4}>
        <Typography variant="h3" component="h2">
          Testimonials
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TestimonialItem
              quote="Feedio is fantastic! It helped us boost our conversions significantly."
              author="John Doe"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TestimonialItem
              quote="I love how easy it is to collect and display testimonials with Feedio!"
              author="Jane Smith"
            />
          </Grid>
        </Grid>
      </Box>

      <Box my={4}>
        <Typography variant="h3" component="h2">
          Pricing
        </Typography>
        {/* Add pricing content here */}
      </Box>

      <Box my={4}>
        <Button variant="contained" color="primary">
          Start Your Free Trial
        </Button>
      </Box>

      <Box my={4}>
        <Typography variant="body2">
          Privacy Policy | Terms of Service
        </Typography>
        {/* Add Footer content here */}
      </Box>
    </Container>
  );
}

export default LandingPage;
