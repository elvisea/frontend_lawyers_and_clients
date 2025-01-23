import { JSX } from "react";

import {
  MedalIcon,
  MapIcon,
  PlaneIcon,
  GiftIcon
} from "../../../components/Icons";

export type Item = {
  icon: JSX.Element;
  title: string;
  description: string;
}

export type Features = Record<'clients' | 'lawyers', {
  title: string;
  description: string;
  items: Item[];
}>

export const features: Features = {
  clients: {
    title: "Como funciona a plataforma",
    description: 'Com apenas alguns passos, você pode descrever sua situação, enviar documentos e ser conectado rapidamente a um advogado experiente que pode ajudar você.',
    items: [
      {
        title: 'Descreva sua situação',
        description:
          'Preencha um breve formulário explicando o problema jurídico que você enfrenta. Quanto mais detalhes, melhor!',
        icon: <MedalIcon />,
      },
      {
        title: 'Envie documentos',
        description:
          'Adicione fotos, contratos ou outros arquivos importantes que ajudem os advogados a entenderem sua situação',
        icon: <MapIcon />,
      },
      {
        title: 'Nós avaliamos',
        description:
          'A plataforma analisa suas informações e documentos para garantir que os profissionais recebam um caso claro e bem definido.',
        icon: <PlaneIcon />,
      },
      {
        title: 'Conectamos você',
        description:
          'Os advogados inscritos terão acesso ao seu caso e poderão entrar em contato com você diretamente para oferecer suporte jurídico.',
        icon: <GiftIcon />,
      },
    ]
  },
  lawyers: {
    title: "Como funciona a plataforma",
    description: 'Com apenas alguns passos, você pode descrever sua situação, enviar documentos e ser conectado rapidamente a um advogado experiente que pode ajudar você.',
    items: [
      {
        title: 'Descreva sua situação',
        description:
          'Preencha um breve formulário explicando o problema jurídico que você enfrenta. Quanto mais detalhes, melhor!',
        icon: <MedalIcon />,
      },
      {
        title: 'Envie documentos',
        description:
          'Adicione fotos, contratos ou outros arquivos importantes que ajudem os advogados a entenderem sua situação',
        icon: <MapIcon />,
      },
      {
        title: 'Nós avaliamos',
        description:
          'A plataforma analisa suas informações e documentos para garantir que os profissionais recebam um caso claro e bem definido.',
        icon: <PlaneIcon />,
      },
      {
        title: 'Conectamos você',
        description:
          'Os advogados inscritos terão acesso ao seu caso e poderão entrar em contato com você diretamente para oferecer suporte jurídico.',
        icon: <GiftIcon />,
      },
    ]
  }
}

