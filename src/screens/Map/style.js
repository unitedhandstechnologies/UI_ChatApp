import {StyleSheet} from 'react-native';
import {colors, scaleSize} from 'theme';
const {white, lightText} = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: scaleSize(12),
  },
  image: {
    height: scaleSize(400),
    width: '100%',
  },
  textView: {
    marginHorizontal: scaleSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontSize: scaleSize(22),
    marginTop: scaleSize(30),
    fontWeight: 'bold',
    marginBottom: scaleSize(20),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaleSize(15),
    color: lightText,
    marginBottom: scaleSize(40),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: scaleSize(30),
  },
  buttonText: {
    color: white,
    flex: 0.5,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: scaleSize(20),
  },
  MainContainer: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    alignItems: 'center',  
    justifyContent: 'flex-end',  
  },  
  mapStyle: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
  }
});

export default styles;
