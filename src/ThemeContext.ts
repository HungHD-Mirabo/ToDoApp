// ThemeContext.ts
import React from "react";

export const ThemeContext = React.createContext<{
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
} | null>(null);
