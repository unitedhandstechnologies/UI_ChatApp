import {POST} from 'utils/axiosConfig/request';
import {ApiUrl} from 'constants/apiUrlContant';
export const userAuth = (phone, countryCode) =>
  POST(ApiUrl.login, {
    countryCode,
    phone,
  });
