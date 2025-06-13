import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string; agree?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'name') setName(value as string);
    if (field === 'email') setEmail(value as string);
    if (field === 'password') setPassword(value as string);
    if (field === 'confirmPassword') setConfirmPassword(value as string);
    if (field === 'agree') setAgree(value as boolean);

    setError((prevError) => ({
      ...prevError,
      [field]: '', 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formError = { ...error };

    if (!name) formError.name = 'Full name is required.';
    if (!email) formError.email = 'Email address is required.';
    if (!password) formError.password = 'Password is required.';
    if (password !== confirmPassword) formError.confirmPassword = 'Passwords do not match.';
    if (!agree) formError.agree = 'You must agree to the terms and privacy policy to continue.';

    if (formError.name || formError.email || formError.password || formError.confirmPassword || formError.agree) {
      setError(formError);
      return;
    }

    setError({});
    setLoading(true);

    try {
      await registerUser(email, password, name);
      navigate('/dashboard');
    } catch (err: any) {
      setLoading(false);
      setError({ general: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-4xl overflow-hidden border border-gray-200">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Take Control of Your Finances</h2>
          <p className="text-gray-500 mb-4 text-center">Create an account today to start tracking your expenses, setting budgets, and making informed financial decisions.</p>

          {error.general && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error.general}
            </div>
          )}

          <div className="mt-4 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <button
                type="button"
                className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 bg-white py-2 rounded-lg hover:bg-blue-50 transition text-sm text-blue-600"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <g>
                    <circle cx="24" cy="24" r="20" fill="#DBEAFE" />
                    <text x="24" y="30" textAnchor="middle" fontSize="18" fill="#2563EB" fontFamily="Arial">G</text>
                  </g>
                </svg>
                Sign up with Google
              </button>
              <button
                type="button"
                disabled
                className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 bg-white py-2 rounded-lg text-gray-900 opacity-60 cursor-not-allowed"
                title="Coming soon"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.365 1.43c0 1.14-.93 2.06-2.07 2.06-.04 0-.08 0-.12-.01-.17-1.09.95-2.05 2.07-2.05.04 0 .08 0 .12.01zM12.36 6.56c.87-.01 1.7.58 2.25.58.54 0 1.5-.75 2.63-.62.32.01 1.24.11 1.83.97-.05.03-1.09.63-1.08 1.89.02 1.5 1.34 2 1.36 2.01-.01.03-.21.71-.7 1.41-.43.62-.87 1.24-1.56 1.25-.67.01-.9-.41-1.68-.41-.78 0-1.03.39-1.68.42-.67.02-1.18-.67-1.61-1.29-.88-1.27-1.56-3.59-.65-5.16.45-.77 1.26-1.26 2.13-1.27zM12.36 19.82c.77 0 .98.64 1.63.62.67-.02 1.1-.96 1.51-1.91 1.08-2.36 1.89-6.68-.09-8.57-.72-.7-1.8-.72-2.37-.72-.57 0-1.63.02-2.37.72-1.98 1.89-1.16 6.21-.09 8.57.41.95.91 1.9 1.56 1.87.63-.04.86-.64 1.62-.64z"
                    fill="#111"
                  />
                </svg>
                Sign up with Apple
              </button>
            </div>
            <div className="flex items-center mb-4">
              <hr className="flex-1 border-gray-200" />
              <span className="mx-4 text-gray-400">Or</span>
              <hr className="flex-1 border-gray-200" />
            </div>
          </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your name"
            />
            {error.name && (
              <p className="text-red-500 text-xs mt-1">{error.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="you@example.com"
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error.email}</p>
            )}
          </div>

          {/* Password with eye icon */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 pr-10"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                minLength={8}
                placeholder="min 8 chars"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  // Eye open
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Eye closed
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.873 6.873A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.95M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
          </div>

          {/* Confirm Password with eye icon */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 pr-10"
                value={confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? (
                  // Eye open
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Eye closed
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.873 6.873A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.95M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
            {error.confirmPassword && <p className="text-red-500 text-xs mt-1">{error.confirmPassword}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => handleInputChange('agree', e.target.checked)}
              className="accent-blue-600"
            />
            <span className="text-gray-500 text-sm">
              I agree to the <a href="#" className="text-blue-600 underline">Terms & Privacy</a>
            </span>
            {error.agree && <p className="text-red-500 text-xs mt-1">{error.agree}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

          <div className="mt-6 text-center text-gray-500 text-sm">
            Have an account? <a href="/login" className="text-blue-600 underline">Sign in</a>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">2025 KashKeeper, All right Reserved</p>
        </div>

        {/* Right Panel Section */}
        <div className="hidden md:flex w-1/2 bg-blue-50 flex-col justify-center items-center text-blue-900 p-10 border-l border-gray-200">
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Track Your Spending with Confidence</h3>
          <p className="mb-8 text-blue-400">Join now and stay on top of your finances with a simple, powerful tracking tool.</p>
          <div className="w-full h-64 bg-white rounded-xl flex items-center justify-center border border-blue-100">
            <span className="text-4xl opacity-30 text-blue-300">[Dashboard Preview]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;