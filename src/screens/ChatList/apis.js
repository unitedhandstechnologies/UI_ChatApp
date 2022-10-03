import {GET, Delete} from 'utils/axiosConfig/request';
import {ApiUrl} from 'constants/apiUrlContant';
export const getMessages = () => GET(ApiUrl.lastChat);
export const removeThread = threadId =>
  Delete(`${ApiUrl.deleteThread}${threadId}`);
