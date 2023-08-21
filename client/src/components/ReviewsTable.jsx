import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableSortLabel,
  IconButton,
  TablePagination,
  Typography,
  Paper,
  Chip,
  Collapse,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
  Star,
} from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import Favorite from "@mui/icons-material/Favorite";
import Archive from "@mui/icons-material/Archive";
import MailOutline from "@mui/icons-material/MailOutline";
import CalendarToday from "@mui/icons-material/CalendarToday";

import Empty from "../assets/empty.svg";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Customer",
    sortable: false,
    align: "center",
  },
  {
    id: "sentiment",
    numeric: false,
    label: "Sentiment",
    sortable: true,
    align: "left",
  },
  {
    id: "rating",
    numeric: false,
    label: "Rating",
    sortable: true,
    align: "left",
  },
  {
    id: "fav",
    numeric: false,
    label: "Favourite",
    sortable: false,
    align: "center",
  },
  {
    id: "archive",
    numeric: false,
    label: "Archive",
    sortable: false,
    align: "center",
  },
  {
    id: "delete",
    numeric: false,
    label: "Delete",
    sortable: false,
    align: "center",
  },
];

const ReviewsTable = ({ product, userId, token, onSpaceCreated }) => {
  const theme = useTheme();
  const [reviews, setReviews] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${userId}/products/${product._id}/reviews/${product._id}/all`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setReviews(response.data.reviews);
      } catch (error) {
        console.log("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();
  }, [userId, token, product._id]);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `${SERVER_URL}/api/users/${userId}/products/${product._id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setReviews(reviews.filter((review) => review._id !== reviewId));
      if (onSpaceCreated) {
        onSpaceCreated();
      }
    } catch (error) {
      console.log("Error deleting review:", error.message);
    }
  };

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleString("en-US", options);
  };

  const categorizeSentiment = (score) => {
    if (score >= 4) {
      return "Positive";
    } else if (score === 3) {
      return "Neutral";
    } else {
      return "Negative";
    }
  };

  function customSort(a, b, orderBy) {
    switch (orderBy) {
      case "sentiment":
        const aSentimentCategory = categorizeSentiment(a.sentiment);
        const bSentimentCategory = categorizeSentiment(b.sentiment);
        const order = ["Negative", "Neutral", "Positive"];
        return (
          order.indexOf(aSentimentCategory) - order.indexOf(bSentimentCategory)
        );
      case "rating":
        return b.rating - a.rating;
      default:
        if (a[orderBy] < b[orderBy]) {
          return -1;
        }
        if (a[orderBy] > b[orderBy]) {
          return 1;
        }
        return 0;
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead
        sx={{
          backgroundColor: theme.palette.success.main,
        }}>
        <TableRow>
          {/* Placeholder cell for expand/collapse icon */}
          <TableCell></TableCell>

          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ color: "white" }}>
              {headCell.sortable ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  hideSortIcon={false}
                  sx={{ fontSize: "1rem" }}>
                  {headCell.label}
                </TableSortLabel>
              ) : (
                <Typography fontSize={"1rem"} color="inherit">
                  {headCell.label}
                </Typography>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const sortedReviews = reviews.sort((a, b) => {
    return order === "desc"
      ? -customSort(a, b, orderBy)
      : customSort(a, b, orderBy);
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 4 }}>
        <TableContainer sx={{ borderRadius: 4 }}>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1}>
                    <Box
                      display="flex"
                      height="50vh"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center">
                      <Box
                        display="flex"
                        width="15%"
                        alignItems="center"
                        justifyContent="center">
                        <img
                          src={Empty}
                          width="540"
                          alt="No Reviews"
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        paddingTop={4}
                        justifyContent="center">
                        <Typography variant="subtitle2">
                          No reviews yet
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                sortedReviews
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((review, index) => (
                    <>
                      <TableRow key={review._id}>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleToggle(review._id)}>
                            {openId === review._id ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell>{review.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={categorizeSentiment(review.sentiment)}
                            variant="outlined"
                            color={
                              review.sentiment >= 4
                                ? "success"
                                : review.sentiment === 3
                                ? "default"
                                : "error"
                            }
                            size="small"
                            style={{ marginRight: 10 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Rating
                            value={review.rating}
                            readOnly
                            icon={<Star fontSize="inherit" />}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <Favorite />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <Archive />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(review._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}>
                          <Collapse
                            in={openId === review._id}
                            timeout="auto"
                            unmountOnExit>
                            <Box sx={{ padding: 2 }}>
                              {/* Content */}
                              <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                  Content:
                                </Typography>
                                <Typography variant="body2">
                                  {review.content}
                                </Typography>
                              </Box>
                              {/* Sentiment */}
                              <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                  Sentiment:
                                </Typography>
                                <Typography variant="body2">
                                  {categorizeSentiment(review.sentiment)}
                                </Typography>
                              </Box>

                              {/* Email */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: 1,
                                }}>
                                <Box size="small" color="main">
                                  <MailOutline />
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{ marginLeft: 1 }}>
                                  {review.email}
                                </Typography>
                              </Box>

                              {/* Created At */}
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}>
                                <Box size="small" color="main">
                                  <CalendarToday />
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{ marginLeft: 1 }}>
                                  {formatDate(review.createdAt)}
                                </Typography>
                              </Box>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reviews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: theme.palette.success.main,
            color: "white",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        />
      </Paper>
    </Box>
  );
};
export default ReviewsTable;
