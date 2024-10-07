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

export const editHomeBanner = async (
  payload: EditHomeBanner,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`home/banner/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const deleteHomeBanner = async (
  payload: Delete,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`home/banner/${id}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getHistory = async (token: string): Promise<History> => {
  return await api
    .get('about/history', authorizedConfig(token))
    .then((res) => res.data);
};

export const editHistory = async (
  history: string,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`about/history/${id}`, history, authorizedConfig(token))
    .then((res) => res.data);
};

export const getMissionVision = async (
  token: string
): Promise<MissionVision> => {
  return await api
    .get('about/mission-vision', authorizedConfig(token))
    .then((res) => res.data);
};

export const editMissionVision = async (
  payload: EditMissionVision,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`about/mission-vision/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const getHmo = async (token: string): Promise<HMO[]> => {
  return await api.get('hmo', authorizedConfig(token)).then((res) => res.data);
};

export const addHmo = async (
  payload: AddHMO,
  token: string
): Promise<string> => {
  return await api
    .post('hmo', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editHmo = async (
  payload: EditHMO,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`hmo/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteHmo = async (
  payload: Delete,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`hmo/${id}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getHomeAbout = async (token: string): Promise<HomeAbout> => {
  return await api
    .get('home/about', authorizedConfig(token))
    .then((res) => res.data);
};

export const editHomeAbout = async (
  payload: EditHomeAbout,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`home/about/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const getEyeService = async (token: string): Promise<Services[]> => {
  return await api
    .get('service/eye-center', authorizedConfig(token))
    .then((res) => res.data);
};

export const addEyeService = async (
  payload: UpsertServices,
  token: string
): Promise<string> => {
  return await api
    .post('service/eye-center', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editEyeService = async (
  payload: UpsertServices,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/eye-center/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteEyeService = async (
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/eye-center/${id}`, authorizedConfig(token))
    .then((res) => res.data);
};

export const getEyeServiceImg = async (
  token: string
): Promise<ServicesImg[]> => {
  return await api
    .get('service/eye-center-img', authorizedConfig(token))
    .then((res) => res.data);
};

export const addEyeServiceImg = async (
  payload: AddServicesImg,
  token: string
): Promise<string> => {
  return await api
    .post('service/eye-center-img', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editEyeServiceImg = async (
  payload: EditServicesImg,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/eye-center-img/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteEyeServiceImg = async (
  payload: Delete,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/eye-center-img/${id}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getSpecialService = async (token: string): Promise<Services[]> => {
  return await api
    .get('service/special-care', authorizedConfig(token))
    .then((res) => res.data);
};

export const addSpecialService = async (
  payload: UpsertServices,
  token: string
): Promise<string> => {
  return await api
    .post('service/special-care', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editSpecialService = async (
  payload: UpsertServices,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/special-care/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteSpecialService = async (
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/special-care/${id}`, authorizedConfig(token))
    .then((res) => res.data);
};

export const getNewsEvents = async (token: string): Promise<NewsEvents[]> => {
  return await api
    .get('news-events', authorizedConfig(token))
    .then((res) => res.data);
};

export const addNewsEvents = async (
  payload: AddNewsEvents,
  token: string
): Promise<string> => {
  return await api
    .post('news-events', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editNewsEvents = async (
  payload: EditNewsEvents,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`news-events/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const delNewsEvents = async (
  payload: Delete,
  id: number,
  token: string
) => {
  return await api
    .delete(`news-events/${id}`, { data: payload, ...authorizedConfig(token) })
    .then((res) => res.data);
};

export const getSpecialServiceImg = async (
  token: string
): Promise<ServicesImg[]> => {
  return await api
    .get('service/special-care-img', authorizedConfig(token))
    .then((res) => res.data);
};

export const addSpecialServiceImg = async (
  payload: AddServicesImg,
  token: string
): Promise<string> => {
  return await api
    .post('service/special-care-img', payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const editSpecialServiceImg = async (
  payload: EditServicesImg,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/special-care-img/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteSpecialServiceImg = async (
  payload: Delete,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/special-care-img/${id}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getGeneralService = async (token: string): Promise<Services[]> => {
  return await api
    .get('service/general', authorizedConfig(token))
    .then((res) => res.data);
};

export const addGeneralService = async (
  payload: UpsertServices,
  token: string
): Promise<string> => {
  return await api
    .post('service/general', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editGeneralService = async (
  payload: UpsertServices,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/general/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteGeneralService = async (
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/general/${id}`, authorizedConfig(token))
    .then((res) => res.data);
};
export const getGeneralServiceImg = async (
  token: string
): Promise<ServicesImg[]> => {
  return await api
    .get('service/general-img', authorizedConfig(token))
    .then((res) => res.data);
};

export const addGeneralServiceImg = async (
  payload: AddServicesImg,
  token: string
): Promise<string> => {
  return await api
    .post('service/general-img', payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const editGeneralServiceImg = async (
  payload: EditServicesImg,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/general-img/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteGeneralServiceImg = async (
  payload: Delete,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/general-img/${id}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};
export const getRadiologyService = async (
  token: string
): Promise<Services[]> => {
  return await api
    .get('service/radiology', authorizedConfig(token))
    .then((res) => res.data);
};

export const addRadiologyService = async (
  payload: UpsertServices,
  token: string
): Promise<string> => {
  return await api
    .post('service/radiology', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editRadiologyService = async (
  payload: UpsertServices,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/radiology/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteRadiologyService = async (
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/radiology/${id}`, authorizedConfig(token))
    .then((res) => res.data);
};
export const getRadiologyServiceImg = async (
  token: string
): Promise<ServicesImg[]> => {
  return await api
    .get('service/radiology-img', authorizedConfig(token))
    .then((res) => res.data);
};

export const addRadiologyServiceImg = async (
  payload: AddServicesImg,
  token: string
): Promise<string> => {
  return await api
    .post('service/radiology-img', payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const editRadiologyServiceImg = async (
  payload: EditServicesImg,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/radiology-img/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteRadiologyServiceImg = async (
  payload: Delete,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/radiology-img/${id}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getFeaturedServices = async (
  token: string
): Promise<FeaturedService[]> => {
  return await api
    .get('service/featured', authorizedConfig(token))
    .then((res) => res.data);
};

export const addFeaturedServices = async (
  payload: AddFeaturedService,
  token: string
): Promise<string> => {
  return await api
    .post('service/featured', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editFeaturedServices = async (
  payload: EditFeaturedService,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`service/featured/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteFeaturedServices = async (
  payload: Delete,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`service/featured/${id}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getCareers = async (token: string): Promise<Careers[]> => {
  return await api
    .get('careers', authorizedConfig(token))
    .then((res) => res.data);
};

export const addCareers = async (
  payload: UpsertCareers,
  token: string
): Promise<string> => {
  return await api
    .post('careers', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const editCareers = async (
  payload: UpsertCareers,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .put(`careers/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const deleteCareers = async (
  id: number,
  token: string
): Promise<string> => {
  return await api
    .delete(`careers/${id}`, authorizedConfig(token))
    .then((res) => res.data);
};

export const editCareerStatus = async (
  payload: boolean,
  id: number,
  token: string
): Promise<string> => {
  return await api
    .patch(`careers/status/${id}`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const getAllAppointment = async (
  token: string
): Promise<Appointment[]> => {
  return await api
    .get('appointment', authorizedConfig(token))
    .then((res) => res.data);
};

export const getAppointmentStatus = async (
  token: string
): Promise<AppointmentStatus> => {
  return await api
    .get('appointment-status', authorizedConfig(token))
    .then((res) => res.data);
};

export const editAppointmentStatus = async (
  payload: AppointmentStatus,
  token: string
): Promise<string> => {
  return await api
    .patch('appointment-status', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const getPatient = async (token: string): Promise<Patient[]> => {
  return await api
    .get('results/patients', authorizedConfig(token))
    .then((res) => res.data);
};
export const changePatientEmail = async (
  payload: PatientEmail,
  token: string
): Promise<string> => {
  return await api
    .post('results/patient/change-email', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const overridePatientPassword = async (
  payload: PatientPassword,
  token: string
): Promise<string> => {
  return await api
    .post('results/patient/override-password', payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const getDoctor = async (token: string): Promise<Doctor[]> => {
  return await api
    .get('results/doctors', authorizedConfig(token))
    .then((res) => res.data);
};
export const changeDoctorPassword = async (
  payload: DoctorPassword,
  token: string
): Promise<string> => {
  return await api
    .post('results/doctor/override-password', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const changeDoctorEmail = async (
  payload: DoctorEmail,
  token: string
): Promise<string> => {
  return await api
    .post('results/doctor/change-email', payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const getTermsPrivacy = async (token: string): Promise<TermsPrivacy> => {
  return await api
    .get('terms-privacy', authorizedConfig(token))
    .then((res) => res.data);
};
export const updateTerms = async (
  token: string,
  payload: UpdateTerms
): Promise<string> => {
  return await api
    .post('terms', payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const updatePrivacy = async (
  token: string,
  payload: UpdatePrivacy
): Promise<string> => {
  return await api
    .post('privacy', payload, authorizedConfig(token))
    .then((res) => res.data);
};
