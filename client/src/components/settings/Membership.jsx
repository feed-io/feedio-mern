import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";

const Membership = () => {
  const auth = useContext(AuthContext);

  const handleCheckout = async () => {
    // Create a checkout session on your server
    const response = await axios.post(
      `http://localhost:8080/api/users/${auth.userId}/payments/create-checkout-session`,
      {},
      {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );

    if (response.data && response.data.id) {
      const { id } = response.data;

      // Redirect to Stripe Checkout
      const stripe = window.Stripe(
        "pk_test_51NS5wyCbn1CFQkB8htl9FOMk96NaBH1os6POnhCtrvd1kvwkslsGKyz9aevuvRKIZxDlLnqPA1ofvHxdy41D8Gum00X6521Cyl"
      );
      stripe.redirectToCheckout({ sessionId: id });
    }
  };

  return (
    <div>
      <h2>Premium Membership</h2>
      <p>Enjoy unlimited access to all our features.</p>
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Subscribe
      </Button>
    </div>
  );
};

export default Membership;
