import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from 'theme';
import style from './style';

const {white} = colors;

const CLoader = ({loading, color = white, loaderContainerStyle}) => {
  if (!loading) {
    return null;
  }
  return (
    <View style={style.modalBackground}>
      <View style={[style.activityIndicatorWrapper, loaderContainerStyle]}>
        <ActivityIndicator size={'large'} color={color} />
      </View>
    </View>
  );
};

export default CLoader;
