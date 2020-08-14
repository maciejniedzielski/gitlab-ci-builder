import React, { createContext, FC, useState } from "react";

export interface AuthContextState {
  token: string | null;
  setToken: (token: string | null) => void;
}

const defaultValue: AuthContextState = {
  token: null,
  setToken: () => {},
};

export const AuthContext = createContext<AuthContextState>(defaultValue);

const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
