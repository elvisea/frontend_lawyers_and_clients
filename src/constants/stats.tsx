import { Users, Scale, CheckCircle2, Award } from 'lucide-react'

export const stats = [
  {
    icon: <Users className="h-12 w-12" color="green" />,
    value: '+2.500',
    label: 'Advogados Especialistas',
    description: 'Profissionais verificados e prontos para ajudar'
  },
  {
    icon: <Scale className="h-12 w-12" color="green" />,
    value: '+5.000',
    label: 'Casos Atendidos',
    description: 'Histórico de casos resolvidos com sucesso'
  },
  {
    icon: <CheckCircle2 className="h-12 w-12" color="green" />,
    value: '98%',
    label: 'Taxa de Satisfação',
    description: 'Clientes satisfeitos com o atendimento'
  },
  {
    icon: <Award className="h-12 w-12" color="green" />,
    value: '5 Anos',
    label: 'De Experiência',
    description: 'Conectando pessoas à justiça desde 2019'
  }
]