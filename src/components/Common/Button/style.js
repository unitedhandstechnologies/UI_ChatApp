import {StyleSheet} from 'react-native';
import {scaleSize, colors} from 'theme';

const {white, blueColor} = colors;

const style = StyleSheet.create({
  buttonStyle: {
    backgroundColor: blueColor,
    alignItems: 'center',
    borderRadius: scaleSize(30),
    width: '100%',
    paddingVertical: scaleSize(10),
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: white,
    fontSize: scaleSize(16),
    lineHeight: scaleSize(24),
    alignSelf: 'center',
  },
  buttonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  gradient: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
});
export default style;
