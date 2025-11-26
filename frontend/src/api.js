// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://weatherapp-kk03.onrender.com/api', // make sure this matches backend port
});

// REGISTER
export const registerUser = async (userData) => {
  try {
    const res = await API.post('/auth/register', userData);
    return res.data;
  } catch (error) {
    console.error('Register API error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Server Error' };
  }
};

// LOGIN
export const loginUser = async (userData) => {
  try {
    const res = await API.post('/auth/login', userData);
    return res.data;
  } catch (error) {
    console.error('Login API error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Server Error' };
  }
};
