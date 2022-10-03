import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {white, grey, lightText, black} = colors;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: white,
    marginHorizontal: scaleSize(15),
    paddingVertical: scaleSize(20),
  },
  countrylistItem: {
    flexDirection: 'row',
    marginBottom: scaleSize(10),
    alignItems: 'center',
    marginHorizontal: scaleSize(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: lightText,
    paddingBottom: scaleSize(10),
    flex: 1,
  },
  countryName: {
    fontSize: scaleFont(16),
    flex: 1,
    color: black,
  },
  countryCodeText: {
    marginRight: scaleSize(10),
    color: black,
  },
  flagIcons: {
    height: scaleSize(25),
    width: scaleSize(32),
    marginRight: scaleSize(8),
  },
  flatList: {
    flex: 1,
    paddingVertical: scaleSize(20),
  },
  modalText: {
    width: scaleSize(45),
  },
  searchView: {
    marginHorizontal: scaleSize(20),
    marginBottom: scaleSize(10),
  },
  searchIcon: {
    position: 'absolute',
    top: scaleSize(32),
    left: scaleSize(18),
    zIndex: 1,
    height: scaleSize(13),
    width: scaleSize(13),
  },
  searchInput: {
    width: '100%',
    height: scaleSize(40),
    borderRadius: scaleSize(30),
    backgroundColor: grey,
    paddingLeft: scaleSize(40),
    fontSize: scaleFont(16),
    marginTop: scaleFont(20),
    color: black,
    placeholderColor: black,
  },
  crossIcon: {
    position: 'absolute',
    right: scaleSize(16),
    height: scaleSize(30),
    width: scaleSize(30),
  },
  crossView: {
    marginBottom: scaleSize(30),
  },
});

export default styles;
