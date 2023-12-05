import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContent,
  ButtonBase,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// import CollectFeeback from "../assets/collectFeedback";
import MasonryGrid from "../assets/MasonryGrid.svg";
import MasonryScrollGif from "../assets/MasonryScroll.gif";
import CarouselGif from "../assets/carousel.gif";
import MasonryScroll from "./MasonryScroll";
import MasonryFix from "./MasonryFix";
import Carousel from "./Carousel.jsx";

const CreateWidgetModal = (props) => {
  const [currentPage, setCurrentPage] = useState("layoutSelection");

  const layoutOptions = [
    {
      title: "Masonry - scrolling",
      alt: "auto scrolling masonry grid",
    },
    {
      title: "Masonry - fixed",
      alt: "Fixed masonry grid",
    },
    {
      title: "Carousel slider",
      alt: "Fixed masonry grid",
    },
  ];

  const handleMasonryClick = (title) => {
    if (title === "Masonry - scrolling") {
      setCurrentPage("masonry_scroll");
    }
    if (title === "Masonry - fixed") {
      setCurrentPage("masonry_fix");
    }
    if (title === "Carousel slider") {
      setCurrentPage("carousel");
    }
  };

  if (currentPage === "masonry_scroll") {
    return (
      <MasonryScroll
        goBack={() => setCurrentPage("layoutSelection")}
        layoutType="masonry_scroll"
        productId={props.productId}
        closeModal={props.closeModal}
      />
    );
  }
  if (currentPage === "masonry_fix") {
    return (
      <MasonryFix
        goBack={() => setCurrentPage("layoutSelection")}
        layoutType="masonry_fix"
        productId={props.productId}
        closeModal={props.closeModal}
      />
    );
  }
  if (currentPage === "carousel") {
    return (
      <Carousel
        goBack={() => setCurrentPage("layoutSelection")}
        layoutType="carousel"
        productId={props.productId}
        closeModal={props.closeModal}
      />
    );
  }

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="md"
      aria-labelledby="modal-headline">
      <DialogContent>
        <Box position="relative">
          <Box position="absolute" right={5} top={5} zIndex="tooltip">
            <Button onClick={props.closeModal}>
              <Close />
            </Button>
          </Box>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Embed a Show Room
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Step 1: Choose a layout
          </Typography>
          <Grid container spacing={3}>
            {layoutOptions.map((option, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <ButtonBase
                  style={{ width: "100%" }}
                  onClick={() => handleMasonryClick(option.title)}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                    width="100%">
                    {(() => {
                      switch (option.title) {
                        case "Masonry - scrolling":
                          return (
                            <img
                              src={MasonryScrollGif}
                              alt={option.alt}
                              style={{ width: "80%", marginBottom: "10px" }}
                            />
                          );
                        case "Masonry - fixed":
                          return (
                            <img
                              src={MasonryGrid}
                              alt={option.alt}
                              style={{ width: "80%", marginBottom: "10px" }}
                            />
                          );
                        case "Carousel slider":
                          return (
                            <img
                              src={CarouselGif}
                              alt={option.alt}
                              style={{ width: "80%", marginBottom: "10px" }}
                            />
                          );
                        case "Stacked layout":
                          return (
                            <img
                              src={option.imgSrc}
                              alt={option.alt}
                              style={{ width: "80%", marginBottom: "10px" }}
                            />
                          );
                        default:
                          return (
                            <img
                              src={option.imgSrc}
                              alt={option.alt}
                              style={{
                                width: "80%",
                                marginBottom: "10px",
                                borderRadius: "5px",
                              }}
                            />
                          );
                      }
                    })()}
                    <Typography variant="h6" component="p" align="center">
                      {option.title}
                    </Typography>
                  </Box>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWidgetModal;
