/* eslint-disable no-undef */
// test comment
import {NativeModules} from 'react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler/jestSetup';

NativeModules.RNGestureHandlerModule = {
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
  State: {},
  Directions: {},
};

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

global.fetch = require('jest-fetch-mock');

jest.mock('react-native-code-push', () => {
  const cp = () => app => app;
  Object.assign(cp, {
    InstallMode: {},
    CheckFrequency: {},
    SyncStatus: {},
    UpdateState: {},
    DeploymentStatus: {},
    DEFAULT_UPDATE_DIALOG: {},

    allowRestart: jest.fn(),
    checkForUpdate: jest.fn(() => Promise.resolve(null)),
    disallowRestart: jest.fn(),
    getCurrentPackage: jest.fn(() => Promise.resolve(null)),
    getUpdateMetadata: jest.fn(() => Promise.resolve(null)),
    notifyAppReady: jest.fn(() => Promise.resolve()),
    restartApp: jest.fn(),
    sync: jest.fn(() => Promise.resolve(1)),
    clearUpdates: jest.fn(),
  });
  return cp;
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@codler/react-native-keyboard-aware-scroll-view', () => {
  return {
    KeyboardAwareScrollView: jest
      .fn()
      .mockImplementation(({children}) => children),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
