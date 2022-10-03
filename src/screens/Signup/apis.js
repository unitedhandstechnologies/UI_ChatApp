import {ApiUrl} from 'constants/apiUrlContant';
import {getToken} from 'utils/encryptedStorage';
import Config from "react-native-config";
export const registerUser = async body => {
  //let URL = `http://81.169.173.21:3000/apis/v1${ApiUrl.signup}`;
  let URL = `${Config.REACT_APP_API_BASE_URL}${ApiUrl.signup}`;
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
      console.log('---',resp)
      let json = null;
      json = resp.json();
      if (resp.ok) {
        return json;
      }
      return json.then(err => {
        console.log('err----',err)
        throw err;
      });
    })
    .then(json => json);
};
export const getLocationData = async (req) => {
  console.log('api call-----')
  // let APIKEY = 'AIzaSyDFRTHdwxpe3oWqj_9zk4t0ah35FWLDxgI';
  let APIKEY = Config.GOOGLE_API_KEY;
  let GOOGLEAPI_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.lat},${req.long}&key=${APIKEY}`;
  return await fetch(GOOGLEAPI_URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let authors = data;
  })
};
// POST(ApiUrl.signup, data, {
//   headers: {
//     common: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//     post: {
//       'Content-Type': 'multipart/form-data',
//     },
//   },
// });
