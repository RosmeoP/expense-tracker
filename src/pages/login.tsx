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
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during login:', error.message);
      } else {
        console.error('Error during login:', error);
      }
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
              className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white py-3 rounded-lg hover:bg-blue-50 transition text-blue-600"
            >
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <g>
                  <circle cx="24" cy="24" r="20" fill="#DBEAFE" />
                  <text x="24" y="30" textAnchor="middle" fontSize="18" fill="#2563EB" fontFamily="Arial">G</text>
                </g>
              </svg>
              Sign in with Google
            </button>
            {/* Sign in with Apple button for future integration */}
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white py-3 rounded-lg text-gray-900 opacity-60 cursor-not-allowed"
              title="Coming soon"
            >
              {/* Clean Apple logo SVG */}
              <svg className="w-6 h-10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16.365 1.43c0 1.14-.93 2.06-2.07 2.06-.04 0-.08 0-.12-.01-.17-1.09.95-2.05 2.07-2.05.04 0 .08 0 .12.01zm2.44 4.13c-1.13-.13-2.09.62-2.63.62-.54 0-1.37-.6-2.25-.58-.87.01-1.68.5-2.13 1.27-.91 1.57-.23 3.89.65 5.16.43.62.94 1.31 1.61 1.29.65-.03.9-.42 1.68-.42.78 0 1.01.42 1.68.41.69-.01 1.13-.63 1.56-1.25.49-.7.69-1.38.7-1.41-.02-.01-1.34-.51-1.36-2.01-.01-1.26 1.03-1.86 1.08-1.89-.59-.86-1.51-.96-1.83-.97zm-4.44 13.13c-.41.95-.84 1.89-1.51 1.91-.66.02-.87-.62-1.63-.62-.76 0-.99.6-1.62.64-.65.03-1.15-.92-1.56-1.87-1.07-2.36-1.89-6.68.09-8.57.74-.7 1.8-.72 2.37-.72.57 0 1.65.02 2.37.72 1.98 1.89 1.17 6.21.09 8.57z"
                  fill="#111"
                />
              </svg>
              Sign in with Apple
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
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-50 text-gray-900 px-12 py-10 border-l border-gray-200">
          <h2 className="text-4xl font-bold mb-4 text-center text-blue-600">Welcome back!</h2>
          <p className="text-xl font-semibold mb-4 text-center text-gray-400">Please sign in to your Expense Tracker account</p>
          <p className="text-center text-gray-400 mb-10">
            Track your expenses, analyze your spending, and reach your financial goals.
          </p>
          {/* Placeholder for chart/graphic */}
          <div className="w-full flex flex-col items-center">
            <div className="bg-white rounded-xl p-6 w-72 shadow-md mb-6 border border-blue-100">
              <div className="text-blue-600 font-bold text-base mb-3">Monthly Report</div>
              <div className="flex items-end gap-1 h-24">
                <div className="bg-blue-100 w-4 h-8 rounded"></div>
                <div className="bg-blue-200 w-4 h-14 rounded"></div>
                <div className="bg-blue-300 w-4 h-12 rounded"></div>
                <div className="bg-blue-400 w-4 h-20 rounded"></div>
                <div className="bg-blue-300 w-4 h-12 rounded"></div>
                <div className="bg-blue-200 w-4 h-16 rounded"></div>
                <div className="bg-blue-100 w-4 h-8 rounded"></div>
              </div>
              <div className="flex justify-between text-sm text-blue-300 mt-3">
                <span>Jan</span>
                <span>Jul</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 w-40 shadow text-center border border-blue-100">
              <div className="text-blue-600 font-bold text-2xl">72%</div>
              <div className="text-sm text-blue-400">Budget Used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;