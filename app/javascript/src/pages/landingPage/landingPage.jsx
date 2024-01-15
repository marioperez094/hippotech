import React from "react";
import LandingLayout from "@components/landingLayout";
import Hero from "./hero";

import './landingPage.scss'

function LandingPage() {
  return (
    <div id="landing-page">
      <LandingLayout>
        <Hero />
      </LandingLayout>
    </div>
  )
};

export default LandingPage;