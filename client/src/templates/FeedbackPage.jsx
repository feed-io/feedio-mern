import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { useParams } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Button, Typography, Divider } from "@mui/material";
import SubmitFeedbackModal from "../components/SubmitFeedbackModal";

const FeedbackTemplate = () => {
  const [productName, setProductName] = useState(null);
  const [productHeader, setProductHeader] = useState(null);
  const [productQuestions, setProductQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { productId } = useParams();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}/products/${productId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        console.log(response.data.product);
        setProductName(response.data.product.name);
        setProductHeader(response.data.product.header);
        setProductQuestions(response.data.product.questions);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId, auth.userId, auth.token]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <header>
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height={20}>
            <Box flexGrow={1} mr={4}>
              <a href="/dashboard" aria-label="Logo">
                <img
                  src="/static/media/logo-dark.8447f219.svg"
                  alt="Logo"
                  height="40px"
                />
              </a>
            </Box>
          </Box>
        </Container>
      </header>

      <Box flexGrow={1}>
        <Container>
          <Box pt={20} pb={12} textAlign="center">
            <Box display="flex" justifyContent="center" mb={6}>
              <img
                // src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fdasdsa%2Flogo?alt=media&amp;token=805c872f-3a7b-49dd-a84e-b5944c098571"
                alt="Product Logo"
                style={{ maxHeight: "100px" }}
              />
            </Box>

            <Typography variant="h4" gutterBottom>
              {productName}
            </Typography>

            <Typography variant="body1">
              <Box>{productHeader}</Box>
            </Typography>

            <Box
              mt={4}
              textAlign="left"
              mx="auto"
              width={{ xs: "100%", md: "75%" }}>
              <Divider sx={{ mb: 2, borderColor: "rgb(93, 93, 255)" }} />
              <Box pl={4}>
                <ul>
                  {productQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </Box>
            </Box>

            <Box
              mt={6}
              display="flex"
              justifyContent="center"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenModal}>
                Send in feedback
              </Button>
            </Box>
          </Box>
        </Container>
        <SubmitFeedbackModal open={openModal} handleClose={handleCloseModal} />
      </Box>
    </Box>
  );
};

export default FeedbackTemplate;
