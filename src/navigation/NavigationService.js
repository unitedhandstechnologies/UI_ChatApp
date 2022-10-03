import React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';

const navigationRef = React.createRef();

const navigate = (name, params) =>
  navigationRef.current?.dispatch(CommonActions.navigate(name, params));

const replace = (name, params) =>
  navigationRef.current?.dispatch(StackActions.replace(name, params));

const push = (...args) =>
  navigationRef.current?.dispatch(StackActions.push(...args));

const pop = (screenCount = 1) =>
  navigationRef.current?.dispatch(StackActions.pop(screenCount));

const popToTop = () => navigationRef.current?.dispatch(StackActions.popToTop());

const goBack = () => navigationRef.current?.dispatch(CommonActions.goBack());
const reset = (name, param) =>
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params: param}],
    }),
  );

export {navigationRef, navigate, replace, push, pop, popToTop, goBack, reset};
