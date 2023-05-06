import React from "react";

import HeaderSection from "../components/pricingPage/HeaderSection";
import PricingTiersSection from "../components/pricingPage/PricingSection";
import FAQSection from "../components/pricingPage/FaqSection";

const Pricing = () => {
  return (
    <>
      <HeaderSection />
      <PricingTiersSection />
      <FAQSection />
    </>
  );
};

export default Pricing;
