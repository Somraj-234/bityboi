import React, { useState } from 'react'
import { registerUser } from '../api/api'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    })

    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (formData.password1 !== formData.password2) {
            setError('Passwords do not match');
            return;
        }
        try{
            const response = await registerUser(formData);
            console.log('Registration response:', response.data); 
            
            // dj-rest-auth returns access and refresh tokens on registration
            const { access, refresh, user } = response.data;
            
            if (!access) {
                throw new Error('No access token received');
            }

            localStorage.setItem('token', access);
            if (refresh) {
                localStorage.setItem('refreshToken', refresh);
            }
            localStorage.setItem('user', JSON.stringify(user));
            setIsAuthenticated(true);
            navigate('/dashboard', { replace: true });
        }catch(error){
            console.error('Signup failed:', error);
            setError(error.response?.data?.message || 'An error occurred');
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password1" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password1"
              id="password1"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.password1}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.password2}
              onChange={handleChange}
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup