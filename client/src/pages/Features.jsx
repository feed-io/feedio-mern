import React from "react";
import { Box, Container, Grid } from "@mui/material";

import WallOfLoveWidget from "../components/featuresPage/WallOfLoveWidget";
import EffortlessTestimonialCollection from "../components/featuresPage/EffortlessTestimonialCollection";
import CustomizableDesign from "../components/featuresPage/CustomizableDesign";

const FeaturesPage = () => {
  return (
    <Box flexGrow={1}>
      <Container>
        <Box my={5}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <WallOfLoveWidget />
            </Grid>
            <Grid item xs={12} md={4}>
              <EffortlessTestimonialCollection />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomizableDesign />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesPage;
