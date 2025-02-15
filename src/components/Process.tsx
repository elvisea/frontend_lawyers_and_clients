import {
  MedalIcon,
  MapIcon,
  PlaneIcon,
  GiftIcon
} from "@/components/Icons";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "./ui/card";

export const content = {
  title: "Como Funciona o Processo",
  subtitle: "Resolva seu problema jurídico em poucos passos",
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
} as const

export const Process = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-bold md:text-4xl text-center">{content.title}</h2>

        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-center">
          {content.subtitle}
        </p>
      </div>

      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground text-center">
        {content.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {content.items.map((item) => (
          <Card
            key={item.title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {item.icon}
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">{item.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
