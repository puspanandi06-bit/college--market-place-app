import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("@cm_token");
        if (storedToken) {
          const me = await authApi.me(storedToken);
          setUser(me.user || me);
          setToken(storedToken);
        }
      } catch {
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (email, password) => {
    const result = await authApi.login(email, password);
    const nextToken = result.token;
    const nextUser = result.user || result;
    if (nextToken) {
      await AsyncStorage.setItem("@cm_token", nextToken);
    }
    setToken(nextToken);
    setUser(nextUser);
    return result;
  };

  const signup = async (email, password, displayName) => {
    const result = await authApi.signup(displayName, email, password);
    const nextToken = result.token;
    const nextUser = result.user || result;
    if (nextToken) {
      await AsyncStorage.setItem("@cm_token", nextToken);
    }
    setToken(nextToken);
    setUser(nextUser);
    return result;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@cm_token");
    setToken(null);
    setUser(null);
  };

  const value = { user, token, loading, login, signup, logout };

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

