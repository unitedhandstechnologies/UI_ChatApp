import React, {useCallback, useState, useEffect} from 'react';
import {
  TextInput,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import {
  Typography,
  Avatar,
  Button,
  Wrapper,
  CountryPicker,
  Loader,
  SearchBarWithAutocomplete,
} from 'components';
import {colors} from 'theme';
import {strings} from 'locales/i18n';
import {push, reset, screenNames} from 'navigation';
import {
  checkAllRequiredFieldsWithKey,
  validatePhone,
  checkRequiredField,
} from 'utils/FormValidation';
import Style from './style';
import {registerUser, getLocationData} from './apis';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
import axios from 'axios';
import {useDebounce} from 'hooks';
Geocoder.init(Config.GOOGLE_API_KEY);
const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const Signup = () => {
  const [userImage, setUserImage] = useState();
  const [autoSearch, setAutoSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [countryCode, setCountryCode] = useState({
    code: '+49',
    flag: require('../../utils/Flags/images/de.png'),
  });
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [userForm, setUserForm] = useState({
    name: '',
    phone: '',
    city: '',
  });
  const [userErrors, setUserErrors] = useState({
    name: '',
    phone: '',
    city: '',
  });
  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState([]);
  useEffect(() => {
    //Geolocation.getCurrentPosition(info => console.log('-------',info));
    requestLocationPermission();
  }, []);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This App needs access to your location ' +
            'so we can know where you are.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use locations ');
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLoading(true);
            setLocationEnabled(true);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            Geocoder.from(position.coords.latitude, position.coords.longitude)
              .then(json => {
                var addressComponent = json.results[0].address_components[1];
                if (addressComponent) {
                  setLoading(false);
                  handleInput('city', addressComponent.short_name);
                }
              })
              .catch(error => {
                setLocationEnabled(false);
                setLoading(false);
                console.warn(error);
              });
          },
          error => {
            setAutoSearch(true);
            setLocationEnabled(false);
            setLoading(false);
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
        setLocationEnabled(false);
        setAutoSearch(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onChangeText = async () => {
    if (search.term.trim() === '') return;
    if (!search.fetchPredictions) return;

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${Config.GOOGLE_API_KEY}&input=${search.term}`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl,
      });
      if (result) {
        const {
          data: {predictions},
        } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useDebounce(onChangeText, 1000, [search.term]);

  const onPredictionTapped = async (
    placeId,
    description,
    structured_formatting,
  ) => {
    let city = structured_formatting.main_text;
    handleInput('city', city);
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${Config.GOOGLE_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl,
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: {location},
            },
          },
        } = result;
        const {lat, lng} = location;
        setLocation({latitude: lat, longitude: lng});
        setShowPredictions(false);
        setSearch({term: description, fetchPredictions: false});
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleInput = (name, value) => {
    setUserForm({...userForm, [name]: value});
  };
  const removeError = name => {
    setUserErrors({...userErrors, [name]: ''});
  };
  const handleCountry = useCallback((code, flag) => {
    setCountryCode({
      code: `+${code}`,
      flag,
    });
  }, []);
  const onAvatarChange = useCallback(image => {
    setUserImage(image);
  }, []);
  const redirectLogin = useCallback(() => {
    reset(screenNames.Login, {});
  }, []);
  const checkAllRequiredField = useCallback(() => {
    const errors = checkAllRequiredFieldsWithKey(
      {name: '', phone: '', city: ''},
      userForm,
    );
    setUserErrors({...userErrors, ...errors});
    return Object.values(errors).some(value => value.length > 0);
  }, [userForm, userErrors]);
  const checkError = useCallback(
    ({name, value}) => {
      const errors = {};
      switch (name) {
        case 'phone':
          Object.assign(errors, validatePhone(name, value));
          break;
        default:
          Object.assign(errors, checkRequiredField(name, value));
          break;
      }
      setUserErrors({...userErrors, ...errors});
    },
    [userErrors],
  );
  const handleSubmit = useCallback(() => {
    if (!checkAllRequiredField()) {
      setLoading(true);
      const form = new FormData();
      form.append('name', userForm.name);
      form.append('phone', userForm.phone);
      form.append('countryCode', countryCode.code.replace('+', ''));
      form.append('city', userForm.city);
      form.append('latitude', location.latitude);
      form.append('longitude', location.longitude);
      if (userImage) {
        form.append('profile', userImage);
      }
      registerUser(form)
        .then(async ({data}) => {
          return push(screenNames.Otp, {
            phone: `${countryCode.code}${userForm.phone}`,
            authorizationKey: data.authorizationKey,
          });
        })
        .catch(({error_message}) => {
          console.log('eroo', error_message);
          Alert.alert(
            strings('alert.warning'),
            error_message ?? strings('alert.somethingWentWrong'),
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [checkAllRequiredField, userForm, countryCode, userImage]);
  return (
    <Wrapper>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={Style.container}>
        <Typography
          style={Style.heading}
          text={strings('signup.registeredWith')}
        />
        <View style={Style.userRow}>
          <Avatar
            onChange={onAvatarChange}
            source={require('../../../assets/images/avatarPlaceholder.png')}
          />
        </View>
        <View style={Style.formView}>
          <View style={Style.field}>
            <Typography style={Style.label} text={strings('signup.name')} />
            <TextInput
              placeholderTextColor={colors.placeholderColor}
              style={[Style.inputText1, userErrors.name && Style.inputError]}
              onChangeText={value => handleInput('name', value)}
              value={userForm.name}
              placeholder={strings('signup.name')}
              onFocus={() => removeError('name')}
              onBlur={() => checkError({name: 'name', value: userForm.name})}
            />
            <View>
              {userErrors.name ? (
                <Text style={Style.errorText}>{userErrors.name}</Text>
              ) : null}
            </View>
          </View>

          <View style={Style.field}>
            <Typography
              style={Style.label}
              text={strings('signup.phoneNumber')}
            />
            <View style={[Style.input, userErrors.phone && Style.inputError]}>
              <View style={Style.countryPicker}>
                <View style={Style.selectedCode}>
                  <CountryPicker onCountrySelect={handleCountry}>
                    {countryCode.code}
                  </CountryPicker>
                </View>
              </View>
              <TextInput
                placeholderTextColor={colors.placeholderColor}
                keyboardType="numeric"
                maxLength={15}
                style={Style.inputText}
                onChangeText={value => handleInput('phone', value)}
                placeholder={strings('signup.phoneNumber')}
                value={userForm.phone}
                onFocus={() => removeError('phone')}
                onBlur={() =>
                  checkError({name: 'phone', value: userForm.phone})
                }
              />
            </View>
            <View>
              {userErrors.phone ? (
                <Text style={Style.errorText}>{userErrors.phone}</Text>
              ) : null}
            </View>
          </View>

          {autoSearch && !locationEnabled ? (
            <View style={Style.field}>
              <Typography style={Style.label} text={strings('signup.city')} />
              <SafeAreaView style={{flex: 1}}>
                <SearchBarWithAutocomplete
                  placeholderTextColor={colors.placeholderColor}
                  style={[userErrors.city && Style.inputError]}
                  // value={search.term}
                  value={userForm.city}
                  placeholder={strings('signup.city')}
                  onFocus={() => removeError('city')}
                  onBlur={() =>
                    checkError({name: 'city', value: userForm.city})
                  }
                  onChangeText={text => {
                    handleInput('city', text);
                    setSearch({term: text, fetchPredictions: true});
                  }}
                  showPredictions={showPredictions}
                  predictions={predictions}
                  onPredictionTapped={onPredictionTapped}
                />

                <View>
                  {userErrors.city ? (
                    <Text style={Style.errorText}>{userErrors.city}</Text>
                  ) : null}
                </View>
              </SafeAreaView>
            </View>
          ) : (
            <View style={Style.field}>
              <Typography style={Style.label} text={strings('signup.city')} />
              <TextInput
                placeholderTextColor={colors.placeholderColor}
                style={[Style.inputText1, userErrors.city && Style.inputError]}
                onChangeText={value => handleInput('city', value)}
                value={userForm.city}
                placeholder={strings('signup.city')}
                onFocus={() => removeError('city')}
                onBlur={() => checkError({name: 'city', value: userForm.city})}
                editable={false}
              />
              <View>
                {userErrors.city ? (
                  <Text style={Style.errorText}>{userErrors.city}</Text>
                ) : null}
              </View>
            </View>
          )}
          <Button
            titleStyle={Style.buttonText}
            title={strings('signup.submit')}
            buttonContainerStyle={Style.button}
            onPress={handleSubmit}
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={redirectLogin}
          style={Style.newUser}>
          <Typography
            style={Style.newUserText}
            text={strings('signup.alreadyUser')}
          />
          <Typography
            style={Style.createAccount}
            text={strings('signup.login')}
            onPress={redirectLogin}
          />
        </TouchableOpacity>
        {loading && <Loader loading={loading} />}
      </ScrollView>
    </Wrapper>
  );
};

export default Signup;
