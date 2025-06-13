import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  

const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split('.')[1]));  
  const expiry = payload.exp * 1000; 
  return expiry < Date.now(); 
};

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, name }, { withCredentials: true });
    
    if (response.data.token) {
      localStorage.setItem('accessToken', response.data.token);  
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        console.error('Registration error:', error.response?.data);
        throw new Error('Email already in use. Please try another one.');
      }
      console.error('General registration error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error during sign-up');
    }
    console.error('Error during registration:', error);
    throw new Error('Error during sign-up');
  }
};


// Login user function
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {email, password });

    if (response && response.data && response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem('accessToken', response.data.accessToken);  
      localStorage.setItem('refreshToken', response.data.refreshToken);  
      return response.data;  
    } else {
      console.error('Login response is missing access or refresh token:', response.data);
      throw new Error('Login failed: Missing tokens in response');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data || error.message);  
      throw new Error(error.response?.data?.message || 'Login failed');  
    } else {
      console.error('Login failed:', (error as any).message || error);  
      throw new Error('Login failed');  
    }
  }
};

// Refresh token function
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    console.log('Refreshing token...'); 
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
  let accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const tokenExpired = isTokenExpired(accessToken);
  if (tokenExpired) {
    console.log("Access token expired, refreshing...");
    const tokens = await refreshToken();  
    accessToken = tokens.accessToken;
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    console.log("Profile Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);  

    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching profile');
    }
    throw new Error('Error fetching profile');
  }
};
