'use client'

import React from "react";

import { usePageTracking } from '@/hooks/use-page-tracking'
import { useLandingTracking } from '@/hooks/use-landing-tracking'

import "@/app/index.css";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatsAppButton } from "@/components/whats-app-button";
// import { Sponsors } from "@/components/Sponsors";
// import { About } from "@/components/About";
// import { HowItWorks } from "@/components/HowItWorks";
// import { Cta } from "@/components/Cta";
// import { Newsletter } from "@/components/Newsletter";
// import { Pricing } from "@/components/Pricing";
// import { ScrollToTop } from "@/components/ScrollToTop";
// import { Team } from "@/components/Team";

export default function LawyersLanding() {
  usePageTracking()
  useLandingTracking('lawyers')

  return (
    <React.Fragment>
      <Navbar />
      <Hero resource="lawyers" />
      <WhatsAppButton resource="lawyers" />
      {/* <Sponsors />
      <About />
      <HowItWorks resource="lawyers" />
      <Features resource="lawyers" />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ resource="lawyers" />
      <Footer />
      <ScrollToTop /> */}
    </React.Fragment>
  )
}
