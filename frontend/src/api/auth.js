import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/auth';

const authApi = {
  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || 'Signup failed';
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || 'Login failed';
    }
  },
};

export default authApi;
