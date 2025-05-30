import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import GoogleSignIn from "../components/GoogleSignIn";

function Login() {
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log('Login response:', response.data); // Debug log
      
      const { access, refresh, user } = response.data;
      
      if (!access) {
        throw new Error('No access token received');
      }

      // Store all tokens and user data
      localStorage.setItem('token', access);
      if (refresh) {
        localStorage.setItem('refreshToken', refresh);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <GoogleSignIn />

        <div className="text-center">
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
