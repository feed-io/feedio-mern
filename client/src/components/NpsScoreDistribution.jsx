// NpsScoreDistribution.jsx
import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { AuthContext } from "../context/auth-context";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NpsScoreDistribution = ({ product }) => {
  const [distributionData, setDistributionData] = useState([0, 0, 0]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchDistributionData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/nps/getNpsScoreDistribution/${product._id}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const { promoters, passives, detractors } = response.data;
        setDistributionData([promoters, passives, detractors]);
      } catch (error) {
        console.error("Error fetching NPS distribution:", error);
      }
    };

    fetchDistributionData();
  }, [product._id, auth.token]);

  const data = {
    labels: ["Promoters", "Passives", "Detractors"],
    datasets: [
      {
        label: "NPS Score Distribution",
        data: distributionData,
        backgroundColor: ["#00D37F", "#D2C4FB", "#FF3864"],
        hoverBackgroundColor: ["#00B36B", "#B1A2E3", "#FF165D"],
      },
    ],
  };

  return (
    <div>
      <Typography variant="h6">NPS Score Distribution</Typography>
      <Bar data={data} />
    </div>
  );
};

export default NpsScoreDistribution;
