import {removeToken, removeUserInfo} from 'utils';
import {ApiUrl} from 'constants/apiUrlContant';
import {emitListener} from 'utils/CustomListener';
export const serverErrors = ({
  response,
  request,
  message,
  config,
  response: {data, data: {error_message = {}} = {}, status} = {},
} = {}) => {
  switch (true) {
    case status === 401 && response?.config?.url !== ApiUrl.login:
      (async () => {
        await removeToken();
        await removeUserInfo();
        emitListener('logout', {});
      })();
      return returnErrorObject(
        true,
        {...data, status},
        error_message,
        false,
        status,
      );
    case response && data && status >= 400 && status <= 499:
      return returnErrorObject(
        true,
        {...data, status},
        error_message,
        false,
        status,
      );

    case response && status >= 500:
      return returnErrorObject(
        false,
        null,
        'Internal Server Error',
        true,
        status,
      );

    case !response && request:
      return returnErrorObject(false, null, request, false, status);

    case !!message:
      return returnErrorObject(false, null, message, false, status);

    default:
      return returnErrorObject(false, null, config, false, status);
  }
};

const returnErrorObject = (
  clientError,
  errorDetails,
  message,
  serverError,
  status,
) => ({
  clientError,
  errorDetails,
  message,
  serverError,
  status,
});
