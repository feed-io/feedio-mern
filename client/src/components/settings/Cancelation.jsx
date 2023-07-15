import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => (
  <div>
    <h2>Payment Cancelled</h2>
    <p>
      You have not been charged. Please try again or contact support if you need
      help.
    </p>
    <Link to="/dashboard" style={{ textDecoration: "none" }}>
      <Button variant="contained" color="secondary">
        Go to Dashboard
      </Button>
    </Link>
  </div>
);

export default Cancel;
