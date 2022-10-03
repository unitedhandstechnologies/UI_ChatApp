import {POST, GET} from 'utils/axiosConfig/request';
import {ApiUrl} from 'constants/apiUrlContant';
export const sendMessage = data => POST(ApiUrl.sendMessagePhone, data);
export const getSyncContacts = data => GET(`${ApiUrl.syncContacts}`, data);
