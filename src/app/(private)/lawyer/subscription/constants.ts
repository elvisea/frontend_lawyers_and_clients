import { Plan } from '@/types/subscription'

export const MOCK_PLANS: Plan[] = [
  // FREE
  {
    id: '1',
    name: 'Free',
    type: 'FREE',
    interval: 'MONTHLY',
    price: 0,
    maxCases: 2,
    caseDiscount: 0,
    features: ['Aceitar até 2 casos', 'Sem desconto nos casos']
  },

  // BASIC
  {
    id: '2',
    name: 'Basic Mensal',
    type: 'BASIC',
    interval: 'MONTHLY',
    price: 49.90,
    maxCases: 5,
    caseDiscount: 5,
    features: ['Aceitar até 5 casos', '5% desconto por caso']
  },
  {
    id: '3',
    name: 'Basic Trimestral',
    type: 'BASIC',
    interval: 'QUARTERLY',
    price: 134.70,
    maxCases: 5,
    caseDiscount: 5,
    features: ['Aceitar até 5 casos', '5% desconto por caso', 'Economia de R$ 15']
  },
  {
    id: '4',
    name: 'Basic Semestral',
    type: 'BASIC',
    interval: 'SEMIANNUALLY',
    price: 251.40,
    maxCases: 5,
    caseDiscount: 5,
    features: ['Aceitar até 5 casos', '5% desconto por caso', 'Economia de R$ 48']
  },
  {
    id: '5',
    name: 'Basic Anual',
    type: 'BASIC',
    interval: 'YEARLY',
    price: 478.80,
    maxCases: 5,
    caseDiscount: 5,
    features: ['Aceitar até 5 casos', '5% desconto por caso', 'Economia de R$ 120']
  },

  // PREMIUM
  {
    id: '6',
    name: 'Premium Mensal',
    type: 'PREMIUM',
    interval: 'MONTHLY',
    price: 99.90,
    maxCases: 15,
    caseDiscount: 10,
    features: ['Aceitar até 15 casos', '10% desconto por caso', 'Suporte prioritário']
  },
  {
    id: '7',
    name: 'Premium Trimestral',
    type: 'PREMIUM',
    interval: 'QUARTERLY',
    price: 269.70,
    maxCases: 15,
    caseDiscount: 10,
    features: ['Aceitar até 15 casos', '10% desconto por caso', 'Suporte prioritário', 'Economia de R$ 30']
  },
  {
    id: '8',
    name: 'Premium Semestral',
    type: 'PREMIUM',
    interval: 'SEMIANNUALLY',
    price: 509.40,
    maxCases: 15,
    caseDiscount: 10,
    features: ['Aceitar até 15 casos', '10% desconto por caso', 'Suporte prioritário', 'Economia de R$ 90']
  },
  {
    id: '9',
    name: 'Premium Anual',
    type: 'PREMIUM',
    interval: 'YEARLY',
    price: 958.80,
    maxCases: 15,
    caseDiscount: 10,
    features: ['Aceitar até 15 casos', '10% desconto por caso', 'Suporte prioritário', 'Economia de R$ 240']
  },

  // ENTERPRISE
  {
    id: '10',
    name: 'Enterprise Mensal',
    type: 'ENTERPRISE',
    interval: 'MONTHLY',
    price: 199.90,
    maxCases: 50,
    caseDiscount: 15,
    features: ['Casos ilimitados', '15% desconto por caso', 'Suporte VIP 24/7', 'Dashboard avançado']
  },
  {
    id: '11',
    name: 'Enterprise Trimestral',
    type: 'ENTERPRISE',
    interval: 'QUARTERLY',
    price: 539.70,
    maxCases: 50,
    caseDiscount: 15,
    features: ['Casos ilimitados', '15% desconto por caso', 'Suporte VIP 24/7', 'Dashboard avançado', 'Economia de R$ 60']
  },
  {
    id: '12',
    name: 'Enterprise Semestral',
    type: 'ENTERPRISE',
    interval: 'SEMIANNUALLY',
    price: 1019.40,
    maxCases: 50,
    caseDiscount: 15,
    features: ['Casos ilimitados', '15% desconto por caso', 'Suporte VIP 24/7', 'Dashboard avançado', 'Economia de R$ 180']
  },
  {
    id: '13',
    name: 'Enterprise Anual',
    type: 'ENTERPRISE',
    interval: 'YEARLY',
    price: 1918.80,
    maxCases: 50,
    caseDiscount: 15,
    features: ['Casos ilimitados', '15% desconto por caso', 'Suporte VIP 24/7', 'Dashboard avançado', 'Economia de R$ 480']
  }
] 