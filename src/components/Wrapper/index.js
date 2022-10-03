import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Style from './style';

const Wrapper = ({children, wrapperStyle, subContainerStyle}) => {
  const onContainerClick = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={[Style.container, wrapperStyle]}
      onPress={onContainerClick}>
      <View style={Style.innerView}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={[Style.container, subContainerStyle]}>
          {children}
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Wrapper;
