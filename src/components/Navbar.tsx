'use client'

import { useState } from "react";
import { useRouter, usePathname } from 'next/navigation'
import { Menu } from "lucide-react";

import Link from "next/link";
import { buttonVariants } from "./ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LogoIcon } from "./Icons";
import { ModeToggle } from "./mode-toggle";

const routes = [
  {
    href: "/landing/clients",
    label: "Clientes",
    isExternal: false
  },
  {
    href: "/landing/lawyers",
    label: "Advogados",
    isExternal: false
  },
  {
    href: "#features",
    label: "Recursos",
    isExternal: true
  },
  {
    href: "#services",
    label: "Serviços",
    isExternal: true
  },
  {
    href: "#testimonials",
    label: "Depoimentos",
    isExternal: true
  },
  {
    href: "#faq",
    label: "Dúvidas",
    isExternal: true
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const getSignUpPath = () => {
    if (pathname.startsWith('/landing/clients')) {
      return '/auth/sign-up?type=CLIENT';
    }
    if (pathname.startsWith('/landing/lawyers')) {
      return '/auth/sign-up?type=LAWYER';
    }
    return '/landing/clients'; // fallback para landing de clientes
  };

  const handleNavigation = (href: string, isExternal: boolean) => {
    setIsOpen(false)
    if (isExternal) {
      window.location.href = href
      return
    }
    router.push(href)
  }

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex">
              <LogoIcon />
              Lex Omni
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex lg:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex lg:hidden h-5 w-5">
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Lex Omni
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routes.map((route) => (
                    <button
                      key={route.label}
                      onClick={() => handleNavigation(route.href, route.isExternal)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {route.label}
                    </button>
                  ))}
                  <Link
                    href="/auth/sign-in"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Entrar
                  </Link>
                  <Link
                    href={getSignUpPath()}
                    className={buttonVariants({ variant: "default" })}
                  >
                    Criar Conta
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden lg:flex gap-2">
            {routes.map((route, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(route.href, route.isExternal)}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/auth/sign-in"
              className={buttonVariants({ variant: "ghost" })}
            >
              Entrar
            </Link>
            <Link
              href={getSignUpPath()}
              className={buttonVariants({ variant: "default" })}
            >
              Criar Conta
            </Link>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
