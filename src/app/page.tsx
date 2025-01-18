'use client'

import React from 'react'

import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Princing from '@/components/sections/princing'

export default function Page() {
  return (
    <React.Fragment>
      <Hero resource='Clents and Lawyers' href='/contact' />
      <Features />
      <Princing />
    </React.Fragment>
  )
}
