import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { HeroCards } from "./HeroCards";

type HeroProps = {
  title: string[];
  description: string;
  button: string;
}

export const Hero = ({ description, title, button }: HeroProps) => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              {title[0]}
            </span>{" "}
            {title[1]}
          </h1>{" "}
          {title[2]}{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              {title[3]}
            </span>{" "}
            {title[4]}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          {description}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">{button}</Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/elvisea"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
