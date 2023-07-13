import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";

const Success = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Fetch the current user data from the server
    // and update the membershipStatus in the context.
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
    </div>
  );
};

export default Success;
