import { create } from 'axios';
import { token } from "../utils/helper";
import { apiUrl, infoKey } from "../constants/defaultValues.js";
const axios = create({
  baseURL: apiUrl()
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error
      && error.response
      && error.response.status
      && error.response.status === 401
    ) {
      window.localStorage.clear();  
      window.location.replace(`${window.location.origin}/admin/login`);
    } 
    throw error;
  },
);

axios.interceptors.request.use(
  (config) => {
    const sessionToken = token(infoKey);
    const request = config;
    if (token) {
      request.headers.common.Authorization = `${sessionToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axios;