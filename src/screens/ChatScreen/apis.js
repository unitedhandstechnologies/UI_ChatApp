import {POST, GET, Patch, Delete} from 'utils/axiosConfig/request';
import {ApiUrl} from 'constants/apiUrlContant';
export const sendMessage = data => POST(ApiUrl.sendMessage, data);
export const getMessages = threadId => GET(`${ApiUrl.getMessage}${threadId}`);
export const readAllMessage = chatId => Patch(`${ApiUrl.readMessage}${chatId}`);
export const deleteSingleMessage = chatId =>
  Delete(`${ApiUrl.deleteMessage}${chatId}`);
export const getAllStickers = () => GET(`${ApiUrl.getAllStickers}`);
