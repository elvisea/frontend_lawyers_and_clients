'use client'

import React from "react";

import "@/app/index.css";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatsAppButton } from "@/components/whats-app-button";
// import { AboutCompany } from "@/components/AboutCompany";
import { Process } from "@/components/Process";
// import { Features } from "@/components/features";
// import { Services } from "@/components/Services";
// import { Cta } from "@/components/Cta";
// import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/Footer";
// import { Newsletter } from "@/components/Newsletter";

// import { Team } from "@/components/Team";
// import { ScrollToTop } from "@/components/ScrollToTop";

export default function Clients() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero resource="clients" />

      <Process />
      {/* <Cta /> */}

      {/* <Features resource="clients" /> */}

      {/* <AboutCompany /> */}
      {/* <Services /> */}
      {/* <Testimonials /> */}
      {/* <Team /> */}

      {/* <Newsletter /> */}
      {/* <ScrollToTop /> */}
      <FAQ resource="clients" />
      <Footer />
      <WhatsAppButton resource="clients" />
    </React.Fragment>
  )
}
