import React, { useState, useEffect } from 'react';
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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const navigate = useNavigate();

  // Handle Google OAuth callback (same as login)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const error = params.get('error');
    
    if (error) {
      setError({ general: decodeURIComponent(error) });
      setIsGoogleLoading(false);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (token) {
      localStorage.setItem('accessToken', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      const userInfo = params.get('user');
      if (userInfo) {
        try {
          const user = JSON.parse(decodeURIComponent(userInfo));
          localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
          console.error('Error parsing user info:', e);
        }
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/dashboard');
    }
  }, [navigate]);

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

    if (!name.trim()) formError.name = 'Full name is required.';
    if (!email.trim()) formError.email = 'Email address is required.';
    if (!password) formError.password = 'Password is required.';
    if (password.length < 8) formError.password = 'Password must be at least 8 characters.';
    if (password !== confirmPassword) formError.confirmPassword = 'Passwords do not match.';
    if (!agree) formError.agree = 'You must agree to the terms and privacy policy to continue.';

    if (formError.name || formError.email || formError.password || formError.confirmPassword || formError.agree) {
      setError(formError);
      return;
    }

    setError({});
    setLoading(true);

    try {
      const response = await registerUser(name.trim(), email.trim(), password);
      
      // Check if response indicates verification is required
      if (response.requiresVerification) {
        setRegistrationSuccess(true);
        setRegisteredEmail(response.email);
      } else {
        localStorage.setItem('accessToken', response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true);
    setError({});
    
    sessionStorage.setItem('returnTo', window.location.pathname);
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    window.location.href = `${apiUrl}/auth/google`;
  };

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: registeredEmail }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setError({ general: '' });
        // Show success message (you could add a success state)
        alert('Verification email sent! Please check your inbox.');
      } else {
        setError({ general: data.message });
      }
    } catch (err: any) {
      setError({ general: 'Failed to resend verification email. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 p-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email! 📧</h2>
            
            <p className="text-gray-600 mb-6">
              We've sent a verification link to:
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <p className="font-medium text-blue-800">{registeredEmail}</p>
            </div>

            <div className="space-y-4 text-sm text-gray-600">
              <p>📱 Check your inbox (and spam folder) for the verification email.</p>
              <p>🔗 Click the verification link to activate your account.</p>
              <p>⏰ The link will expire in 24 hours.</p>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  'Resend Verification Email'
                )}
              </button>

              <button
                onClick={() => navigate('/login')}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Back to Login
              </button>
            </div>

            {error.general && (
              <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md text-sm">
                {error.general}
              </div>
            )}

            <p className="mt-6 text-xs text-gray-400">
              Didn't receive the email? Check your spam folder or try resending.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Regular signup form
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-4xl overflow-hidden border border-gray-200">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Take Control of Your Finances</h2>
          <p className="text-gray-500 mb-4 text-center">Create an account today to start tracking your expenses, setting budgets, and making informed financial decisions.</p>

          {error.general && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 flex items-center justify-between">
              <span>{error.general}</span>
              <button
                type="button"
                onClick={() => setError({ ...error, general: '' })}
                className="text-red-400 hover:text-red-600 focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <div className="mt-4 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <button
                type="button"
                disabled={isGoogleLoading}
                onClick={handleGoogleSignUp}
                className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 bg-white py-2 rounded-lg hover:bg-blue-50 transition text-sm text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
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
              placeholder="Your full name"
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
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542 7a9.956 9.956 0 012.293-3.95M6.873 6.873A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.95M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
            {error.confirmPassword && <p className="text-red-500 text-xs mt-1">{error.confirmPassword}</p>}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => handleInputChange('agree', e.target.checked)}
              className="accent-blue-600 mt-0.5"
            />
            <div className="flex-1">
              <span className="text-gray-500 text-sm">
                I agree to the <a href="#" className="text-blue-600 underline">Terms & Privacy</a>
              </span>
              {error.agree && <p className="text-red-500 text-xs mt-1">{error.agree}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
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