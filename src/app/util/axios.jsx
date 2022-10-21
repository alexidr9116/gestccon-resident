import axios from 'axios';
// config
// export const HOST_API = 'http://localhost:5700/'
export const HOST_API = 'https://gestccon-api.herokuapp.com/'
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `${HOST_API}api/`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
