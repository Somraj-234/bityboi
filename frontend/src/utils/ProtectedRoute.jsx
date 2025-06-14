import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
  const {isAuthenticated} = useAuth();

  return (
    isAuthenticated ? children : <Navigate to="/login" />
  )
}

export default ProtectedRoute