import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/home'
import Dashboard from '../pages/dashboard'
import Signup from '../pages/signup'
import Login from '../pages/login'
import { AuthProvider, useAuth } from '../context/AuthContext'
import GoogleCallback from '../pages/GoogleCallback'
import Layout from '../components/Layout'
import ForgotPassword from '@/pages/ForgotPassword'

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Dashboard route without Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/auth/google/callback" element={<GoogleCallback/>} />
        <Route path="/" element={<Home />} />
      </Route>
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
