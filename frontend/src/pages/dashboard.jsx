import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function dashboard() {
  
    const { logout } = useAuth()
    const handleLogout = () => {
        logout()
    }

    // In your Dashboard component
useEffect(() => {
  console.log('Dashboard mounted');
  console.log('Token in localStorage:', localStorage.getItem('token'));
  console.log('User in localStorage:', localStorage.getItem('user'));
}, []);


  return (
    <div className='w-full h-screen bg-black text-white'>
        <h1>Dashboard</h1>
        <button className='text-red-500 border border-red-500 rounded-md px-4 py-2 mt-16 cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default dashboard