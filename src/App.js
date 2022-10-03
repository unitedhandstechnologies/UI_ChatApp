import React, {memo, useReducer, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'navigation';
import {AuthContext} from 'components';
import {getToken as getUserToken, removeUserInfo, removeToken} from 'utils';
import ErrorBoundary from 'utils/ErrorBoundary';
import {addListener, removeListener} from 'utils/CustomListener';
import RouterContent from 'screens';

const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
  screenName: 'welcome',
};
const App = () => {
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          screenName: action ?? 'login',
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: async token => {
        dispatch({type: 'LOGIN', token});
      },
      signOut: async (screenName = 'login') => {
        try {
          await removeToken();
          await removeUserInfo();
        } catch (e) {
          console.error(e);
        }
        dispatch({type: 'LOGOUT', screenName});
      },
      toggleTheme: () => {},
    }),
    [],
  );

  useEffect(() => {
    const listener = addListener('logout', () => {
      dispatch({type: 'LOGOUT'});
    });
    const getToken = async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await getUserToken();
      } catch (e) {
        console.error(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    };
    getToken();
    return () => {
      removeListener(listener);
    };
  }, []);
  return (
    <ErrorBoundary>
      <AuthContext.Provider value={authContext}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer ref={navigationRef}>
          <RouterContent
            logoutScreen={loginState.screenName}
            userToken={loginState.userToken}
          />
        </NavigationContainer>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};

export default memo(App);
