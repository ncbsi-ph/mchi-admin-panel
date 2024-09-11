import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/auth/`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const login = async (payload: Login): Promise<AccessToken> => {
  return await api.post('login', payload).then((res) => res.data);
};

export const refreshAccessToken = async (): Promise<AccessToken> => {
  return await api.get('refresh-access-token', {}).then((res) => res.data);
};

export const logout = async () => {
  return await api.post('logout', {});
};
