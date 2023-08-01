import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Info } from "@mui/icons-material";

import { AuthContext } from "../context/auth-context";

const EditRoomModal = (props) => {
  const [questions, setQuestions] = useState(props.product.questions || [""]);
  const [newProductName, setNewProductName] = useState(
    props.product.name || ""
  );
  const [newProductHeader, setNewProductHeader] = useState(
    props.product.header || ""
  );
  const [newProductContent, setNewProductContent] = useState(
    props.product.content || ""
  );

  const auth = useContext(AuthContext);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${auth.userId}/products/${props.product._id}`,
        {
          name: newProductName,
          header: newProductHeader,
          content: newProductContent,
          questions: questions,
        },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      props.closeEditModal();
      if (props.onRoomUpdated) {
        props.onRoomUpdated();
      }
    } catch (error) {
      console.log("Error updating Room:", error.message);
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.closeModal}
      fullWidth
      maxWidth="md">
      <DialogContent>
        <Box sx={{ py: 12, maxWidth: "500px", mx: "auto" }}>
          <Box
            sx={{
              width: "100%",
              mx: "auto",
              textAlign: "center",
              pb: 12,
              color: "gray.800",
            }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{ mb: 4 }}
              data-aos="fade-up">
              Edit Room
            </Typography>
            <Typography
              sx={{ width: "100%", color: "gray.500" }}
              data-aos="fade-up"
              data-aos-delay="200">
              Update the details for this Room.
            </Typography>
          </Box>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ maxWidth: "xl", mx: "auto" }}>
              {/* Space Name Field */}
              <Box sx={{ display: "flex", flexWrap: "wrap", m: -3, mb: 4 }}>
                <Box sx={{ width: "100%", px: 3 }}>
                  <Typography
                    sx={{
                      color: "gray.700",
                      fontSize: "sm",
                      fontWeight: "medium",
                      mb: 1,
                    }}>
                    Space name <span sx={{ color: "red.600" }}>*</span>
                  </Typography>
                  <TextField
                    id="name"
                    fullWidth
                    placeholder=""
                    variant="outlined"
                    sx={{ borderColor: "gray.300", color: "gray.800" }}
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    required
                  />
                </Box>
              </Box>

              {/* Header Title Field */}
              <Box sx={{ display: "flex", flexWrap: "wrap", m: -3, mb: 4 }}>
                <Box sx={{ width: "100%", px: 3 }}>
                  <Typography
                    sx={{
                      color: "gray.700",
                      fontSize: "sm",
                      fontWeight: "medium",
                      mb: 1,
                    }}>
                    Header title <span sx={{ color: "red.600" }}>*</span>
                  </Typography>
                  <TextField
                    id="header"
                    fullWidth
                    placeholder="Would you like to give a shoutout for xyz?"
                    variant="outlined"
                    sx={{ borderColor: "gray.300", color: "gray.800" }}
                    value={newProductHeader}
                    onChange={(e) => setNewProductHeader(e.target.value)}
                    required
                  />
                </Box>
              </Box>

              {/* Custom Message Field */}
              <Box sx={{ display: "flex", flexWrap: "wrap", m: -3, mb: 4 }}>
                <Box sx={{ width: "100%", px: 3 }}>
                  <Typography
                    sx={{
                      color: "gray.700",
                      fontSize: "sm",
                      fontWeight: "medium",
                      mb: 1,
                    }}>
                    Your custom message <span sx={{ color: "red.600" }}>*</span>
                  </Typography>
                  <TextField
                    id="message"
                    name="message"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
                    variant="outlined"
                    sx={{
                      borderColor: "gray.300",
                      color: "gray.800",
                      transition: "all 150ms ease-in-out",
                    }}
                    value={newProductContent}
                    onChange={(e) => setNewProductContent(e.target.value)}
                    required
                  />
                </Box>
              </Box>

              {/* Questions Field with Tooltip */}
              <Box sx={{ display: "flex", flexWrap: "wrap", m: -3, mb: 4 }}>
                <Box sx={{ width: "100%", px: 3 }}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "gray.700",
                      fontSize: "sm",
                      fontWeight: "medium",
                      mb: 1,
                    }}>
                    Questions
                    <Tooltip title="Tooltip content here" arrow>
                      <IconButton
                        size="small"
                        sx={{ ml: 2, color: "gray.500" }}>
                        <Info fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  {questions.map((question, index) => (
                    <TextField
                      key={index}
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      fullWidth
                      placeholder={`Question ${index + 1}`}
                      variant="outlined"
                      sx={{
                        borderColor: "gray.300",
                        color: "gray.800",
                        mb: 2,
                      }}
                    />
                  ))}
                  <Button
                    onClick={addQuestion}
                    variant="outlined"
                    sx={{ mt: 2 }}>
                    Add another question
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoomModal;
