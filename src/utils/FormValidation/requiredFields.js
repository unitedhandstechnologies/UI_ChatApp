import {emailRegex, phoneRegex, londonPostCodeRegex} from './regexConstants';

export const checkRequiredField = (key, value) => {
  const message = !value ? 'This field is required' : '';
  return {[key]: message};
};

export const matchPassword = (key, value, password) => {
  switch (true) {
    case !value:
      return {[key]: 'This field is required'};
    case password !== value:
      return {[key]: 'Password and confirm password does not match'};
    default:
      return {[key]: ''};
  }
};

export const validatePassword = (key, value) => {
  switch (true) {
    case !value:
      return {[key]: 'This field is required'};
    case value.length < 8:
      return {[key]: 'Password should be minimum 8 characters'};
    case !/[^A-Za-z0-9]/.test(value):
      return {[key]: 'Password should be One special character'};
    case !/[a-z]/.test(value):
      return {[key]: 'Password should be One lowercase character'};
    case !/[A-Z]/.test(value):
      return {[key]: 'Password should be One uppercase character'};
    case value.search(/[0-9]/) < 0:
      return {[key]: 'Password should be One number'};
    default:
      return {[key]: ''};
  }
};

export const checkAllRequiredFields = fields =>
  Object.entries(fields).reduce((acc, [key, value]) => {
    const message = !value ? 'This field is required' : '';
    return {...acc, [key]: message};
  }, {});

export const handleServerErrors = ServerErrors =>
  Object.entries(ServerErrors).reduce(
    (acc, [key, [value]]) => ({...acc, [key]: value}),
    {},
  );

export const maxMinNumber = (key, value, min = 1, max = 20) => {
  switch (true) {
    case isNaN(value):
      return {[key]: 'Only number value is allow'};
    case !value || value === 0:
      return {[key]: 'This field is required'};
    case min > value:
      return {[key]: `minimum value should be ${min}`};
    case value > max:
      return {[key]: `maximum value should be ${max}`};
    default:
      return {[key]: ''};
  }
};

export const emptyObject = object => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) return false;
  }
  return true;
};

export const checkAllRequiredFieldsWithKey = (fields, values) =>
  Object.entries(fields).reduce((acc, [key]) => {
    const message = !values[key] ? 'This field is required' : '';
    return {...acc, [key]: message};
  }, {});

export const vaildPostCode = postCode => {};

export const validateEmail = (key, value) => {
  switch (true) {
    case !value:
      return {[key]: 'Email field is required'};

    case !emailRegex.test(value):
      return {[key]: 'Invalid email address'};

    default:
      return {[key]: ''};
  }
};

export const validatePhone = (key, value) => {
  switch (true) {
    case !value:
      return {[key]: 'Phone field is required'};

    case value.match(/\d/g).length > 15 || value.match(/\d/g).length < 7:
      return {[key]: 'Invalid Phone Number'};
    default:
      return {[key]: ''};
  }
};

export const isValidPostcode = postCode => londonPostCodeRegex.test(postCode);
