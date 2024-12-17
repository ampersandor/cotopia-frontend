import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/v1/auth/login', { username, password });
    window.dispatchEvent(new Event('login'));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '로그인에 실패했습니다';
  }
};

export const logout = async () => {
  try {
    await api.post('/api/v1/auth/logout');
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '회원가입에 실패했습니다';
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/api/v1/auth/validate');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '인증 확인에 실패했습니다';
  }
};