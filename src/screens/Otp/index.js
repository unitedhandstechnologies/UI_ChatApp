import React, {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useState,
} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import messaging from '@react-native-firebase/messaging';
import {Typography, Button, Wrapper, AuthContext, Loader} from 'components';
import {colors} from 'theme';
import {strings} from 'locales/i18n';
import {setUserInfo, storeToken} from 'utils';
import Style from './style';
import {resendUserOtp, verifyUserOtp} from './apis';
const OTP = ({navigation}) => {
  const otpRef = useRef();
  const {params} = useRoute();
  const {signIn} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  useEffect(() => {
    const activeScreenListener = navigation.addListener('focus', () => {
      if (otpRef.current) {
        otpRef.current.focus();
      }
    });
    return () => {
      activeScreenListener();
    };
  }, [navigation]);
  const resendOtp = () => {
    setLoading(true);
    resendUserOtp({authorizationKey: params?.authorizationKey})
      .then(() => {
        Alert.alert(strings('alert.alert'), strings('alert.otpsend'));
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
  };
  const checkOtp = useCallback(async () => {
    if (otp && otp?.match(/\d/g).length === 6) {
      setLoading(true);
      let deviceToken;
      try {
        deviceToken = await messaging().getToken();
      } catch (err) {}
      verifyUserOtp({
        otp,
        deviceToken,
        authorizationKey: params?.authorizationKey,
      })
        .then(async ({data}) => {
          setUserInfo(data);
          await storeToken(data.authorizationKey);
          return signIn(data.authorizationKey);
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
    }
  }, [otp, params?.authorizationKey, signIn]);
  return (
    <Wrapper>
      <View style={Style.container}>
        <Typography
          style={Style.heading}
          text={strings('otp.phoneVerification')}
        />
        <Typography style={Style.subHeading} text={strings('otp.otpMessage')} />
        <Typography style={Style.subHeading} text={params?.phone} />
        <View style={Style.otpField}>
          <OtpInputs
            placeholderTextColor={colors.placeholderColor}
            ref={otpRef}
            handleChange={code => setOtp(code)}
            numberOfInputs={6}
            inputContainerStyles={Style.otpInput}
            placeholder="-"
            inputStyles={Style.otpInputColor}
          />
        </View>
        <View style={Style.resendView}>
          <TouchableOpacity onPress={resendOtp} style={Style.resend}>
            <Text style={Style.resendText}>{strings('otp.resendOtp')}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            titleStyle={Style.buttonText}
            title={strings('otp.submit')}
            buttonContainerStyle={Style.button}
            onPress={checkOtp}
          />
        </View>
        {loading && <Loader loading={loading} />}
      </View>
    </Wrapper>
  );
};

export default OTP;
