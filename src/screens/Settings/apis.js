import {POST, GET, Delete} from 'utils/axiosConfig/request';
import {ApiUrl} from 'constants/apiUrlContant';
export const logotUser = () => POST(ApiUrl.logout);
export const deleteUser = () => Delete(ApiUrl.deleteAccount);
export const appInfo = () => GET(ApiUrl.appInfo);
