import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentView: {
    paddingHorizontal: scale(20),
  },
  titleStyle: {
    marginBottom: scale(15),
    fontSize: scale(17),
  },
});

export default styles;
