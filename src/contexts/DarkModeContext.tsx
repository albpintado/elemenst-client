import { createContext, useContext, useState } from "react";

interface DarkModeContextData {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeContext = createContext({} as DarkModeContextData);

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const darkModeContext = useContext(DarkModeContext);

  if (darkModeContext === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return darkModeContext;
};

export { DarkModeProvider, useDarkMode };
