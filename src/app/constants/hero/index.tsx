export const hero = {
  clients: {
    title: ["Justiça", "ao seu", "alcance", "de forma", "simples"],
    description: `Entendemos que problemas jurídicos podem ser intimidadores.

Por isso, criamos uma forma simples e segura de conectar você aos melhores advogados especializados na sua necessidade.

Receba atendimento humanizado, acompanhamento transparente e resolva sua situação com tranquilidade.`,
    button: "Resolver Meu Caso",
  },
  lawyers: {
    title: ["Conecte-se", "com clientes", "ideais", "para seu", "escritório"],
    description: `Expanda sua atuação de forma inteligente.

Receba casos alinhados com sua especialidade, gerencie seus processos e acompanhe tudo em um só lugar.

Dedique mais tempo ao que realmente importa: exercer a advocacia com excelência.`,
    button: "Começar Agora",
  },
} as const;

export type HeroContent = typeof hero;