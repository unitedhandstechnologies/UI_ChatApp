import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {View, Image, SafeAreaView, ScrollView} from 'react-native';
import {strings} from 'locales/i18n';
import {reset, screenNames} from 'navigation';
import {Typography, Loader} from 'components';
import Button from 'components/Common/Button';
import styles from './style';

const Map = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);
  const handlePress = () => {
    reset(screenNames.Signup);
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position);
        setLoading(false);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.MainContainer}>
        {loading && <Loader loading={loading} />}
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          // minZoomLevel={20}
          // scrollEnabled={false}
          // zoomEnabled={false}
          // rotateEnabled={false}
          initialRegion={{
            latitude: 28.57966,
            longitude: 77.32111,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{latitude: 28.57966, longitude: 77.32111}}
            title={'user A'}
            description={'user A'}
            pinColor={'purple'}>
            <Image
              source={require('../../../assets/images/Profile3-ldpi.png')}
            />
          </Marker>
          <Marker
            coordinate={{latitude: 28.56966, longitude: 77.32111}}
            title={'user B'}
            description={'user B'}>
            <Image
              source={require('../../../assets/images/Profile2-mdpi.png')}
            />
          </Marker>
          {/* <Marker
            coordinate={{latitude: 28.56966, longitude: 77.3311}}
            title={'user B'}
            description={'user B'}>
            <Image
              source={require('../../../assets/images/Profile2-mdpi.png')}
            />
          </Marker> */}
          <Marker
            coordinate={{latitude: 28.56966, longitude: 77.33111}}
            title={'user C'}
            description={'user C'}>
            <Image
              source={require('../../../assets/images/Profile-ldpi.png')}
            />
          </Marker>
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default Map;
