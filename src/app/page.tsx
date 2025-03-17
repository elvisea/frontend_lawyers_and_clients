'use client'

import React from "react";

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
// import { Footer } from "@/components/Footer";
// import { Newsletter } from "@/components/Newsletter";
// import { Pricing } from "@/components/Pricing";
// import { ScrollToTop } from "@/components/ScrollToTop";
// import { Team } from "@/components/Team";

export default function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero resource="clients" />
      <WhatsAppButton />
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
      <Footer />
      <ScrollToTop /> */}
    </React.Fragment>
  )
}
