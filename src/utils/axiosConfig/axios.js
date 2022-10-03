import {create} from 'axios';
import {getToken} from 'utils/encryptedStorage';
import {serverErrors} from './handleServerError';
import Config from "react-native-config";
console.log('config---',Config.REACT_APP_API_BASE_URL)
export const axios = create({
  //baseURL: 'http://81.169.173.21:3000/apis/v1/',
  baseURL: Config.REACT_APP_API_BASE_URL,
  //baseURL: 'http://10.0.3.2:4000/apis/v1/',
  headers: {
    common: {'Content-Type': 'application/json'},
  },
});

axios.interceptors.response.use(
  response => successResponce(response),
  error => {
    return Promise.reject(serverErrors(error));
  },
);

axios.interceptors.request.use(
  async config => {
    const request = config;
    const key = await getToken();
    if (key) {
      request.headers.common.Authorization = key;
    }
    return request;
  },
  error => Promise.reject(error),
);

const successResponce = result => {
  const {data} = result;
  return data;
};
