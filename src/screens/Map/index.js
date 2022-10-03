import React,{useEffect,useState} from 'react';
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
import Geolocation from '@react-native-community/geolocation';
import {View, Image, SafeAreaView, ScrollView, } from 'react-native';
import {strings} from 'locales/i18n';
import {reset, screenNames} from 'navigation';
import {Typography, Loader} from 'components';
import Button from 'components/Common/Button';
import styles from './style';

const Map = () => {
  const [location, setLocation] = useState({
    latitude : 0,
    longitude: 0
  });
  const [loading, setLoading] = useState(true);
  const handlePress = () => {
    reset(screenNames.Signup);
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation({latitude:position.coords.latitude, longitude:position.coords.longitude});
        setLoading(false)
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  },[])
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.MainContainer}>
        {loading && <Loader loading={loading} />}
        <MapView  
          style={styles.mapStyle}  
          showsUserLocation={false}  
          zoomEnabled={true}  
          zoomControlEnabled={true}  
          initialRegion={{  
            latitude: location.latitude,   
            longitude: location.longitude,  
            latitudeDelta: 0.0922,  
            longitudeDelta: 0.0421,  
          }}>  

          <Marker  
            coordinate={{ latitude: location.latitude, longitude: location.longitude}}  
            title={"JavaTpoint"}  
            description={"Java Training Institute"}  
          />  
        </MapView>  
          
      </View>  
    </SafeAreaView>
  );
};

export default Map;
