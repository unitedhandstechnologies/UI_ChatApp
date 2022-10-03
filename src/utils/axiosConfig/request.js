import {axios} from './axios';

export const POST = (url, data = {}, options = {}) =>
  axios.post(url, data, options);
export const GET = (url, params = {}) => axios.get(encodeURI(url), {params});
export const PUT = (url, data = {}) => axios.put(url, data);
export const Delete = (url, data = {}) => axios.delete(url, data);
export const Patch = (url, data = {}) => axios.patch(url, data);
