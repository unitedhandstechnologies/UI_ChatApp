import {PermissionsAndroid, Platform, Linking} from 'react-native';
import {checkPermission, requestPermission} from 'react-native-contacts';
export const openAppSettings = () => {
  Linking.openSettings();
};

export const checkContactsPermission = async () => {
  if (Platform.OS === 'android') {
    return await checkContactsPermissionAndroid();
  }
  return requestContactPermissionIOS();
};

const requestContactPermissionIOS = async () => {
  const res = await requestPermission();
  return res === 'authorized';
};

export const checkContactsPermissionIos = async () => {
  const permission = await checkPermission();
  if (permission === 'authorized') {
    return true;
  }
  if (permission === 'denied') {
    return false;
  }
};

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
  }
};

export const checkContactsPermissionAndroid = async () => {
  const permissionResponse = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    },
  );
  return permissionResponse === 'granted';
};

export const checkLocationPermission = async () => {
  return await checkLocationPermissionAndroid();
};

const checkLocationPermissionAndroid = async () => {
  if (Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return hasPermission;
};

export const requestLocationPermissionAndroid = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};

export const requestBackgroundPermissionAndroid = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  );
};

export const checkBackgroundPermissionAndroid = async () => {
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  );
  return hasPermission;
};
