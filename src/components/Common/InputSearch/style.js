import {StyleSheet} from 'react-native';
import {scaleSize, colors} from 'theme';

const {greyColor, greyColor1, greyColor2, white, blueColor} = colors;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greyColor,
    borderRadius: scaleSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    maxHeight: 60,
    borderWidth: 2,
    borderColor: greyColor,
    paddingHorizontal: scaleSize(16),
  },
  focusedTextInput: {
    borderColor: blueColor,
  },
  input: {
    flex: 1,
    height: scaleSize(50),
    paddingLeft: scaleSize(8),
    backgroundColor: 'transparent',
    color: white,
    fontSize: scaleSize(16),
  },
  icon: {
    color: greyColor2,
  },
  leftText: {
    fontSize: scaleSize(16),
    color: greyColor1,
  },
});

export default style;
