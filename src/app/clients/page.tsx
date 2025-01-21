'use client'

import React from 'react'

import { content } from './constants/content'
import { features } from './constants'
import { benefits } from './constants/benefits'

import HeroSession from '@/components/hero-session'
import FeaturesSession from '@/components/features-session'
import BenefitsSession from '@/components/benefits-session'

export default function Clients() {
  return (
    <React.Fragment>

      <HeroSession
        resource={content.hero.resource}
        href='/register-client'
        title={content.hero.title}
        description={content.hero.description}
        button={content.hero.button}
      />

      <FeaturesSession
        miniTitle={content.features.miniTitle}
        title={content.features.title}
        description={content.features.description}
        features={features}
      />

      <BenefitsSession
        miniTitle={content.benefits.miniTitle}
        title={content.benefits.title}
        description={content.benefits.description}
        benefits={benefits}
      />

    </React.Fragment>
  )
}
