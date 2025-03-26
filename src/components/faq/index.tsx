import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { whatsAppClick } from "@/utils/whatsapp-click";

import { faq } from "./constants";
import { Item, Props } from "./types";

export const FAQ = ({ resource }: Props) => {

  const content = {
    faq: faq[resource],
  }

  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Dúvidas{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Frequentes
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {content.faq.map(({ question, answer }: Item) => (
          <AccordionItem
            key={question}
            value={question}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Ainda tem dúvidas?{" "}
        <button
          onClick={() => whatsAppClick(resource)}
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Entre em contato
        </button>
      </h3>
    </section>
  );
};
