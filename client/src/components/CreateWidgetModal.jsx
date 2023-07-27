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

import MasonryLogo from "../assets/MasonryLogo";
import CarouselLogo from "../assets/CarouselLogo";
import MasonryScroll from "./MasonryScroll";
import MasonryFix from "./MasonryFix";
import Carousel from "./Carousel.jsx";

const CreateWidgetModal = (props) => {
  const [currentPage, setCurrentPage] = useState("layoutSelection");

  const layoutOptions = [
    {
      title: "Masonry - scrolling",
      // imgSrc:
      // "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fanimated-demo.gif?alt=media&amp;token=08b0e0d6-5290-4441-a309-942e074c7b77",
      alt: "auto scrolling masonry grid",
    },
    {
      title: "Masonry - fixed",
      // imgSrc:
      //   "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffixed-masonry-grid.png?alt=media&amp;token=c75b8785-344a-4bd8-96dd-79592466d78e",
      alt: "Fixed masonry grid",
    },
    {
      title: "Carousel slider",
      // imgSrc:
      //   "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fcarousel-animated.gif?alt=media&amp;token=7a42bb1a-0b98-45e9-acbf-37f8a9f36a4e",
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
                        case "Masonry - fixed":
                          return (
                            <MasonryLogo
                              style={{ width: "80%", marginBottom: "10px" }}
                            />
                          );
                        case "Carousel slider":
                          return (
                            <CarouselLogo
                              style={{ width: "80%", marginBottom: "10px" }}
                            />
                          );
                        case "Stacked layout":
                          return (
                            <MasonryLogo
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

          <Typography variant="body2" align="center" gutterBottom>
            Check out our
            <a
              href="https://help.testimonial.to/en/articles/6223121-embed-a-wall-of-love"
              target="_blank"
              rel="noreferrer">
              Show Room embed guide
            </a>
            for more help.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWidgetModal;

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   IconButton,
//   FormControlLabel,
//   Checkbox,
//   Tooltip,
//   Select,
//   MenuItem,
//   Button,
// } from "@material-ui/core";
// import Close from "@material-ui/icons/Close";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// function CustomModal({
//   open,
//   onClose,
//   onLeftButtonClick,
//   scrollSpeed,
//   onSpeedChange,
// }) {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <IconButton
//         style={{ position: "absolute", right: 5, top: 5, zIndex: 999 }}
//         onClick={onClose}>
//         <Close />
//       </IconButton>
//       <IconButton
//         style={{ position: "absolute", left: 10, top: 5, zIndex: 999 }}
//         onClick={onLeftButtonClick}>
//         <ArrowBackIcon />
//       </IconButton>

//       <DialogContent>
//         <div className="text-center text-gray-800">
//           <h3 className="h3 mb-4">Embed a Wall of Love</h3>
//         </div>
//         <p className="text-base font-medium w-full text-gray-800 text-center mb-4">
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-purple-100 text-purple-800 mr-2">
//             Step 2
//           </span>
//           Customize your Wall of Love
//         </p>

//         {/* Options */}
//         <FormControlLabel
//           control={<Checkbox color="primary" />}
//           label="Dark theme"
//         />
//         <FormControlLabel
//           control={<Checkbox color="primary" />}
//           label="Hide the date"
//         />
//         <Tooltip
//           title="You can further customize the speed by adjusting the speed parameter in the embed URL."
//           placement="top">
//           <div className="flex items-center mt-3">
//             <label className="block text-sm text-gray-800 mr-2">
//               Scroll speed:
//             </label>
//             <Select
//               value={scrollSpeed}
//               onChange={onSpeedChange}
//               variant="outlined"
//               style={{ minWidth: "150px" }}>
//               <MenuItem value="0.5">Very slow</MenuItem>
//               <MenuItem value="0.75">Slow</MenuItem>
//               <MenuItem value="1">Normal</MenuItem>
//               <MenuItem value="1.5">Fast</MenuItem>
//               <MenuItem value="2.0">Very fast</MenuItem>
//             </Select>
//           </div>
//         </Tooltip>

//         {/* Embed Code */}
//         <pre
//           style={{ background: "#1E1E1E", padding: "1em", marginTop: "20px" }}>
//           {/* Adjust this to display the actual code */}
//           Your embed code here
//         </pre>

//         {/* Footer buttons */}
//         <div className="mt-4 flex justify-between">
//           <Button variant="outlined" onClick={onClose}>
//             Close
//           </Button>
//           <Button variant="contained" color="primary">
//             Copy Code
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default CustomModal;
