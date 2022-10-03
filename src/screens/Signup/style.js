import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {
  white,
  lightText,
  black,
  lightPrimaryColor,
  textBackgroundColor,
  redColor1,
} = colors;
const style = StyleSheet.create({
  container: {
    backgroundColor: white,
    marginTop: scaleSize(20),
    marginHorizontal: scaleSize(18),
    flexGrow: 1
  },
  formView: {
    marginTop: scaleSize(30),
  },
  label: {
    color: lightText,
    fontSize: scaleFont(14),
    fontWeight: '400',
    marginLeft: scaleSize(5),
    marginBottom: scaleSize(6),
  },
  heading: {
    fontSize: scaleFont(19),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
    width: scaleSize(180),
    lineHeight: scaleSize(30),
  },
  subHeading: {
    fontSize: scaleFont(15),
    marginBottom: scaleSize(10),
    color: lightText,
  },
  inputText: {
    backgroundColor: textBackgroundColor,
    flex: 1,
    height: scaleSize(45),
    padding: scaleSize(10),
    borderBottomRightRadius: scaleSize(40),
    borderTopRightRadius: scaleSize(40),
    color: black,
  },
  inputText1: {
    backgroundColor: textBackgroundColor,
    flex: 1,
    height: scaleSize(45),
    padding: scaleSize(10),
    borderRadius: scaleSize(40),
    color: black,
  },
  newUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(45),
  },
  newUserText: {
    fontSize: scaleFont(14),
    marginRight: scaleSize(5),
    fontWeight: '500',
  },
  createAccount: {
    color: lightPrimaryColor,
    fontWeight: '500',
  },
  buttonText: {
    color: white,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: scaleFont(18),
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: scaleSize(30),
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: scaleSize(13),
  },
  input: {
    flexDirection: 'row',
    marginBottom: scaleSize(2),
  },
  countryPicker: {
    backgroundColor: textBackgroundColor,
    height: scaleSize(45),
    width: scaleSize(45),
    borderBottomLeftRadius: scaleSize(40),
    borderTopLeftRadius: scaleSize(40),
    justifyContent: 'center',
  },
  selectedCode: {
    padding: 12,
  },
  userRow: {
    marginTop: scaleSize(18),
  },
  field: {
    marginBottom: scaleSize(15),
  },
  country: {
    flexDirection: 'row',
  },
  flagImage: {
    height: scaleSize(20),
    width: scaleSize(20),
    marginLeft: scaleSize(12),
    marginRight: scaleSize(8),
    borderRadius: scaleSize(20),
  },
  countryCode: {
    color: black,
  },
  errorText: {
    color: redColor1,
    fontSize: 15,
    marginTop: scaleSize(2),
  },
  inputError: {
    marginBottom: 0,
    borderRadius: scaleSize(40),
    borderColor: redColor1,
    borderWidth: 2,
  },
});
export default style;
