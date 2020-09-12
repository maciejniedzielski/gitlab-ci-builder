import React, { createContext, FC, useState } from "react";

export enum AppTheme {
  LIGHT = "light",
  DARK = "dark",
}

export interface ThemeContextState {
  theme: string;
  setTheme: (theme: AppTheme) => void;
}

const defaultValue: ThemeContextState = {
  theme: AppTheme.LIGHT,
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextState>(defaultValue);

const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.LIGHT);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
