import {POST} from 'utils/axiosConfig/request';
import {ApiUrl} from 'constants/apiUrlContant';
export const verifyUserOtp = data =>
  POST(ApiUrl.verifyOtp, data, {
    headers: {
      Authorization: data.authorizationKey,
    },
  });
export const resendUserOtp = ({authorizationKey}) =>
  POST(
    ApiUrl.resendOtp,
    {},
    {
      headers: {
        Authorization: authorizationKey,
      },
    },
  );
