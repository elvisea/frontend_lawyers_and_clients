'use client'

import React from "react";

import "@/app/index.css";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

// import { AboutCompany } from "@/components/AboutCompany";
// import { Process } from "@/components/Process";
// import { Features } from "@/components/features";
// import { Services } from "@/components/Services";
// import { Cta } from "@/components/Cta";
// import { Testimonials } from "@/components/Testimonials";
// import { FAQ } from "@/components/faq";
// import { Footer } from "@/components/Footer";
// import { Newsletter } from "@/components/Newsletter";

// import { Team } from "@/components/Team";
// import { ScrollToTop } from "@/components/ScrollToTop";

export default function Clients() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero resource="clients" />
      {/* <Cta />
      <Process />

      <Features resource="clients" />

      <AboutCompany />
      <Services />
      <Testimonials />
      <Team />

      <Newsletter />
      <FAQ resource="clients" />
      <Footer />
      <ScrollToTop /> */}
    </React.Fragment>
  )
}
