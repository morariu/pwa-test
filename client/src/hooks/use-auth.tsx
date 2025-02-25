import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User as SelectUser, InsertUser } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { storage } from "../lib/local-storage";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: InsertUser) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<SelectUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = storage.getUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await storage.login(email, password);
      setUser(user);
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (data: InsertUser) => {
    try {
      const user = await storage.register(data);
      setUser(user);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    storage.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Intercept and modify redirects
  const modifiedContext = {
    ...context,
    login: async (...args: Parameters<typeof context.login>) => {
      const result = await context.login(...args);
      window.location.href = '/pwa-test';
      return result;
    },
    logout: () => {
      context.logout();
      window.location.href = '/pwa-test/auth';
    }
  };

  return modifiedContext;
}