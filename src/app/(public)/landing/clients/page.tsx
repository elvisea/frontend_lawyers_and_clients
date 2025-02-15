'use client'

import React from "react";

import "@/app/index.css";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { Cta } from "@/components/Cta";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { Pricing } from "@/components/Pricing";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Team } from "@/components/Team";

export default function Clients() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero resource="clients" />

      <About />
      <Process />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}
