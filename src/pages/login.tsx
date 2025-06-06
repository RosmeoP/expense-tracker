import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/profile');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during login:', error.message);
      } else {
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="/logo192.png" alt="Expense Tracker Logo" className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign In</h2>
          <p className="text-center text-gray-500 mb-8">Welcome back! Please enter your details</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-base font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-base text-gray-600">
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
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <g>
                  <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c10.5 0 19.5-8.5 19.5-19.5 0-1.3-.1-2.5-.3-3.5z"/>
                  <path fill="#34A853" d="M6.3 14.7l7 5.1C15.7 16.1 19.5 13.5 24 13.5c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4.5 24 4.5c-7.2 0-13.3 4.1-16.7 10.2z"/>
                  <path fill="#FBBC05" d="M24 45.5c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4c-2 1.4-4.6 2.2-7.7 2.2-5.8 0-10.7-3.9-12.5-9.2l-7 5.4C6.7 41.1 14.7 45.5 24 45.5z"/>
                  <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C15.7 41.1 19.5 45.5 24 45.5c10.5 0 19.5-8.5 19.5-19.5 0-1.3-.1-2.5-.3-3.5z"/>
                </g>
              </svg>
              Sign up with Google
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
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white px-12 py-10">
          <h2 className="text-4xl font-bold mb-4 text-center">Welcome back!</h2>
          <p className="text-xl font-semibold mb-4 text-center">Please sign in to your Expense Tracker account</p>
          <p className="text-center text-blue-100 mb-10">
            Track your expenses, analyze your spending, and reach your financial goals.
          </p>
          {/* Placeholder for chart/graphic */}
          <div className="w-full flex flex-col items-center">
            <div className="bg-white rounded-xl p-6 w-72 shadow-md mb-6">
              <div className="text-blue-600 font-bold text-base mb-3">Monthly Report</div>
              <div className="flex items-end gap-1 h-24">
                <div className="bg-blue-200 w-4 h-8 rounded"></div>
                <div className="bg-blue-300 w-4 h-14 rounded"></div>
                <div className="bg-blue-400 w-4 h-12 rounded"></div>
                <div className="bg-blue-500 w-4 h-20 rounded"></div>
                <div className="bg-blue-400 w-4 h-12 rounded"></div>
                <div className="bg-blue-300 w-4 h-16 rounded"></div>
                <div className="bg-blue-200 w-4 h-8 rounded"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                <span>Jan</span>
                <span>Jul</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 w-40 shadow text-center">
              <div className="text-blue-600 font-bold text-2xl">72%</div>
              <div className="text-sm text-gray-500">Budget Used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;