import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContextType } from './types';

const baseURL = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  const verifyToken = useCallback(async () => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const res = await axios.get(`${baseURL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = useCallback(async ({ email, password }: { email: string; password: string; }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setError(null);
    } catch (error: any) { // eslint-disable-line
      setIsAuthenticated(false);
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, error, setError, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
