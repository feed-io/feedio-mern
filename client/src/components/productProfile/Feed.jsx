import React, { useContext } from "react";
import { Box } from "@mui/material";

import { AuthContext } from "../../context/auth-context";
import ReviewList from "./ReviewList";

const Feed = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Box flex={7} p={2}>
      <ReviewList
        productId={props.product._id}
        userId={auth.userId}
        token={auth.token}
      />
    </Box>
  );
};

export default Feed;
