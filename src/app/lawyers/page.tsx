'use client'

import React from 'react'

import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Princing from '@/components/sections/princing'

export default function Lawyers() {
  return (
    <React.Fragment>
      <Hero resource='Lawyers' href='/register-lawyer' />
      <Features />
      <Princing />
    </React.Fragment>
  )
}
