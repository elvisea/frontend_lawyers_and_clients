import Link from "next/link";

import { Button } from "./ui/button";

import { hero, HeroContent } from "@/app/constants/hero";

export type Keys = keyof HeroContent;

type Props = {
  resource: Keys
}

export const Hero = ({ resource }: Props) => {
  const item = hero[resource]

  return (
    <section className="min-h-[calc(100vh-3.5rem)] container flex flex-col items-center justify-center">
      <div className="text-center space-y-8 max-w-3xl">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              {item.title[0]}
            </span>{" "}
            {item.title[1]}
          </h1>{" "}
          {item.title[2]}{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              {item.title[3]}
            </span>{" "}
            {item.title[4]}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground whitespace-pre-line">
          {item.description}
        </p>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            asChild
          >
            <Link href={'/auth/sign-up'}>
              {item.button}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
