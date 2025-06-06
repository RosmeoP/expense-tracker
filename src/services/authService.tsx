// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, name }, { withCredentials: true });
    return response.data;  
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        throw new Error('Email already in use. Please try another one.');
      }
      throw new Error(error.response?.data?.message || 'Error during sign-up');
    }
    throw new Error('Error during sign-up');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    // Store tokens in localStorage or sessionStorage
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error during login');
    }
    throw new Error('Error during login');
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const response = await axios.post(
      `${API_URL}/refresh-token`,
      { refreshToken },
      { withCredentials: true }
    );
    // Store new tokens
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error refreshing token');
    }
    throw new Error('Error refreshing token');
  }
};

export const fetchProfile = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,  
      },
      withCredentials: true,
    });
    return response.data;  
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching profile');
    }
    throw new Error('Error fetching profile');
  }
};
