import EncryptedStorage from 'react-native-encrypted-storage';

export async function getItemFromEncyptedStorage(key) {
  const value = await EncryptedStorage.getItem(key);
  if (value !== undefined) {
    return JSON.parse(value);
  }
  return null;
}

export async function setItemInEncryptedStorage(key, value) {
  await EncryptedStorage.setItem(key, JSON.stringify(value));
}
export async function saveAppOpenInfo() {
  await EncryptedStorage.setItem(EncryptedStorageConstants.isAppOpen, 'true');
}

export async function getOpenAppInfo() {
  return await EncryptedStorage.getItem(EncryptedStorageConstants.isAppOpen);
}

export async function clear() {
  await EncryptedStorage.clear();
}

export async function removeItemFromEncyptedStorage(key) {
  await EncryptedStorage.removeItem(key);
}

export async function setUserInfo(data) {
  await setItemInEncryptedStorage(EncryptedStorageConstants.USER_INFO, data);
}

export async function removeUserInfo() {
  await EncryptedStorage.removeItem(EncryptedStorageConstants.USER_INFO);
}

export const getUserInfo = async () => {
  let userInfo = await getItemFromEncyptedStorage(
    EncryptedStorageConstants.USER_INFO,
  );
  return userInfo;
};
export const storeToken = async token => {
  await EncryptedStorage.setItem(EncryptedStorageConstants.TOKEN, token);
};
export const getToken = async () => {
  const token = await EncryptedStorage.getItem(EncryptedStorageConstants.TOKEN);
  if (!token) {
    return null;
  }
  return token;
};
export async function removeToken() {
  await EncryptedStorage.removeItem(EncryptedStorageConstants.TOKEN);
}
export const getUserToken = async () => {
  let userInfo = await getItemFromEncyptedStorage(
    EncryptedStorageConstants.USER_INFO,
  );
  if (userInfo !== undefined) {
    return userInfo?.Authorization;
  }
  return null;
};
export const EncryptedStorageConstants = {
  USER_INFO: 'USER_INFO',
  TOKEN: 'userToken',
  isAppOpen: 'appOpen',
};
