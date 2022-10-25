import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {lightBlue, black, textBackgroundColor, lightText} = colors;
const styles = StyleSheet.create({
  userImage: {
    height: scaleSize(150),
    width: scaleSize(150),
    borderRadius: scaleSize(150),
  },
  upperView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightBlue,
  },
  lowerView: {
    flex: 0.6,
    marginHorizontal: scaleSize(20),
    marginTop: scaleSize(20),
  },
  container: {
    flex: 1,
  },
  userName: {
    marginTop: scaleSize(20),
    fontSize: scaleSize(18),
    fontWeight: '400',
  },
  listView: {
    paddingVertical: scaleSize(20),
    paddingHorizontal: scaleSize(25),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listStyle: {
    marginTop: scaleSize(40),
  },
  listText: {
    fontSize: scaleFont(16),
  },
  field: {
    marginBottom: scaleSize(15),
  },
  label: {
    color: lightText,
    fontSize: scaleFont(14),
    fontWeight: '400',
    marginLeft: scaleSize(5),
    marginBottom: scaleSize(12),
  },
  inputText: {
    backgroundColor: textBackgroundColor,
    height: scaleSize(45),
    padding: scaleSize(10),
    borderRadius: scaleSize(40),
    color: black,
  },
  button: {
    marginTop: scaleSize(30),
  },
  country: {
    flexDirection: 'row',
  },
  countryView: {
    backgroundColor: textBackgroundColor,
    height: scaleSize(45),
    borderRadius: scaleSize(40),
    justifyContent: 'center',
    padding: scaleSize(12),
  },
  countryCode: {
    opacity: 0.4,
    color: black,
  },
});

export default styles;
