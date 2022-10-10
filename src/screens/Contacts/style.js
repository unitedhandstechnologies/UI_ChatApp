import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {lightText, grey, black, white, lightBlue} = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 100,
  },
  chatText: {
    fontSize: scaleFont(30),
    fontWeight: 'bold',
    marginTop: scaleSize(30),
    marginHorizontal: scaleSize(20),
  },
  mapIcon: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginTop: scaleSize(40),
    marginHorizontal: scaleSize(20),
    color: 'blue',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    width: '100%',
    height: scaleSize(54),
    borderRadius: scaleSize(30),
    backgroundColor: grey,
    paddingLeft: scaleSize(40),
    fontSize: scaleFont(16),
    marginTop: scaleFont(20),
    paddingVertical: scaleSize(15),
    color: black,
  },
  searchView: {
    marginHorizontal: scaleSize(20),
  },
  searchIcon: {
    position: 'absolute',
    top: scaleSize(40),
    left: scaleSize(18),
    zIndex: 1,
    height: scaleSize(13),
    width: scaleSize(13),
  },
  userName: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    flex: 1,
  },
  userImage: {
    height: scaleSize(40),
    width: scaleSize(40),
    borderRadius: scaleSize(40 / 2),
    backgroundColor: lightText,
  },
  textsView: {
    marginLeft: scaleSize(13),
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(12),
    marginHorizontal: scaleSize(20),
  },
  userMessage: {
    fontSize: scaleFont(14),
    marginTop: scaleFont(5),
    color: lightText,
  },
  listUpperView: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: scaleSize(5),
    borderColor: lightText,
  },
  nameView: {
    flexDirection: 'row',
  },
  timeText: {
    color: lightText,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  background: {
    backgroundColor: '#626262',
  },
  internalView: {
    backgroundColor: white,
    opacity: 1,
    height: scaleSize(520),
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
    flexGrow: 1,
    justifyContent: 'center',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  UserImageView: {
    alignItems: 'center',
  },
  ModalUserIcon: {
    height: scaleSize(50),
    width: scaleSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(50),
  },
  nameViewModel: {
    marginTop: scaleSize(10),
  },
  userNameModel: {
    fontWeight: 'bold',
    fontSize: scaleFont(18),
    color: black,
    textAlign: 'center',
  },
  userPhoneModel: {
    fontSize: scaleFont(12),
    color: black,
    textAlign: 'center',
  },
  inputView: {
    marginVertical: scaleSize(20),
  },
  messageBox: {
    backgroundColor: lightBlue,
    height: scaleSize(250),
    padding: scaleSize(10),
    color: black,
    alignItems: 'flex-start',
  },
  buttonView: {
    marginTop: scaleSize(10),
  },
  keyboardContainer: {
    flex: 1,
    marginBottom: scaleSize(20),
  },
  noContactText: {
    color: black,
    fontSize: scaleFont(15),
  },
  noContact: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
