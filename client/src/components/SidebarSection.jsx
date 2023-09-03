import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Grid,
  Button,
  useTheme,
  Box,
  Drawer,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Menu, FileCopy } from "@mui/icons-material";

const Sidebar = ({
  productId,
  handleCopyLink,
  openModal,
  productName,
  openCollectingModal,
  openEditModal,
  onClose,
}) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const content = (
    <Box bgcolor={theme.palette.success.main}>
      <Grid
        container
        direction="column"
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "sticky",
          top: "20px",
          padding: { xs: 1, md: 1, lg: 2 },
          bgcolor: theme.palette.success.main,
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
            variant="primary"
            onClick={openEditModal}
            sx={{
              marginRight: "10px",
              fontSize: { xs: "0.7rem", md: "0.75rem", lg: "0.80rem" },
            }}>
            Edit Room
          </Button>
          <Button
            size="small"
            variant="secondary"
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
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: theme.palette.primary.main,
            }}>
            Pages
          </Typography>
          {[
            {
              label: "Feedback Page",
              path: `/reviewSpace/${productId}`,
            },
            {
              label: "Show Room",
              path: `/showRoom/${productId}`,
            },
          ].map(({ label, path }, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}>
              <Button
                component={RouterLink}
                to={path}
                variant="text"
                sx={{
                  color: theme.palette.primary.contrastText,
                }}>
                Go to {label}
              </Button>
              <IconButton
                onClick={() => handleCopyLink(path)}
                sx={{ marginLeft: 1, color: theme.palette.third.main }}>
                <FileCopy />
              </IconButton>
            </div>
          ))}
        </Grid>

        {/* Integrations Section */}
        {/* <Grid
          item
          xs={12}
          sx={{ textAlign: "center", marginBottom: { xs: 2, md: 3, lg: 4 } }}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: theme.palette.primary.main,
            }}>
            Integrate
          </Typography>
          <Button
            fullWidth
            variant="contained"
            disabled
            sx={{
              color: theme.palette.primary.contrastText,
              padding: "6px 12px",
              marginTop: 4,
              textTransform: "none",
            }}>
            COMING SOON
          </Button>
        </Grid> */}

        {/* Widget Section */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: theme.palette.primary.main,
            }}>
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
                color: theme.palette.primary.contrastText,
              }}>
              {label}
            </Button>
          ))}
        </Grid>
      </Grid>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.success.main,
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent">
        {content}
      </Drawer>
    );
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}>
        <Menu />
      </IconButton>
      <Drawer
        anchor="left"
        onClose={() => {
          if (typeof onClose === "function") {
            onClose();
          }
          handleDrawerToggle();
        }}
        open={mobileOpen}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.primary.contrastText,
            width: 280,
          },
        }}
        sx={{ zIndex: theme.zIndex.appBar + 100 }}
        variant="temporary">
        {content}
      </Drawer>
    </>
  );
};

export default Sidebar;
