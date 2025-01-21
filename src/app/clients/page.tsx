'use client'

import React from 'react'

import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Benefits from '@/components/sections/benefits'

import { texts } from './constants/texts'
import { features } from './constants'
import { benefits } from './constants/benefits'

export default function Clients() {
  return (
    <React.Fragment>
      <Hero
        resource='Clients'
        href='/register-client'
        title='Resolva seus problemas jurídicos com facilidade!'
        description='Descreva sua situação, envie documentos e conecte-se com os melhores profissionais.'
        button='Descreva sua Situação Agora'
      />
      <Features
        miniTitle='Simplicidade e Conexão'
        title='Como Funciona a Plataforma'
        description='Com apenas alguns passos, você pode descrever sua situação, enviar documentos e ser conectado rapidamente a um advogado experiente que pode ajudar você.'
        features={features}
      />
      <Benefits
        miniTitle={texts.benefits.miniTitle}
        title={texts.benefits.title}
        description={texts.benefits.description}
        benefits={benefits}
      />
    </React.Fragment>
  )
}
