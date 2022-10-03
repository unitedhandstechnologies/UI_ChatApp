import React from 'react';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/store';
import RouterContent from './src/RouterComponent';
import {navigationRef} from './src/navigation/NavigationService';
import ErrorBoundary from './src/utils/ErrorBoundary';

var App = () => (
  <ErrorBoundary>
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <RouterContent />
      </Provider>
    </NavigationContainer>
  </ErrorBoundary>
);

//Uncomment below two lines for OTA after adding env vars

// const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
// App = codePush(codePushOptions)(App);

export default App;
