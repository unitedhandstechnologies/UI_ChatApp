import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {white, lightText, textBackgroundColor, black} = colors;
const style = StyleSheet.create({
  container: {
    backgroundColor: white,
    marginTop: scaleSize(20),
    marginHorizontal: scaleSize(18),
  },
  heading: {
    fontSize: scaleFont(19),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
  },
  subHeading: {
    fontSize: scaleFont(14),
    marginBottom: scaleSize(10),
    color: lightText,
    width: scaleSize(200),
    lineHeight: scaleSize(20),
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
  otpField: {
    marginTop: scaleSize(40),
    marginBottom: scaleSize(40),
    flex: 1,
  },
  resend: {
    alignItems: 'center',
  },
  resendText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    letterSpacing: scaleSize(1),
    fontSize: scaleFont(15),
    color: black,
  },
  resendView: {
    marginBottom: scaleSize(30),
  },
  otpInput: {
    borderRadius: scaleSize(50),
    backgroundColor: textBackgroundColor,
    width: scaleSize(45),
    height: scaleSize(45),
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    textAlign: 'center',
    paddingLeft: scaleSize(12),
  },
  otpInputColor: {
    color: black,
  },
});
export default style;
