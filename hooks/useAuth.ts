"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  userName?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });
  const router = useRouter();

  // Function to check if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      // Decode JWT token manually (basic implementation)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decodedToken = JSON.parse(jsonPayload);
      const currentTime = Date.now() / 1000;
      
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // If we can't decode, assume expired
    }
  };

  // Function to validate authentication
  const validateAuth = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (!accessToken || !storedUser) {
      return false;
    }

    // Check if access token is expired
    if (isTokenExpired(accessToken)) {
      console.warn("🔄 Access token expired, attempting refresh...");
      
      if (!refreshToken || isTokenExpired(refreshToken)) {
        console.error("❌ Refresh token also expired or missing");
        clearAuth();
        return false;
      }

      // Try to refresh the token
      try {
        const response = await fetch('http://localhost:8080/api/user/refreshTokenApi', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          // Save new tokens
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          
          console.log("✅ Token refreshed successfully");
          return true;
        } else {
          console.error("❌ Token refresh failed");
          clearAuth();
          return false;
        }
      } catch (error) {
        console.error("❌ Error refreshing token:", error);
        clearAuth();
        return false;
      }
    }

    return true;
  };

  // Function to clear authentication data
  const clearAuth = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  // Function to set authentication data
  const setAuth = (accessToken: string, refreshToken: string, user: User) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
      isLoading: false,
    });
  };

  // Function to logout
  const logout = () => {
    clearAuth();
    router.push("/login");
  };

  // Initialize authentication state
  useEffect(() => {
    const checkAuth = async () => {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const isValid = await validateAuth();
      
      if (isValid) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setAuthState({
            isAuthenticated: true,
            user: JSON.parse(storedUser),
            isLoading: false,
          });
        } else {
          clearAuth();
        }
      } else {
        clearAuth();
      }
    };

    checkAuth();
  }, []);

  return {
    ...authState,
    setAuth,
    logout,
    validateAuth,
    clearAuth,
  };
}