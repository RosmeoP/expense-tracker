import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import dashboardImg from '../assets/login.png'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const error = params.get('error');
    
    if (error) {
      setError(decodeURIComponent(error));
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
      localStorage.setItem('loginTime', Date.now().toString());
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowGooglePrompt(false);
    setShowVerificationPrompt(false);
    
    try {
      const response = await loginUser(email, password);
      
      localStorage.setItem('accessToken', response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      const errorData = error.response?.data;
      
      if (errorData?.useGoogleAuth) {
        setShowGooglePrompt(true);
        setError('This account uses Google Sign-In. Please use the Google button below.');
      } else if (errorData?.requiresVerification) {
        setShowVerificationPrompt(true);
        setUnverifiedEmail(errorData.email || email);
        setError('Please verify your email address before logging in. Check your inbox for the verification link.');
      } else {
        setError(errorData?.message || error.message || 'An unknown error occurred.');
      }
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setError(null);
    setShowGooglePrompt(false);
    setShowVerificationPrompt(false);
    
    sessionStorage.setItem('returnTo', window.location.pathname);
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    window.location.href = `${apiUrl}/auth/google`;
  };

  const handleResendVerification = async () => {
    try {
      setIsResendingVerification(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: unverifiedEmail }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setError('Verification email sent! Please check your inbox and spam folder.');
        setShowVerificationPrompt(false);
      } else {
        setError(data.message || 'Failed to resend verification email.');
      }
    } catch (err: any) {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setIsResendingVerification(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full border border-gray-200">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="/logo192.png" alt="Expense Tracker Logo" className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-4">Sign In</h2>
          <p className="text-center text-gray-500 mb-8">Welcome back! Please enter your details</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className={`flex items-center justify-between ${
                showGooglePrompt 
                  ? 'bg-blue-100 border-blue-300 text-blue-700' 
                  : showVerificationPrompt
                  ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
                  : 'bg-red-100 border-red-300 text-red-700'
              } px-4 py-3 rounded-lg mb-2 shadow animate-fade-in`}>
                <div className="flex items-center gap-2">
                  {showGooglePrompt ? (
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                    </svg>
                  ) : showVerificationPrompt ? (
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                    </svg>
                  )}
                  <span className="font-medium">{error}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setShowGooglePrompt(false);
                    setShowVerificationPrompt(false);
                  }}
                  className={`ml-4 ${
                    showGooglePrompt 
                      ? 'text-blue-400 hover:text-blue-600' 
                      : showVerificationPrompt
                      ? 'text-yellow-400 hover:text-yellow-600'
                      : 'text-red-400 hover:text-red-600'
                  } focus:outline-none`}
                  aria-label="Dismiss error"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Verification Resend Button */}
            {showVerificationPrompt && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-yellow-700">
                      Email verification required for: <strong>{unverifiedEmail}</strong>
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResendingVerification}
                  className="mt-3 w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isResendingVerification ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Resend Verification Email'
                  )}
                </button>
              </div>
            )}
            
            <div>
              <label className="block text-base font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-base font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center text-base text-gray-500">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="mr-2 accent-blue-600"
                />
                Remember for 30 days
              </label>
              <a href="/forgot-password" className="text-base text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign in
            </button>
            
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-3 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <button
              type="button"
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white py-3 rounded-lg hover:bg-blue-50 transition text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGoogleLogin}
            >
              {isGoogleLoading ? (
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>        
            <p className="text-center text-base text-gray-500 mt-5">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
        
        {/* Right: Welcome Panel */}
        <div className="hidden md:flex flex-col w-1/2 bg-blue-50 text-gray-900 border-l border-gray-200">
          <div className="px-12 py-10 flex-shrink-0">
            <h2 className="text-4xl font-bold mb-4 text-center text-blue-600">Welcome back!</h2>
            <p className="text-xl font-semibold mb-4 text-center text-gray-400">Please sign in to your Expense Tracker account</p>
            <p className="text-center text-gray-400">
              Track your expenses, analyze your spending, and reach your financial goals.
            </p>
          </div>
          
          <div className="flex-1 p-6">
            <img
              src={dashboardImg}
              alt="Dashboard Preview"
              className="w-full h-full object-cover rounded-xl shadow-xl"
              style={{ objectPosition: '70% center' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;