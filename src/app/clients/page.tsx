'use client'

import React from 'react'

import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Princing from '@/components/sections/princing'

export default function Clients() {
  return (
    <React.Fragment>
      <Hero resource='Clients' href='/register-client' />
      <Features />
      <Princing />
    </React.Fragment>
  )
}
