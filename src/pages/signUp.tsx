// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    try {
      await registerUser(email, password); // Update your service if needed
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during sign-up:', error.message);
      } else {
        console.error('Error during sign-up:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg flex w-full max-w-5xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Get Started Now</h2>
          <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>
          <div className="flex gap-3 mb-4">
            <button className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <span className="i-mdi:google text-lg" /> Log in with Google
            </button>
            <button className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <span className="i-mdi:apple text-lg" /> Log in with Apple
            </button>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="min 8 chars"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                required
                className="accent-blue-600"
              />
              <span className="text-gray-600 text-sm">
                I agree to the <a href="#" className="text-blue-600 underline">Terms & Privacy</a>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={!agree}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center text-gray-600 text-sm">
            Have an account? <a href="/login" className="text-blue-600 underline">Sign in</a>
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center">2022 Acme, All right Reserved</p>
        </div>
        {/* Right Panel */}
        <div className="hidden md:flex w-1/2 bg-blue-600 flex-col justify-center items-center text-white p-10">
          <h3 className="text-2xl font-bold mb-2">The simplest way to manage your workforce</h3>
          <p className="mb-8 text-blue-100">Enter your credentials to access your account</p>
          {/* Placeholder for dashboard image */}
          <div className="w-full h-64 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-4xl opacity-30">[Dashboard Preview]</span>
          </div>
          <div className="flex gap-6 mt-8 opacity-80">
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
