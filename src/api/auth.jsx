import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/auth/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '로그인에 실패했습니다';
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '회원가입에 실패했습니다';
  }
};