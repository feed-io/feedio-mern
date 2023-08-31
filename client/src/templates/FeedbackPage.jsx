import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";

import { AuthContext } from "../context/auth-context";
import SubmitFeedbackModal from "../components/SubmitFeedbackModal";
import Logo from "../assets/logo.svg";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const FeedbackTemplate = () => {
  const [productName, setProductName] = useState(null);
  const [productHeader, setProductHeader] = useState(null);
  const [productQuestions, setProductQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { productId } = useParams();
  const auth = useContext(AuthContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}/products/${productId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
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
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor={theme.palette.success.main}>
      <Box flexGrow={1}>
        <Container>
          <Box pt={20} pb={12} textAlign="center">
            <Box display="flex" justifyContent="center" mb={6}>
              <img
                src={Logo}
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
              <Divider
                sx={{ mb: 2, borderColor: theme.palette.primary.contrastText }}
              />
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
