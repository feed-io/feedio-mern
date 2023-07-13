// import React, { useContext } from "react";
// import { Button } from "@mui/material";
// import axios from "axios";
// import { AuthContext } from "../../context/auth-context";

// const Membership = () => {
//   const auth = useContext(AuthContext);

//   const handleCheckout = async () => {
//     const response = await axios.post(
//       `http://localhost:8080/api/users/${auth.userId}/payments/create-checkout-session`,
//       {},
//       {
//         headers: {
//           Authorization: "Bearer " + auth.token,
//         },
//       }
//     );

//     if (response.data && response.data.id) {
//       const { id } = response.data;
//       const stripe = window.Stripe(
//         "pk_test_51NS5wyCbn1CFQkB8htl9FOMk96NaBH1os6POnhCtrvd1kvwkslsGKyz9aevuvRKIZxDlLnqPA1ofvHxdy41D8Gum00X6521Cyl"
//       );
//       stripe.redirectToCheckout({ sessionId: id });
//     }
//   };

//   const handleUnsubscribe = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/users/${auth.userId}/payments/cancel-subscription`,
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + auth.token,
//           },
//         }
//       );

//       // console.log(response);
//     } catch (error) {
//       // Handle the error
//       console.error(error);
//     }
//   };

//   const subscribeButton = (
//     <Button variant="contained" color="primary" onClick={handleCheckout}>
//       Subscribe
//     </Button>
//   );

//   const unsubscribeButton = (
//     <Button variant="contained" color="primary" onClick={handleUnsubscribe}>
//       unsubscribe
//     </Button>
//   );
//   console.log(auth);
//   return (
//     <div>
//       <h2>Premium Membership</h2>
//       <p>Enjoy unlimited access to all our features.</p>
//       {auth.membershipStatus === "free" ? subscribeButton : unsubscribeButton}
//     </div>
//   );
// };

// export default Membership;

import React, { useContext, useState } from "react";
import { Button, Radio, FormControlLabel, Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";

const AccountDashboard = () => {
  const auth = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleRadioChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleCheckout = async () => {
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
      const stripe = window.Stripe(
        "pk_test_51NS5wyCbn1CFQkB8htl9FOMk96NaBH1os6POnhCtrvd1kvwkslsGKyz9aevuvRKIZxDlLnqPA1ofvHxdy41D8Gum00X6521Cyl"
      );
      await stripe.redirectToCheckout({ sessionId: id });
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${auth.userId}/payments/cancel-subscription`,
        {},
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      if (response.status === 200) {
        // The unsubscription was successful.
        // Update the membership status.
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Account Dashboard</Typography>
      <Typography variant="body1">Hi {auth.email}</Typography>

      {auth.membershipStatus === "free" ? (
        <div>
          <Typography variant="body1">
            You are currently not on any plan. Purchase a subscription below.
          </Typography>
          <FormControlLabel
            control={
              <Radio
                checked={selectedPlan === "basic"}
                onChange={handleRadioChange}
                value="basic"
                name="plan"
              />
            }
            label="Basic for $10"
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedPlan === "pro"}
                onChange={handleRadioChange}
                value="pro"
                name="plan"
              />
            }
            label="Pro for $12"
          />
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Subscribe
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="body1">
            You are currently on the {auth.membershipStatus} plan
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUnsubscribe}>
            Unsubscribe
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountDashboard;
