import {createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import type { User, UserRole } from "../type";

type AuthContextType = {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Restore session
  useEffect(() => {
    const stored = localStorage.getItem("auth-user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (role: UserRole) => {
    const loggedInUser: User = {
      id: crypto.randomUUID(),
      name: "Demo User",
      role,
    };

    setUser(loggedInUser);
    localStorage.setItem("auth-user", JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
