'use client'

import React from 'react'

import { texts } from './constants/texts'
import { features } from './constants/features'

import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Princing from '@/components/sections/princing'

export default function Lawyers() {
  return (
    <React.Fragment>
      <Hero
        resource='Lawyers'
        href='/register-lawyer'
        title={texts.hero.title}
        description={texts.hero.description}
        button={texts.hero.button}
      />
      <Features
        miniTitle={texts.features.miniTitle}
        title={texts.features.title}
        description={texts.features.description}
        features={features}
      />
      <Princing />
    </React.Fragment>
  )
}
