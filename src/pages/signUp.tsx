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
    <div className="min-h-screen flex items-center justify-center bg-[#181A20]">
      <div className="bg-[#23263b] rounded-3xl shadow-2xl flex w-full max-w-4xl overflow-hidden">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Take Control of Your Finances</h2>
          <p className="text-gray-400 mb-4 text-center">Create an account today to start tracking your expenses, setting budgets, and making informed financial decisions.</p>

          {error.general && (
            <div className="bg-red-900 text-red-300 p-3 rounded-md mb-4">
              {error.general}
            </div>
          )}

          <div className="mt-4 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <button
                type="button"
                className="w-1/2 flex items-center justify-center gap-2 border border-gray-700 bg-[#23263b] py-2 rounded-lg hover:bg-[#282c3f] transition text-sm text-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <g>
                    <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c10.5 0 19.5-8.5 19.5-19.5 0-1.3-.1-2.5-.3-3.5z"/>
                    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.7 16.1 19.5 13.5 24 13.5c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4.5 24 4.5c-7.2 0-13.3 4.1-16.7 10.2z"/>
                    <path fill="#FBBC05" d="M24 45.5c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4c-2 1.4-4.6 2.2-7.7 2.2-5.8 0-10.7-3.9-12.5-9.2l-7 5.4C6.7 41.1 14.7 45.5 24 45.5z"/>
                    <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C15.7 41.1 19.5 45.5 24 45.5c10.5 0 19.5-8.5 19.5-19.5 0-1.3-.1-2.5-.3-3.5z"/>
                  </g>
                </svg>
                Sign up with Google
              </button>
              <button
                onClick={() => console.log('Login with Apple')}
                className="w-1/2 bg-gray-700 text-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-600 transition text-sm"
              >
                Sign Up with Apple
              </button>
            </div>
            <div className="flex items-center mb-4">
              <hr className="flex-1 border-gray-700" />
              <span className="mx-4 text-gray-400">Or</span>
              <hr className="flex-1 border-gray-700" />
            </div>
          </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-200 font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#23263b] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your name"
            />
            {error.name && (
              <p className="text-red-400 text-xs mt-1">{error.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-[#23263b] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="you@example.com"
            />
            {error.email && (
              <p className="text-red-400 text-xs mt-1">{error.email}</p>
            )}
          </div>
            <div className="flex items-center justify-between">
              <div className="w-10/12">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-200 font-medium mb-1">Password</label>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 bg-[#23263b] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  minLength={8}
                  placeholder="min 8 chars"
                />
                {error.password && <p className="text-red-400 text-xs mt-1">{error.password}</p>}
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-1/12 text-xs text-purple-400"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-10/12">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-200 font-medium mb-1">Confirm Password</label>
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 bg-[#23263b] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  value={confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                />
                {error.confirmPassword && <p className="text-red-400 text-xs mt-1">{error.confirmPassword}</p>}
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="w-1/12 text-xs text-purple-400"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => handleInputChange('agree', e.target.checked)}
                className="accent-purple-500"
              />
              <span className="text-gray-300 text-sm">
                I agree to the <a href="#" className="text-purple-400 underline">Terms & Privacy</a>
              </span>
              {error.agree && <p className="text-red-400 text-xs mt-1">{error.agree}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Have an account? <a href="/login" className="text-purple-400 underline">Sign in</a>
          </div>

          <p className="mt-4 text-xs text-gray-600 text-center">2025 KashKeeper, All right Reserved</p>
        </div>

        {/* Right Panel Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#23263b] to-[#181A20] flex-col justify-center items-center text-white p-10">
          <h3 className="text-2xl font-bold mb-2 text-white">Track Your Spending with Confidence</h3>
          <p className="mb-8 text-purple-200">Join now and stay on top of your finances with a simple, powerful tracking tool.</p>
          <div className="w-full h-64 bg-[#23263b] rounded-xl flex items-center justify-center">
            <span className="text-4xl opacity-30">[Dashboard Preview]</span>
          </div>
          <div className="flex gap-6 mt-8 opacity-80 text-purple-200">
            <span>WeChat</span>
            <span>Booking.com</span>
            <span>Google</span>
            <span>Spotify</span>
            <span>Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;