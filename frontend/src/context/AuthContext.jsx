import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginUser, getUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing tokens and user data on mount
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);

      // Set up axios defaults
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login", { replace: true });
  };

  const login = async (formData) => {
    try {
      const response = await loginUser(formData);
      console.log("Login response:", response.data); // Debug log

      const { access, refresh, user } = response.data;

      if (!access) {
        throw new Error("No access token received");
      }

      console.log("Storing tokens:", { access, refresh }); // Debug log
      localStorage.setItem("token", access);
      if (refresh) {
        localStorage.setItem("refreshToken", refresh);
      } else {
        console.warn("No refresh token received in login response"); // Debug log
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setUser(user);
      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const socialLogin = async (authData) => {
    try {
      console.log("Social login data received:", authData);

      // Handle different possible response structures from social auth
      const access = authData.access_token || authData.access;
      const refresh = authData.refresh_token || authData.refresh;
      const userData = authData.user;

      if (!access) {
        throw new Error("No access token received from social login");
      }

      console.log("Storing social auth tokens:", { access, refresh });

      // Store tokens
      localStorage.setItem("token", access);

      if (refresh) {
        localStorage.setItem("refreshToken", refresh);
        console.log("Refresh token stored successfully");
      } else {
        console.warn("No refresh token received from social login");
      }

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      // Set up axios defaults
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      // Update state
      setUser(userData);
      setIsAuthenticated(true);

      console.log("Social login successful, navigating to dashboard");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Social login failed:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        login,
        socialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
