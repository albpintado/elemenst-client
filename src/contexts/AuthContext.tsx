import { createContext, useContext, useState } from "react";
import { getToken } from "utils/Authentication";

interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const logInStatus = getToken() ? true : false;
  const [isAuthenticated, setIsAuthenticated] = useState(logInStatus);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
};

export { AuthProvider, useAuth };
