import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/admin/`,
  headers: {
    'Content-Type': 'application/json',
  },
});
const authorizedConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const uploadImage = async (
  file: FormData,
  path: string,
  token: string
): Promise<string> => {
  return await api
    .post(`${path}/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const getAdministrator = async (
  token: string
): Promise<Administrators[]> => {
  return await api
    .get('users', authorizedConfig(token))
    .then((res) => res.data);
};

export const addAdministrator = async (
  payload: AddAdministrators,
  token: string
): Promise<string> => {
  return await api
    .post('register', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const changePassword = async (
  payload: Password,
  userName: string,
  token: string
): Promise<string> => {
  return await api
    .post(`user/${userName}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const editAdministrator = async (
  payload: Override,
  id: string,
  token: string
): Promise<string> => {
  return await api
    .post(`override-password/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const deleteAdministrator = async (
  id: string,
  token: string
): Promise<string> => {
  return await api
    .delete(`user/${id}`, authorizedConfig(token))
    .then((res) => res.data);
};

export const getHomeBanner = async (
  token: string
): Promise<HomeBannerType[]> => {
  return await api
    .get('home/banner', authorizedConfig(token))
    .then((res) => res.data);
};

export const editBannerPosition = async (
  payload: BannerPosition[],
  token: string
): Promise<string> => {
  return await api
    .post('home/banner/position', payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const addHomeBanner = async (
  payload: AddHomeBanner,
  token: string
): Promise<string> => {
  return await api
    .post('home/banner', payload, authorizedConfig(token))
    .then((res) => res.data);
};
