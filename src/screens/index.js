import React, {useEffect} from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import notifee, {EventType} from '@notifee/react-native';
import {useNavigationState} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {goBack, screenNames, reset} from 'navigation';
import PushNotification from 'utils/pushHelper';
import {createLocalNotification} from 'utils';
import {strings} from 'locales/i18n';
import {scaleSize, colors} from 'theme';
import {getOpenAppInfo} from 'utils';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import OTP from './Otp';
import Contacts from './Contacts';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';
import Settings from './Settings';
import EditProfile from './EditProfile';
import AppInformation from './AppInformation';
import Map from './Map';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const handleBack = () => {
  goBack();
};
const navigatorOption = () => ({
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerLeft: () => (
    <TouchableOpacity
      style={Style.leftIcon}
      activeOpacity={1}
      onPress={handleBack}>
      <Image
        style={Style.leftIconImage}
        source={require('../../assets/images/backIcon.png')}
      />
    </TouchableOpacity>
  ),
});
const TabsScreen = () => (
  <Tab.Navigator
    initialRouteName={screenNames.Contacts}
    screenOptions={{
      tabBarActiveTintColor: colors.selectedPrimaryColor,
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        paddingBottom: scaleSize(4),
      },
    }}>
    <Tab.Screen
      name={screenNames.Contacts}
      component={Contacts}
      options={{
        headerShown: false,
        title: strings('tabs.contact'),
        tabBarIcon: ({focused}) => (
          <View style={Style.tabContainer}>
            <Image
              style={[
                Style.tabIcon,
                focused ? Style.activeImageColor : Style.tabImageColor,
              ]}
              source={
                focused
                  ? require('../../assets/images/Contacts.png')
                  : require('../../assets/images/Group-xxhdpi.png')
              }
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name={screenNames.ChatList}
      component={ChatList}
      options={{
        headerShown: false,
        title: strings('tabs.chat'),
        tabBarIcon: ({focused}) => (
          <View style={Style.tabContainer}>
            <Image
              style={[
                Style.tabIcon,
                focused ? Style.activeImageColor : Style.tabImageColor,
              ]}
              source={
                focused
                  ? require('../../assets/images/Chat-xxhdpi.png')
                  : require('../../assets/images/Chat1-xxhdpi.png')
              }
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name={screenNames.Setting}
      component={Settings}
      options={{
        headerShown: false,
        title: strings('tabs.setting'),
        tabBarIcon: ({focused}) => (
          <View style={Style.tabContainer}>
            <Image
              style={[
                Style.tabIcon,
                focused ? Style.activeImageColor : Style.tabImageColor,
              ]}
              source={
                focused
                  ? require('../../assets/images/Setting1-xxhdpi.png')
                  : require('../../assets/images/Settings1-xxhdpi.png')
              }
            />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);
const ScreenLoading = ({logoutScreen}) => {
  useEffect(() => {
    const loadApp = async () => {
      const appOpenInfo = await getOpenAppInfo();
      if (appOpenInfo) {
        return reset(logoutScreen?.screenName ?? screenNames.Login);
      }
      return reset(screenNames.Welcome);
    };
    loadApp();
  }, [logoutScreen]);
  return <View />;
};
const WelcomeStack = ({logoutScreen}) => (
  <MainStack.Navigator
    initialRouteName={screenNames.ScreenLoading}
    screenOptions={navigatorOption}>
    <MainStack.Screen
      name={screenNames.ScreenLoading}
      component={() => <ScreenLoading logoutScreen={logoutScreen} />}
      options={{headerShown: false}}
    />
    <MainStack.Screen
      name={screenNames.Welcome}
      component={Welcome}
      options={{headerShown: false}}
    />
    <MainStack.Screen
      name={screenNames.Login}
      component={Login}
      options={{headerShown: false}}
    />
    <MainStack.Screen
      name={screenNames.Signup}
      component={Signup}
      options={{headerShown: true, title: ''}}
    />
    <MainStack.Screen
      name={screenNames.Otp}
      component={OTP}
      options={{headerShown: true, title: ''}}
    />
  </MainStack.Navigator>
);
const pushListener = new PushNotification();
const AuthRoot = ({navigation}) => {
  const routes = useNavigationState(state => state.routes);
  const currentRoute = routes[routes.length - 1];
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          return navigation.push(screenNames.ChatScreen, {
            threadInfo: JSON.parse(detail.notification.data?.notificationData),
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  useEffect(() => {
    pushListener.setUpMessageListener((data, type) => {
      if (type) {
        navigation.push(screenNames.ChatScreen, {
          threadInfo: JSON.parse(data?.data?.body),
        });
      } else {
        const activeScreenName =
          currentRoute?.state?.routes[currentRoute?.state?.routes?.length - 1]
            ?.name;
        if (activeScreenName !== screenNames.ChatScreen) {
          const notificationInfo = JSON.parse(data?.data?.body);
          createLocalNotification(
            String(notificationInfo.threadId),
            notificationInfo.friendInfo.name,
            notificationInfo.message,
            1 / 60,
            'CHAT_PUSH',
            data?.data?.body,
          );
        }
      }
    });
    return () => {
      pushListener.unsubscribeListener();
    };
  }, [currentRoute, navigation]);
  return (
    <AuthStack.Navigator
      initialRouteName={screenNames.Home}
      screenOptions={navigatorOption}>
      <AuthStack.Screen
        name={screenNames.Home}
        component={TabsScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={screenNames.ChatScreen}
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={screenNames.EditProfile}
        component={EditProfile}
        options={{headerShown: true, title: strings('signup.editProfile')}}
      />
      <AuthStack.Screen
        name={screenNames.AppInformation}
        component={AppInformation}
        options={{headerShown: true, title: ''}}
      />
      <AuthStack.Screen
        name={screenNames.Map}
        component={Map}
        options={{headerShown: true, title: ''}}
      />
    </AuthStack.Navigator>
  );
};
const MainNavigator = ({userToken, logoutScreen}) => {
  return (
    <RootStack.Navigator>
      {userToken ? (
        <RootStack.Screen
          name="auth"
          component={AuthRoot}
          options={{headerShown: false}}
        />
      ) : (
        <RootStack.Screen
          name="home"
          children={() => <WelcomeStack logoutScreen={logoutScreen} />}
          options={{headerShown: false}}
        />
      )}
    </RootStack.Navigator>
  );
};

export default MainNavigator;

const Style = StyleSheet.create({
  leftIcon: {
    marginLeft: scaleSize(16),
  },
  leftIconImage: {
    height: scaleSize(16),
    width: scaleSize(20),
  },
  tabIcon: {
    width: scaleSize(20),
    height: scaleSize(20),
    justifyContent: 'center',
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleSize(10),
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  textColor: {
    color: colors.lightText,
    textAlign: 'center',
    fontSize: 14,
    marginTop: scaleSize(5),
  },
  activeTextColor: {
    color: colors.selectedPrimaryColor,
    textAlign: 'center',
    fontSize: 14,
    marginTop: scaleSize(5),
  },
  activeImageColor: {
    tintColor: colors.selectedPrimaryColor,
  },
  tabImageColor: {
    tintColor: colors.leftIconImage,
  },
});
