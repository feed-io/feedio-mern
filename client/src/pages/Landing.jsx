import React from "react";

import HeaderSection from "../components/landingPage/HeaderSection";
import CTASection from "../components/landingPage/CtaSection";
import FeaturesSection from "../components/landingPage/FeaturesSection";
import { useEffect } from "react";

function LandingPage() {
  return (
    <>
      <HeaderSection />
      <CTASection />
      <FeaturesSection />
    </>
  );
}

export default LandingPage;
