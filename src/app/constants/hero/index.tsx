export type HeroContent = Record<'clients' | 'lawyers', {
  title: string[];
  description: string;
  button: string;
}>

export const hero: HeroContent = {
  clients: {
    title: ['Encontre', 'soluções', 'jurídicas', 'rápidas', 'e eficientes'],
    description: "Compartilhe sua situação, envie os documentos necessários e conecte-se com advogados especializados para obter a assistência que você precisa.",
    button: "Descreva sua Situação Agora"
  },
  lawyers: {
    title: ['Aumente', 'sua', 'carteira', 'de', 'clientes!'],
    description: "Conecte-se com pessoas que precisam dos seus serviços jurídicos.",
    button: "Cadastre-se Agora"
  }
}