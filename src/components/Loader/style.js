import {StyleSheet} from 'react-native';
import {colors, scaleSize} from 'theme';

const {selectedPrimaryColor, transparent} = colors;
const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: transparent,
    zIndex: 3,
  },
  activityIndicatorWrapper: {
    backgroundColor: selectedPrimaryColor,
    height: scaleSize(100),
    width: scaleSize(100),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
