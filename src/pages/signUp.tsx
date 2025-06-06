import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<{ name?: string; email?: string; password?: string; agree?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'name') setName(value as string);
    if (field === 'email') setEmail(value as string);
    if (field === 'password') setPassword(value as string);
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
    if (!agree) formError.agree = 'You must agree to the terms and privacy policy to continue.';

    if (formError.name || formError.email || formError.password || formError.agree) {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg flex w-full max-w-5xl overflow-hidden">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Get Started Now</h2>
          <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>

          {error.general && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error.general}
            </div>
          )}

          <div className="mt-6 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => console.log('Login with Google')}
                className="w-1/2 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Sign Up with Google
              </button>
              <button
                onClick={() => console.log('Login with Apple')}
                className="w-1/2 bg-gray-200 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Sign Up with Apple
              </button>
            </div>
            <div className="flex items-center mb-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 text-gray-600">Or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your name"
              />
              {error.name && <p className="text-red-600 text-sm">{error.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="you@example.com"
              />
              {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
              </div>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                minLength={8}
                placeholder="min 8 chars"
              />
              {error.password && <p className="text-red-600 text-sm">{error.password}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => handleInputChange('agree', e.target.checked)}
              />
              <span className="text-gray-600 text-sm">
                I agree to the <a href="#" className="text-blue-600 underline">Terms & Privacy</a>
              </span>
              {error.agree && <p className="text-red-600 text-sm">{error.agree}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600 text-sm">
            Have an account? <a href="/login" className="text-blue-600 underline">Sign in</a>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">2022 Acme, All right Reserved</p>
        </div>

        <div className="hidden md:flex w-1/2 bg-blue-600 flex-col justify-center items-center text-white p-10">
          <h3 className="text-2xl font-bold mb-2">The simplest way to manage your workforce</h3>
          <p className="mb-8 text-blue-100">Enter your credentials to access your account</p>
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
