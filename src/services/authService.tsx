// authService.tsx
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Login with email and password
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      email: email.trim().toLowerCase(),
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 400) {
      throw new Error('Invalid email or password');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('Login failed. Please try again.');
    }
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/auth/register', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 400) {
      throw new Error('Registration failed. Please check your information.');
    } else {
      throw new Error('Registration failed. Please try again.');
    }
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await api.post('/auth/logout', { refreshToken });
    }
  } catch (error) {
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  }
  return null;
};

export default {
  loginUser,
  registerUser,
  getUserProfile,
  logoutUser,
  isAuthenticated,
  getCurrentUser,
};