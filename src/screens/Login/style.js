import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {
  white,
  lightText,
  lightPrimaryColor,
  textBackgroundColor,
  black,
  redColor1,
} = colors;
const style = StyleSheet.create({
  container: {
    backgroundColor: white,
    marginTop: scaleSize(60),
    marginHorizontal: scaleSize(18),
  },
  phoneView: {
    marginHorizontal: scaleSize(10),
    marginTop: scaleSize(30),
  },
  heading: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
  },
  subHeading: {
    fontSize: scaleFont(15),
    marginBottom: scaleSize(10),
    color: lightText,
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
  },
  input: {
    flexDirection: 'row',
    marginTop: scaleSize(20),
    marginBottom: scaleSize(40),
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
  errorText: {
    color: redColor1,
    fontSize: 15,
    marginBottom: scaleSize(40),
    marginTop: scaleSize(2),
  },
  inputWapper: {
    display: 'flex',
  },
  inputError: {
    marginBottom: 0,
    borderRadius: scaleSize(40),
    borderColor: redColor1,
    borderWidth: 2,
  },
});
export default style;
