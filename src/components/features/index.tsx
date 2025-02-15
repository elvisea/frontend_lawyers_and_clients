import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import Image from "next/image";

import { CardProps, Keys } from "./types";
import { cards, features, } from "./constants";

type Props = { resource: Keys }

export const Features = ({ resource }: Props) => {

  const content = {
    cards: cards[resource],
    features: features[resource]
  }

  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {content.features.map((feature) => (
          <div key={feature.title}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature.title}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.cards.map(({ title, description, image }: CardProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                alt="About feature"
                width={300}
                height={300}
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
