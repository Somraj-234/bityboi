import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import GoogleSignIn from "../components/GoogleSignIn";
import {
  Mail,
  Check,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import OrangeButton from "@/components/OrangeButton.jsx";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password Must be at least 8 characters long'),
})


function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors([]);


    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const messages = result.error.errors.map(err => err.message);
      setValidationErrors(messages);
      return;
    }

    try {
      const response = await login(formData);
      console.log("Login response:", response.data); // Debug log

      const { access, refresh, user } = response.data;

      if (!access) {
        throw new Error("No access token received");
      }

      // Store all tokens and user data
      localStorage.setItem("token", access);
      if (refresh) {
        localStorage.setItem("refreshToken", refresh);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Wrong Credentials.");
    }
  };

  const isEmailValid = loginSchema.shape.email.safeParse(formData.email).success;
  const isPasswordValid = loginSchema.shape.password.safeParse(formData.password).success;



  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-80 sm:max-w-md rounded-2xl shadow-xl bg-gradient-to-b from-[#1F1C19] to-[#141415] px-4 sm:px-8 py-10 flex flex-col gap-4 relative border border-[#232325]">
        <div className="flex flex-col ">
          <h2 className="text-xl sm:text-3xl font-bold text-white text-center">
            Welcome Back!
          </h2>
          <p className="text-center text-[#b0b0b0] text-sm sm:text-base">
            Hey <span className="text-white font-semibold">lil bro</span>,
            please enter your details
          </p>
        </div>
        {(validationErrors.length > 0 || error) && (
          <div className=" border-red-400 text-red-700 px-4 py-2 rounded space-y-1 text-center">
            {validationErrors.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
            {error && <div>{error}</div>}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">

          {/* Email Field */}
          <div className="relative flex items-center justify-between border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
              <Mail className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" />
              <div className="h-6 border-r border-white/10" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="flex-1 bg-transparent outline-none text-white cursor-text text-sm sm:text-base"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {isEmailValid && <Check className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1" strokeWidth={4} />}
          </div>

          {/* Password Field */}
          <div className="relative flex items-center justify-between border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
            <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="text-[#b0b0b0] focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className='w-4 h-4 sm:w-5 sm:h-5' />
                ) : (
                  <Eye className='w-4 h-4 sm:w-5 sm:h-5' />
                )}
              </button>
              <div className="h-6 border-r border-white/10" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                className="bg-transparent outline-none text-white flex-1 cursor-text text-sm sm:text-base"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
              {isPasswordValid && (
                <Check  className="text-black bg-[#83F180] w-4 h-4 sm:w-5 sm:h-5 rounded-full p-1" strokeWidth={4} />
              )}
            
          </div>
          <div className="flex justify-end -mt-2 mb-2">
            <Link to="/forgot-password" className="text-sm text-[#b0b0b0] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <OrangeButton 
          rounded="rounded-2xl"
          width="w-full"
          type="submit"
          text="Sign In" />
          
        </form>
        <div className="text-center mt-2 text-[#b0b0b0] text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#FF7E2D] font-semibold hover:underline"
          >
            Sign up
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

export default Login;
