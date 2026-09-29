"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/apiClient";

export interface UserSession {
  id: string;
  userId?: string;
  email: string;
  name: string;
  role: "USER" | "VOLUNTEER" | "ADMIN" | "SUPER_ADMIN";
  phone?: string | null;
  city?: string | null;
  address?: string | null;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (userData: UserSession, token?: string) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  refreshUser: async () => {},
  isAdmin: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const res = await apiFetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          return;
        }
      }
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("abf_auth_token");
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (userData: UserSession, token?: string) => {
    setUser(userData);
    if (token && typeof window !== "undefined") {
      localStorage.setItem("abf_auth_token", token);
    }
  };

  const logout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("abf_auth_token");
      }
      setUser(null);
      router.push("/");
    }
  };

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
