import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {Wrapper, Typography, AuthContext, Loader} from 'components';
import {push, screenNames} from 'navigation';
import {strings} from 'locales/i18n';
import {getUserInfo} from 'utils';
import Style from './styles';
import {logotUser, appInfo, deleteUser} from './apis';

const Settings = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [appInformation, setAppInformation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const getContect = useCallback(
    value => {
      if (value === 'Privacy') {
        const content = appInformation.find(
          ({key_pair}) => key_pair === 'Privacy Policy',
        );
        if (!content) {
          return {
            title: 'Privacy Policy',
            html: `<div>No content found</div>`,
          };
        }
        return {
          title: content?.key_pair,
          html: content?.value,
        };
      }
      const content = appInformation.find(
        ({key_pair}) => key_pair === 'Terms & Conditions',
      );
      if (!content) {
        return {
          title: 'Terms & Conditions',
          html: `<div>No content found</div>`,
        };
      }
      return {
        title: content?.key_pair,
        html: content?.value,
      };
    },
    [appInformation],
  );
  useEffect(() => {
    const getInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    const getInformationOfApp = () => {
      setLoading(true);
      appInfo()
        .then(({data}) => {
          setAppInformation(data);
        })
        .catch(({message}) => {
          Alert.alert(
            strings('alert.warning'),
            message ?? strings('alert.somethingWentWrong'),
          );
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const activeScreenListener = navigation.addListener('focus', () => {
      getInfo();
    });
    getInfo();
    getInformationOfApp();
    return () => {
      activeScreenListener();
    };
  }, [navigation]);
  const closeModel = useCallback(() => {
    setModalVisible(val => !val);
  }, []);
  const deleteAccount = () => {
    setLoading(true);
    deleteUser()
      .then(() => {
        return signOut('signup');
      })
      .catch(({message}) => {
        Alert.alert(
          strings('alert.warning'),
          message ?? strings('alert.somethingWentWrong'),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const logoutUserInfo = () => {
    setLoading(true);
    logotUser()
      .then(() => {
        return signOut();
      })
      .catch(({message}) => {
        Alert.alert(
          strings('alert.warning'),
          message ?? strings('alert.somethingWentWrong'),
        );
        return signOut();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const ListItem = item => {
    return (
      <TouchableOpacity
        style={Style.listView}
        onPress={() => {
          if (item.item === 'Logout') {
            return Alert.alert(
              strings('settings.appName'),
              strings('settings.sureLogout'),
              [
                {
                  text: strings('settings.alertNo'),

                  style: 'cancel',
                },
                {text: strings('settings.alertYes'), onPress: logoutUserInfo},
              ],
            );
          }
          if (item.item === 'Edit Profile') {
            return push(screenNames.EditProfile);
          }
          if (item.item === 'Delete Account') {
            return Alert.alert(
              strings('settings.appName'),
              strings('settings.sureDelete'),
              [
                {
                  text: strings('settings.alertNo'),
                  style: 'cancel',
                },
                {text: strings('settings.alertYes'), onPress: deleteAccount},
              ],
            );
          }
          return push(screenNames.AppInformation, {
            ...getContect(item.item),
          });
        }}>
        <Typography style={Style.listText} text={item.item} />
      </TouchableOpacity>
    );
  };
  return (
    <Wrapper subContainerStyle={Style.container}>
      <View style={Style.upperView}>
        <TouchableOpacity activeOpacity={1} onPress={closeModel}>
          <Image
            style={Style.userImage}
            source={
              userInfo?.profile
                ? {uri: userInfo?.profile}
                : require('../../../assets/images/avatarPlaceholder.png')
            }
          />
        </TouchableOpacity>
        <Typography style={Style.userName} text={userInfo?.name} />
      </View>
      <View style={Style.lowerView}>
        <FlatList
          style={Style.listStyle}
          data={[
            'Edit Profile',
            'Terms of use',
            'Privacy',
            'Delete Account',
            'Logout',
          ]}
          renderItem={({item}) => <ListItem item={item} />}
        />
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        style={Style.background}
        onRequestClose={closeModel}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModel}
          style={Style.centeredView}>
          <View style={Style.addMargin}>
            <View style={Style.internalView}>
              <TouchableOpacity onPress={closeModel} style={Style.iconView}>
                <Image
                  style={Style.crossIcon}
                  source={require('../../../assets/images/Cross-xxhdpi.png')}
                />
              </TouchableOpacity>
              <View style={Style.UserImageView}>
                <Image
                  style={Style.userImagePrv}
                  resizeMode="cover"
                  source={
                    userInfo?.profile
                      ? {uri: userInfo?.profile}
                      : require('../../../assets/images/avatarPlaceholder.png')
                  }
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      {loading && <Loader loading={loading} />}
    </Wrapper>
  );
};

export default Settings;
