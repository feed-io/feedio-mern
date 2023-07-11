import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => (
  <div>
    <h2>Payment Cancelled</h2>
    <p>
      You have not been charged. Please try again or contact support if you need
      help.
    </p>
    <Link to="/pricing">Try Again</Link>
  </div>
);

export default Cancel;
