import React from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

const FeaturesPage = () => {
  const features = {
    Basic: {
      "Website for displaying feedback": true,
      "Basic embeddable widgets": true,
      "Basic trend chart analysis": true,
      "Customizable widgets": false,
      "Enhanced trend chart analysis": false,
      "Basic sentiment analysis": false,
      "Advanced customizable widgets": false,
      "Advanced sentiment analysis": false,
      "Word cloud visualization": false,
      "Rating distribution insights": false,
      "Net Promoter Score (NPS) analysis": false,
    },
    Plus: {
      "Website for displaying feedback": true,
      "Basic embeddable widgets": true,
      "Basic trend chart analysis": true,
      "Customizable widgets": true,
      "Enhanced trend chart analysis": true,
      "Basic sentiment analysis": true,
      "Advanced customizable widgets": false,
      "Advanced sentiment analysis": false,
      "Word cloud visualization": false,
      "Rating distribution insights": false,
      "Net Promoter Score (NPS) analysis": false,
    },
    Pro: {
      "Website for displaying feedback": true,
      "Basic embeddable widgets": true,
      "Basic trend chart analysis": true,
      "Customizable widgets": true,
      "Enhanced trend chart analysis": true,
      "Basic sentiment analysis": true,
      "Advanced customizable widgets": true,
      "Advanced sentiment analysis": true,
      "Word cloud visualization": true,
      "Rating distribution insights": true,
      "Net Promoter Score (NPS) analysis": true,
    },
  };

  const createFeatureList = (tier) => (
    <List>
      {Object.entries(features[tier]).map(([feature, isAvailable]) => (
        <ListItem key={feature}>
          <ListItemIcon>
            {isAvailable ? <CheckCircleOutlineIcon /> : <DoNotDisturbOnIcon />}
          </ListItemIcon>
          <ListItemText primary={feature} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Compare Our Plans
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Basic Tier */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" align="center">
              Basic
            </Typography>
            {createFeatureList("Basic")}
          </Paper>
        </Grid>
        {/* Plus Tier */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" align="center">
              Plus
            </Typography>
            {createFeatureList("Plus")}
          </Paper>
        </Grid>
        {/* Pro Tier */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" align="center">
              Pro
            </Typography>
            {createFeatureList("Pro")}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturesPage;
