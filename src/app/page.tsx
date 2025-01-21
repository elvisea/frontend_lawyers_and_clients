'use client'

import React from 'react'

import { features } from './constants'

import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Princing from '@/components/sections/princing'

export default function Page() {
  return (
    <React.Fragment>
      <Hero
        resource='Clients'
        href='/contact'
        button='Descreva sua Situação Agora'
        title='Resolva seus problemas jurídicos com facilidade!'
        description='Descreva sua situação, envie documentos e conecte-se com os melhores profissionais.'
      />
      <Features
        miniTitle='Simplicidade e Conexão'
        title='Como Funciona a Plataforma'
        description='Com apenas alguns passos, você pode descrever sua situação, enviar documentos e ser conectado rapidamente a um advogado experiente que pode ajudar você.'
        features={features}
      />
      <Princing />
    </React.Fragment>
  )
}
