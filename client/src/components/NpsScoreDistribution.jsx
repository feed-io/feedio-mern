import React, { useState, useEffect, useContext } from "react";
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
          `${SERVER_URL}/api/users/${auth.userId}/products/${product._id}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        const { promotersCount, passivesCount, detractorsCount } =
          response.data.product;
        setDistributionData([promotersCount, passivesCount, detractorsCount]);
      } catch (error) {
        console.error("Error fetching NPS distribution:", error);
      }
    };

    if (product && product._id) {
      fetchDistributionData();
    }
  }, [product, auth.userId, auth.token]);

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

  const options = {
    scales: {
      y: {
        min: 0,
        max: Math.max(100, ...distributionData),
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        maxWidth: "700px",
        margin: "auto",
      }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NpsScoreDistribution;
