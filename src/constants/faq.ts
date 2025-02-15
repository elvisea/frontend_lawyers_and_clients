

export type Item = {
  question: string;
  answer: string;
}

export const client: Item[] = [
  {
    question: "Como funciona o processo de busca por um advogado?",
    answer: "Você descreve sua situação jurídica através de um formulário simples, anexa documentos relevantes e nossa plataforma conecta você com advogados especializados na sua necessidade. Os profissionais analisam seu caso e entram em contato diretamente com você."
  },
  {
    question: "Quanto custa usar a plataforma?",
    answer: "O cadastro e a descrição do seu caso são totalmente gratuitos. Você só paga quando decidir contratar um advogado, e os valores são acordados diretamente com o profissional escolhido."
  },
  {
    question: "Como posso ter certeza da qualificação dos advogados?",
    answer: "Todos os advogados em nossa plataforma passam por um rigoroso processo de verificação. Confirmamos o registro na OAB, experiência profissional e mantemos um sistema de avaliações de clientes anteriores."
  },
  {
    question: "Meus dados e informações estão seguros?",
    answer: "Sim! Utilizamos tecnologia de ponta em segurança digital para proteger suas informações. Todos os dados são criptografados e seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados)."
  },
  {
    question: "Como faço para acompanhar meu caso?",
    answer: "Após conectar-se com um advogado, você terá acesso a uma área exclusiva onde poderá acompanhar todas as atualizações, trocar mensagens com o profissional e visualizar documentos relacionados ao seu caso."
  },
  {
    question: "Posso trocar de advogado se não estiver satisfeito?",
    answer: "Sim. Se por qualquer motivo você não estiver satisfeito, pode buscar outro profissional na plataforma. Nosso objetivo é garantir que você encontre o advogado ideal para seu caso."
  },
  {
    question: "Em quanto tempo recebo retorno dos advogados?",
    answer: "Normalmente, você começa a receber respostas dos advogados em até 24 horas após publicar seu caso. O tempo pode variar dependendo da complexidade e especialidade necessária."
  },
  {
    question: "Que tipos de casos posso cadastrar na plataforma?",
    answer: "Nossa plataforma atende diversas áreas do direito, incluindo civil, trabalhista, familiar, consumidor, entre outras. Ao descrever seu caso, você será direcionado para advogados especializados na área específica."
  }
]

export const lawyer: Item[] = [
  {
    question: "Is this template free?",
    answer: "Yes. It is a free ChadcnUI template.",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet  Consectetur natus dolores minus quibusdam?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis necessitatibus maxime quis ipsa vitae cumque quo?",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit?",
    answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur natus?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
  },
]

export type Keys = 'client' | 'lawyer';

export const faq: Record<Keys, Item[]> = {
  client: client,
  lawyer: lawyer
}