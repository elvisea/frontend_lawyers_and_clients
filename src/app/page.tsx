'use client'

import React from 'react'

import Hero from '@/components/hero'
import Features from '@/components/features'
import Princing from '@/components/pricing'

export default function Page() {
  return (
    <React.Fragment>
      <Hero />
      <Features />
      <Princing />
    </React.Fragment>
  )
}
