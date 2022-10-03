import {StyleSheet} from 'react-native';
import {scaleSize, colors} from 'theme';
const {selectedPrimaryColor, white} = colors;

const style = StyleSheet.create({
  container: {
    width: scaleSize(38),
    height: scaleSize(38),
    backgroundColor: selectedPrimaryColor,
    borderRadius: scaleSize(40 / 2),
  },
  avatarLabelView: {
    width: scaleSize(38),
    height: scaleSize(38),
    borderRadius: scaleSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    fontSize: scaleSize(20),
    color: white,
    textAlign: 'center',
  },
});
export default style;
