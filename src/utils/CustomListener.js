import {EventRegister} from 'react-native-event-listeners';

export function addListener(name, callback) {
  return EventRegister.addEventListener(name, callback);
}

export function emitListener(name, params) {
  EventRegister.emit(name, params);
}

export function removeListener(listener) {
  EventRegister.removeEventListener(listener);
}
