'use client'

import React from "react";

import "@/app/index.css";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
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

export default function Lawyers() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero resource="lawyers" />
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
