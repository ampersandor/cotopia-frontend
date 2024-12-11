import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/v1/user/login', { username, password });
    window.dispatchEvent(new Event('login'));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '로그인에 실패했습니다';
  }
};

export const logout = async () => {
  try {
    await axios.post('/api/v1/user/logout');
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post('/api/v1/user/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '회원가입에 실패했습니다';
  }
};