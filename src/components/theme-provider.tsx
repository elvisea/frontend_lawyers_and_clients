'use client'

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

// Alterando o tipo de 'theme' para 'Theme | null'
type ThemeProviderState = {
  theme: Theme | null; // Agora o tema pode ser 'null' enquanto está sendo carregado
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: null, // Inicializa como 'null'
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(null); // Inicializa como 'null'
  const [isLoading, setIsLoading] = useState(true); // Para verificar se o tema foi carregado

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey);
      setTheme(storedTheme ? (storedTheme as Theme) : defaultTheme);
      setIsLoading(false); // Marca o carregamento como concluído
    }
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (theme === null || isLoading) return; // Não faz nada enquanto estiver carregando

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isLoading]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme);
      }
      setTheme(theme);
    },
  };

  if (isLoading) {
    return null; // Não renderiza até que o tema esteja definido
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
