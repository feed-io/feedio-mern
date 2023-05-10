import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewsWidget = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.log("Error fetching reviews:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Reviews Widget</h2>
      <ul>
        {/* {reviews.map((review) => ( */}
        <li key="review._id">
          <h3>'review.author' - Rating: 'review.rating'/5</h3>
          <p>'review.content'</p>
          <small>Posted on: {new Date().toLocaleString()}</small>
        </li>
        {/* // ))} */}
      </ul>
    </div>
  );
};

export default ReviewsWidget;
