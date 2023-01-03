import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext<{
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}>({
  error: "",
  setError: () => null,
});

const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string>("");
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useError = () => {
  const errorContext = useContext(ErrorContext);

  if (errorContext === undefined) {
    throw new Error("useError must be used within a ErrorProvider");
  }

  return errorContext;
};

export { ErrorProvider, useError };
