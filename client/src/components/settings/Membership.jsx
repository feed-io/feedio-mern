import React from "react";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/StarBorder";

const StyledNavLink = styled("a")({
  margin: "0 10px",
  textDecoration: "none",
  color: "black",
});

const StyledLoginButton = styled("button")({
  border: "1px solid black",
  backgroundColor: "transparent",
  padding: "5px 15px",
});

const StyledContainer = styled("div")({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
});

const StyledCard = styled("div")({
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
  margin: "20px 0",
  flexBasis: "30%",
  boxSizing: "border-box",
  "@media (max-width: 900px)": {
    flexBasis: "100%",
  },
});

const StyledCardHeader = styled("div")({
  padding: "10px",
  backgroundColor: "#f5f5f5",
});

const StyledCardContent = styled("div")({
  padding: "10px",
});

const StyledCardActions = styled("div")({
  padding: "10px",
});

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

export default function Pricing() {
  return (
    <>
      <StyledContainer>
        {tiers.map((tier) => (
          <StyledCard key={tier.title}>
            <StyledCardHeader>
              <h2>{tier.title}</h2>
              {tier.subheader && <StarIcon />}
              <p>{tier.subheader}</p>
            </StyledCardHeader>
            <StyledCardContent>
              <h3>${tier.price}/mo</h3>
              <ul>
                {tier.description.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </StyledCardContent>
            <StyledCardActions>
              <button variant={tier.buttonVariant}>{tier.buttonText}</button>
            </StyledCardActions>
          </StyledCard>
        ))}
      </StyledContainer>
    </>
  );
}
