import React, { useState } from 'react'
import { registerUser } from '../api/api'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Check, Eye, EyeOff, KeyRound, User, AtSign } from 'lucide-react';
import OrangeButton from '@/components/OrangeButton.jsx';
import GoogleSignIn from '../components/GoogleSignIn';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password1: z.string().min(8, 'Password must be at least 8 characters'),
  password2: z.string().min(8, 'Confirm Password must be at least 8 characters'),
});

function Signup() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    })
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setValidationErrors([]);
        // Zod validation
        const result = signupSchema.safeParse(formData);
        let errors = [];
        if (!result.success) {
            errors = result.error.errors.map(err => err.message);
        }
        if (formData.password1 !== formData.password2) {
            errors.push('Passwords do not match');
        }
        if (errors.length > 0) {
            setValidationErrors(errors);
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

    // Field validation for check icons
    const isUsernameValid = signupSchema.shape.username.safeParse(formData.username).success;
    const isEmailValid = signupSchema.shape.email.safeParse(formData.email).success;
    const isPassword1Valid = signupSchema.shape.password1.safeParse(formData.password1).success;
    const isPassword2Valid = formData.password2.length >= 8 && formData.password1 === formData.password2;

    return (
      <div className="w-full flex items-center justify-center overflow-y-auto h-screen">
        <div className="w-full max-w-80 sm:max-w-md rounded-2xl shadow-xl bg-gradient-to-b from-[#1F1C19] to-[#141415] px-4 sm:px-8 py-10 flex flex-col gap-4 relative border border-[#232325]">
          <div className="flex flex-col ">
            <h2 className="text-xl sm:text-3xl font-bold text-white text-center mb-1">New Here?</h2>
            <p className="text-center text-[#b0b0b0] mb-4 text-sm sm:text-base">Enter your details &amp; join the <span className="font-bold text-white">boi&apos;s club</span></p>
          </div>
          {(validationErrors.length > 0 || error) && (
            <div className="border-red-400 text-red-700 px-4 py-2 rounded space-y-1 text-center">
              {validationErrors.map((msg, idx) => (
                <div key={idx}>{msg}</div>
              ))}
              {error && <div>{error}</div>}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
            {/* Username Field */}
            <div className="relative flex items-center justify-between border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2 ">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
                <AtSign className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" />
                <div className="h-6 border-r border-white/10" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required
                  autoComplete="username"
                  className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {isUsernameValid && <Check className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1" strokeWidth={4} />}
            </div>
            {/* Email Field */}
            <div className="relative flex items-center justify-between border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2 ">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
                <Mail className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" />
                <div className="h-6 border-r border-white/10" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {isEmailValid && <Check className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1" strokeWidth={4} />}
            </div>
            {/* Password1 Field */}
            <div className="relative flex items-center justify-between border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2 ">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
                {/* <KeyRound className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" /> */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword1((v) => !v)}
                  className="text-[#b0b0b0] focus:outline-none cursor-pointer"
                >
                  {showPassword1 ? (
                    <EyeOff className='w-4 h-4 sm:w-5 sm:h-5' />
                  ) : (
                    <Eye className='w-4 h-4 sm:w-5 sm:h-5' />
                  )}
                </button>
                <div className="h-6 border-r border-white/10" />
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="password1"
                  id="password1"
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base"
                  value={formData.password1}
                  onChange={handleChange}
                />
              </div>
                {isPassword1Valid && <Check className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1" strokeWidth={4} />}
             
            </div>
            {/* Password2 Field */}
            <div className="relative flex items-center justify-between border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2 ">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
                {/* <KeyRound className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" /> */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword2((v) => !v)}
                  className="text-[#b0b0b0] focus:outline-none cursor-pointer"
                >
                  {showPassword2 ? (
                    <EyeOff className='w-4 h-4 sm:w-5 sm:h-5' />
                  ) : (
                    <Eye className='w-4 h-4 sm:w-5 sm:h-5' />
                  )}
                </button>
                <div className="h-6 border-r border-white/10" />
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="password2"
                  id="password2"
                  placeholder="Confirm Password"
                  required
                  autoComplete="new-password"
                  className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base "
                  value={formData.password2}
                  onChange={handleChange}
                />
              </div>
                {isPassword2Valid && <Check className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1" strokeWidth={4} />}
             
            </div>
            <OrangeButton 
              rounded="rounded-2xl"
              width="w-full"
              type="submit"
              text="Sign Up"
            />
          </form>
          <div className="text-center mt-2 text-[#b0b0b0] text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF7E2D] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-[#232325]" />
            <span className="text-[#b0b0b0] text-xs">or</span>
            <div className="flex-1 h-px bg-[#232325]" />
          </div>
          <GoogleSignIn />
        </div>
      </div>
    );
}

export default Signup;