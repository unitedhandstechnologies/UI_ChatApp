import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {lightBlue, white, selectedPrimaryColor} = colors;
const styles = StyleSheet.create({
  userImage: {
    height: scaleSize(150),
    width: scaleSize(150),
    borderRadius: scaleSize(150),
  },
  userImagePrv: {
    height: scaleSize(250),
    width: '100%',
    borderRadius: scaleSize(20),
  },
  upperView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightBlue,
  },
  lowerView: {
    flex: 0.6,
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
  internalView: {
    backgroundColor: white,
    opacity: 1,
    height: scaleSize(325),
    width: '100%',
    paddingHorizontal: scaleSize(12),
    borderRadius: 20,
    padding: scaleSize(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addMargin: {
    marginHorizontal: scaleSize(20),
  },
  crossIcon: {
    height: scaleSize(20),
    width: scaleSize(20),
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalView: {
    marginHorizontal: scaleSize(10),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  UserImageView: {
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default styles;
