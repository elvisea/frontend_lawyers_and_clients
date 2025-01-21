'use client'

import React from 'react'

import { texts } from './constants/texts'
import { features } from './constants/features'

import HeroSession from '@/components/hero-session'
import FeaturesSession from '@/components/features-session'
import PricingSession from '@/components/pricing-session'

export default function Lawyers() {
  return (
    <React.Fragment>
      <HeroSession
        resource='Lawyers'
        href='/register-lawyer'
        title={texts.hero.title}
        description={texts.hero.description}
        button={texts.hero.button}
      />
      <FeaturesSession
        miniTitle={texts.features.miniTitle}
        title={texts.features.title}
        description={texts.features.description}
        features={features}
      />
      <PricingSession />
    </React.Fragment>
  )
}
