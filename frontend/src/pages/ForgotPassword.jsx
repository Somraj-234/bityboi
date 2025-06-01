import React, { useState, useRef, useEffect } from "react";
import { Mail, Check, KeyRound, Eye, EyeOff } from "lucide-react";
import { requestPasswordResetOTP, verifyOTP, resetPassword } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import OrangeButton from "@/components/OrangeButton";

const emailSchema = z.string().min(1, 'Email is required').email('Invalid email address');
const otpSchema = z.string().length(6, 'OTP must be 6 digits');
const passwordSchema = z.object({
  new_password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      otp: otp.join('')
    }));
  }, [otp]);
  
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);
    setIsLoading(true);

    const result = emailSchema.safeParse(formData.email);
    if (!result.success) {
      const messages = result.error.errors.map(err => err.message);
      setValidationErrors(messages);
      return;
    }

    try {
      await requestPasswordResetOTP(formData.email);
      setOtpSent(true);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error?.response?.data?.message || error.message || 'An error occurred');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);

    const result = otpSchema.safeParse(formData.otp);
    if (!result.success) {
      const messages = result.error.errors.map(err => err.message);
      setValidationErrors(messages);
      return;
    }

    try {
      await verifyOTP(formData.email, formData.otp);
      setOtpVerified(true);
      setError(null);
    } catch (error) {
      setError(error?.response?.data?.message || error.message || 'An error occurred');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);

    const result = passwordSchema.safeParse({
      new_password: formData.new_password,
      confirm_password: formData.confirm_password
    });
    if (!result.success) {
      const messages = result.error.errors.map(err => err.message);
      setValidationErrors(messages);
      return;
    }

    try {
      await resetPassword(
        formData.email,
        formData.new_password,
        formData.confirm_password
      );
      setResetSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error?.response?.data?.message || error.message || 'An error occurred');
    }
  };

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (!value) return;
    let newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);
    if (idx < 5 && value) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        let newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        inputsRef.current[idx - 1].focus();
        let newOtp = [...otp];
        newOtp[idx - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(''));
      inputsRef.current[5].focus();
      e.preventDefault();
    }
  };

  const isEmailValid = emailSchema.safeParse(formData.email).success;

  const otpValue = otp.join('');

  const isPasswordValid = formData.new_password.length >= 8;
  const isConfirmPasswordValid = formData.confirm_password.length >= 8 && formData.new_password === formData.confirm_password;

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-80 sm:max-w-md rounded-2xl shadow-xl bg-gradient-to-b from-[#1F1C19] to-[#141415] px-4 sm:px-8 py-10 flex flex-col gap-4 relative border border-[#232325]">
        <div className="flex flex-col ">
          <h2 className="text-xl sm:text-3xl font-bold text-white text-center">
            Reset Password
          </h2>
          <p className="text-center text-[#b0b0b0] text-sm sm:text-base">
            {!otpSent ? "Enter your email to receive an OTP" : 
             !otpVerified ? "Enter the OTP sent to your email" :
             "Enter your new password"}
          </p>
        </div>
        {(validationErrors.length > 0 || error) && (
          <div className="border-red-400 text-red-700 px-4 py-2 rounded space-y-1 text-center">
            {validationErrors.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
            {error && <div>{error}</div>}
          </div>
        )}
        <form onSubmit={
          !otpSent ? handleRequestOTP :
          !otpVerified ? handleVerifyOTP :
          handleResetPassword
        } className="flex flex-col gap-4 pt-4">
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
                disabled={otpSent}
              />
            </div>
            {isEmailValid && (
              <Check
                className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1"
                strokeWidth={4}
              />
            )}
          </div>

          {otpSent && !otpVerified && (
            <div className="flex justify-center gap-2 my-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => inputsRef.current[idx] = el}
                  type="text"
                  maxLength={1}
                  className={`w-14 h-14 text-center text-white text-2xl rounded-lg border-2 ${digit ? 'border-white/50' : 'border-white/10'} focus:border-white transition`}
                  value={digit}
                  onChange={e => handleOtpChange(e, idx)}
                  onKeyDown={e => handleOtpKeyDown(e, idx)}
                  onPaste={handleOtpPaste}
                  autoFocus={idx === 0}
                />
              ))}
            </div>
          )}

          {otpVerified && (
            <>
              <div className="relative flex items-center border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2">
                <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="focus:outline-none"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                  <div className="h-6 border-r border-white/10" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="new_password"
                    id="new_password"
                    placeholder="Enter new password"
                    required
                    minLength={8}
                    className="flex-1 bg-transparent outline-none text-white cursor-text text-sm sm:text-base"
                    value={formData.new_password}
                    onChange={handleChange}
                  />
                </div>
                {isPasswordValid && (
                  <Check className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1" strokeWidth={4} />
                )}
              </div>

              <div className="relative flex items-center border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-1 sm:gap-2">
                <div className="flex items-center gap-2 sm:gap-4 flex-1 w-full">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="focus:outline-none"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="text-[#b0b0b0] w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                  <div className="h-6 border-r border-white/10" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm new password"
                    required
                    minLength={8}
                    className="flex-1 bg-transparent outline-none text-white cursor-text text-sm sm:text-base"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                </div>
                {isConfirmPasswordValid && (
                  <Check className="text-black w-4 h-4 sm:w-5 sm:h-5 bg-[#83F180] rounded-full p-1" strokeWidth={4} />
                )}
              </div>
            </>
          )}

          <OrangeButton
            isLoading={isLoading}
            loadingText={isLoading && "Sending OTP..."}
            rounded="rounded-2xl"
            width="w-full"
            type="submit"
            text={
              !otpSent ? "Send OTP" :
              !otpVerified ? "Verify OTP" :
              "Reset Password"
            }
          />
        </form>
        {resetSuccess && (
          <div className="text-center text-green-400 mt-2">
            Password reset successful. Redirecting to <span className="underline">login page</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
