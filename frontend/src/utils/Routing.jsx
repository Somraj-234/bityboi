import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/home'
import Dashboard from '../pages/dashboard'
import Signup from '../pages/signup'
import Login from '../pages/login'
import { AuthProvider, useAuth } from '../context/AuthContext'
import GoogleCallback from '../pages/GoogleCallback'

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/auth/google/callback" element={<GoogleCallback/>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

function Routing() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routing
