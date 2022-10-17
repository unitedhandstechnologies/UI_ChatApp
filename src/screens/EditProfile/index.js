import React, {useCallback, useState, useEffect} from 'react';
import {View, TextInput, Alert} from 'react-native';
import {Wrapper, Typography, Avatar, Button, Loader} from 'components';
import {goBack} from 'navigation';
import {colors} from 'theme';
import {strings} from 'locales/i18n';
import {getUserInfo, setUserInfo as setUserInfoLocal} from 'utils';
import Style from './style';
import {editUserInfo} from './apis';

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [useImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setPhone] = useState('');
  useEffect(() => {
    const getInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
      setUserName(info?.name);
      setPhone(info?.phone);
    };
    getInfo();
  }, []);
  const onAvatarChange = useCallback(image => {
    setUserImage(image);
  }, []);
  const saveProfile = useCallback(() => {
    if (!userName) {
      return Alert.alert(strings('alert.alert'), strings('alert.name'));
    }
    setLoading(true);
    const form = new FormData();
    form.append('name', userName);
    form.append('phone', userPhone);
    if (useImage) {
      form.append('profile', useImage);
    }
    editUserInfo(form)
      .then(async ({data}) => {
        await setUserInfoLocal(data);
        return goBack();
      })
      .catch(error => {
        Alert.alert(
          strings('alert.warning'),
          error?.message ?? strings('alert.somethingWentWrong'),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userName, userPhone, useImage]);
  return (
    <Wrapper subContainerStyle={Style.container}>
      <View style={Style.upperView}>
        <Avatar
          style={Style.userImage}
          onChange={onAvatarChange}
          source={
            userInfo?.profile
              ? {uri: userInfo?.profile}
              : require('../../../assets/images/avatarPlaceholder.png')
          }
        />

        <Typography style={Style.userName} text={userInfo?.name} />
        {loading && <Loader loading={loading} />}
      </View>
      <View style={Style.lowerView}>
        <View style={Style.field}>
          <Typography style={Style.label} text={strings('signup.name')} />
          <TextInput
            placeholderTextColor={colors.placeholderColor}
            style={Style.inputText}
            placeholder={strings('signup.name')}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={Style.fieldPhone}>
          <Typography
            style={Style.label}
            text={strings('signup.phoneNumber')}
          />
          {/* <View style={Style.countryView}>
            <View style={Style.country}>
              <Text style={Style.countryCode}>
                +{userInfo.countryCode} {userInfo.phone}
              </Text>
            </View>
          </View> */}
          <TextInput
            placeholderTextColor={colors.placeholderColor}
            autoFocus
            keyboardType="numeric"
            maxLength={13}
            style={Style.inputText}
            // placeholder={userInfo.phone}
            value={userPhone}
            onChangeText={setPhone}
          />
        </View>
        <Button
          titleStyle={Style.buttonText}
          title={strings('signup.save')}
          buttonContainerStyle={Style.button}
          onPress={saveProfile}
        />
      </View>
    </Wrapper>
  );
};

export default EditProfile;
