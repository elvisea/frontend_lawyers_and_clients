'use client'

import React from "react";
import { usePageTracking } from '@/hooks/use-page-tracking'
import { useLandingTracking } from '@/hooks/use-landing-tracking'

import "./index.css";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatsAppButton } from "@/components/whats-app-button";
// import { Sponsors } from "@/components/Sponsors";
// import { About } from "@/components/About";
// import { HowItWorks } from "@/components/HowItWorks";
// import { Features } from "@/components/features";
// import { Services } from "@/components/Services";
// import { Cta } from "@/components/Cta";
// import { Testimonials } from "@/components/Testimonials";
// import { FAQ } from "@/components/faq";
import { Footer } from "@/components/Footer";
// import { Newsletter } from "@/components/Newsletter";
// import { Pricing } from "@/components/Pricing";
// import { ScrollToTop } from "@/components/ScrollToTop";
// import { Team } from "@/components/Team";

export default function Home() {
  usePageTracking()
  useLandingTracking('home')

  return (
    <React.Fragment>
      <Navbar />
      <Hero resource="clients" />
      {/* <Sponsors />
      <About />
      <HowItWorks resource="clients" />
      <Features resource="clients" />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ resource="clients" />
      <ScrollToTop /> */}
      <Footer />
      <WhatsAppButton resource="default" />
    </React.Fragment>
  )
}
