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
import AverageCardImg from "../assets/averageCard.svg"; // Assuming this is the correct path
import MasonryScroll from "./MasonryScroll";
import MasonryFix from "./MasonryFix";
import Carousel from "./Carousel.jsx";
import AverageCard from "./AverageCard.jsx";

const CreateWidgetModal = (props) => {
  const [currentPage, setCurrentPage] = useState("layoutSelection");

  const layoutOptions = [
    {
      title: "Masonry - scrolling",
      alt: "auto scrolling masonry grid",
      imgSrc: MasonryScrollGif,
    },
    {
      title: "Masonry - fixed",
      alt: "Fixed masonry grid",
      imgSrc: MasonryGrid,
    },
    {
      title: "Carousel slider",
      alt: "Carousel slider",
      imgSrc: CarouselGif,
    },
    {
      title: "Average Card",
      alt: "User rating average card",
      imgSrc: AverageCardImg, // Assign the correct image source here
    },
  ];

  const handleWidgetClick = (title) => {
    if (title === "Masonry - scrolling") {
      setCurrentPage("masonry_scroll");
    } else if (title === "Masonry - fixed") {
      setCurrentPage("masonry_fix");
    } else if (title === "Carousel slider") {
      setCurrentPage("carousel");
    } else if (title === "Average Card") {
      setCurrentPage("average_card");
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
  } else if (currentPage === "masonry_fix") {
    return (
      <MasonryFix
        goBack={() => setCurrentPage("layoutSelection")}
        layoutType="masonry_fix"
        productId={props.productId}
        closeModal={props.closeModal}
      />
    );
  } else if (currentPage === "carousel") {
    return (
      <Carousel
        goBack={() => setCurrentPage("layoutSelection")}
        layoutType="carousel"
        productId={props.productId}
        closeModal={props.closeModal}
      />
    );
  } else if (currentPage === "average_card") {
    return (
      <AverageCard
        goBack={() => setCurrentPage("layoutSelection")}
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
            Embed a widget
          </Typography>
          <Typography variant="body1" align="center">
            <Box
              component="span"
              px={1}
              py={0.5}
              borderRadius="full"
              fontWeight="medium">
              Step 1
            </Box>
            Choose your widget
          </Typography>
          <Grid container spacing={3}>
            {layoutOptions.map((option, index) => (
              <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
                <ButtonBase
                  style={{ width: "100%" }}
                  onClick={() => handleWidgetClick(option.title)}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                    width="100%">
                    <img
                      src={option.imgSrc}
                      alt={option.alt}
                      style={{ width: "80%", marginBottom: "10px" }}
                    />
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
