import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Success = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${auth.userId}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then((response) => {
        auth.updateMembershipStatus(response.data.user.membershipStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth]);

  return (
    <div>
      <h2>Payment Successful</h2>
      <p>
        Thank you for your purchase! You now have access to all premium
        features.
      </p>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default Success;
