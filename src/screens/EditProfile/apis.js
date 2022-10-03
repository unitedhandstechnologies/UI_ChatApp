import {ApiUrl} from 'constants/apiUrlContant';
import {getToken} from 'utils';
import Config from "react-native-config";
export const editUserInfo = async body => {
  let URL = `${Config.REACT_APP_API_BASE_URL}${ApiUrl.updateProfile}`;
  let headers = {
    'Content-Type': 'multipart/form-data', // this is a imp line
    Authorization: await getToken(),
    Accept: 'application/json',
  };
  let obj = {
    method: 'POST',
    headers: headers,
    body,
  };
  return fetch(URL, obj)
    .then(resp => {
      let json = null;
      json = resp.json();
      if (resp.ok) {
        return json;
      }
      return json.then(err => {
        throw err;
      });
    })
    .then(json => json);
};
