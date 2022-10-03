import React, {useCallback, useState, useEffect} from 'react';
import {TextInput, View, Alert, Text} from 'react-native';
import {Wrapper, Typography, Button, CountryPicker, Loader} from 'components';
import {push, screenNames} from 'navigation';
import {validatePhone} from 'utils/FormValidation';
import {colors} from 'theme';
import {strings} from 'locales/i18n';
import {saveAppOpenInfo} from 'utils';
import Style from './style';
import {userAuth} from './api';

const Login = () => {
  const [countryCode, setCountryCode] = useState('+49');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const saveInfo = async () => {
      await saveAppOpenInfo();
    };
    saveInfo();
  }, []);
  const checkPhone = () => {
    setError(validatePhone('phone', phone).phone);
  };
  const handleCountry = useCallback(data => {
    setCountryCode(`+${data}`);
  }, []);
  const redirectRegister = useCallback(() => {
    push(screenNames.Signup);
  }, []);
  const handleLogin = useCallback(() => {
    const isError = validatePhone('phone', phone);
    if (!phone) {
      return setError('Phone field is required');
    }
    if (isError.phone) {
      return setError('Phone field is required');
    }
    setLoading(true);
    userAuth(phone, countryCode.replace('+', ''))
      .then(({data}) => {
        return push(screenNames.Otp, {
          phone: `${countryCode}${phone}`,
          authorizationKey: data.authorizationKey,
        });
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
  }, [phone, countryCode]);
  return (
    <Wrapper>
      <View style={Style.container}>
        <Typography style={Style.heading} text={strings('login.login')} />
        <Typography
          style={Style.subHeading}
          text={strings('login.enterMobile')}
        />
        <View style={Style.phoneView}>
          <Typography text={strings('login.phoneNumber')} />
          <View style={[Style.input, error && Style.inputError]}>
            <View style={Style.countryPicker}>
              <View style={Style.selectedCode}>
                <CountryPicker onCountrySelect={handleCountry}>
                  {countryCode}
                </CountryPicker>
              </View>
            </View>
            <TextInput
              placeholderTextColor={colors.placeholderColor}
              autoFocus
              keyboardType="numeric"
              maxLength={15}
              style={Style.inputText}
              placeholder={'Enter number here'}
              onChangeText={value => {
                setError('');
                setPhone(value);
              }}
              onBlur={checkPhone}
              onFocus={() => setError('')}
            />
          </View>
          <View>
            {error ? <Text style={Style.errorText}>{error}</Text> : null}
          </View>
          <Button
            titleStyle={Style.buttonText}
            title={strings('login.next')}
            buttonContainerStyle={Style.button}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>
        <View style={Style.newUser}>
          <Typography
            style={Style.newUserText}
            text={strings('login.newUser')}
          />
          <Typography
            style={Style.createAccount}
            text={strings('login.createAccount')}
            onPress={redirectRegister}
          />
        </View>
        {loading && <Loader loading={loading} />}
      </View>
    </Wrapper>
  );
};

export default Login;
