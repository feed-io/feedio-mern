import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = ({
  productId,
  handleCopyLink,
  openModal,
  productName,
  openCollectingModal,
  openEditModal,
}) => {
  return (
    <Grid
      container
      direction="column"
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "sticky",
        top: "20px",
        padding: { xs: 1, md: 2, lg: 4 },
      }}>
      <Grid
        item
        xs={12}
        sx={{ textAlign: "center", marginBottom: { xs: 2, md: 3, lg: 4 } }}>
        <Typography variant="h4" align="center">
          {productName} Room
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ textAlign: "center", marginBottom: { xs: 2, md: 3, lg: 4 } }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={openEditModal}
          sx={{
            marginRight: "10px",
            fontSize: { xs: "0.7rem", md: "0.75rem", lg: "0.80rem" },
          }}>
          Edit Room
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/dashboard"
          sx={{ fontSize: { xs: "0.7rem", md: "0.75rem", lg: "0.80rem" } }}>
          Back
        </Button>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ textAlign: "center", marginBottom: { xs: 2, md: 3, lg: 4 } }}>
        <Typography variant="h6" align="center">
          Pages
        </Typography>
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
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Button
              fullWidth
              component={RouterLink}
              to={path}
              variant="text"
              color="primary"
              sx={{
                fontSize: {
                  xs: "0.6rem",
                  sm: "0.75rem",
                  md: "0.85rem",
                  lg: "1rem",
                },
                whiteSpace: {
                  xs: "normal",
                  sm: "nowrap",
                  md: "nowrap",
                  lg: "nowrap",
                },
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
              sx={{ marginTop: 1 }}>
              Copy
            </Button>
          </div>
        ))}
      </Grid>

      {/* Integrations Section */}
      <Grid
        item
        xs={12}
        sx={{ textAlign: "center", marginBottom: { xs: 2, md: 3, lg: 4 } }}>
        <Typography variant="h6" align="center">
          Integrate
        </Typography>
        <Button
          fullWidth
          variant="contained"
          disabled
          sx={{
            fontSize: {
              xs: "0.6rem",
              sm: "0.75rem",
              md: "0.85rem",
              lg: "1rem",
            },
            whiteSpace: {
              xs: "normal",
              sm: "nowrap",
              md: "nowrap",
              lg: "nowrap",
            },
            padding: "6px 12px",
            marginTop: 4,
            textTransform: "none",
          }}>
          COMING SOON
        </Button>
      </Grid>

      {/* Embeds & Metrics (Display) Section */}
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h6" align="center">
          Display
        </Typography>
        {[
          {
            label: "Show Room Widgets",
            onClick: openModal,
          },
          {
            label: "Feedback Collection Widget",
            onClick: openCollectingModal,
          },
        ].map(({ label, onClick }, index) => (
          <Button
            fullWidth
            onClick={onClick}
            variant="text"
            color="primary"
            sx={{
              fontSize: {
                xs: "0.6rem",
                sm: "0.75rem",
                md: "0.85rem",
                lg: "1rem",
              },
              whiteSpace: {
                xs: "normal",
                sm: "nowrap",
                md: "nowrap",
                lg: "nowrap",
              },
              padding: "6px 12px",
              textTransform: "none",
            }}>
            {label}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
