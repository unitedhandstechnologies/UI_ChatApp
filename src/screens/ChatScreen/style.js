import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {black, lightBlue, blueColor, white} = colors;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleSize(15),
    flex: 1,
    backgroundColor: white,
  },
  backIcon: {
    height: scaleSize(23),
    width: scaleSize(23),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(9),
  },
  nameView: {
    flex: 1,
    position: 'relative',
  },
  userName1: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    marginLeft: scaleFont(16),
  },
  modalUserName: {
    fontWeight: '500',
    fontSize: scaleFont(18),
    marginLeft: scaleFont(80),
  },
  modalPhone: {
    fontWeight: '500',
    fontSize: scaleFont(18),
    marginLeft: scaleFont(80),
    marginBottom: 20,
  },
  typing: {
    fontWeight: '500',
    fontSize: scaleFont(12),
    marginLeft: scaleFont(16),
    color: blueColor,
    position: 'absolute',
    top: scaleSize(22),
  },
  sendMessage: {
    height: scaleSize(23),
    width: scaleSize(23),
  },
  userImage1: {
    height: scaleSize(30),
    width: scaleSize(30),
    borderRadius: scaleSize(30),
  },
  userImageAvatar: {
    height: scaleSize(30),
    width: scaleSize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageAvatar1: {
    height: scaleSize(90),
    width: scaleSize(90),
    borderRadius: scaleSize(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLabelStyle: {
    fontSize: scaleSize(30),
  },
  sendIconView: {
    justifyContent: 'center',
    paddingHorizontal: scaleSize(10),
    paddingRight: scaleFont(14),
  },
  messageTextInput: {
    height: scaleSize(50),
    paddingLeft: scaleFont(20),
    flex: 1,
    color: black,
  },
  listStyle: {
    flex: 1,
    marginTop: scaleSize(20),
  },
  message: {
    marginTop: scaleSize(20),
    marginBottom: scaleSize(10),
  },
  inputView: {
    flexDirection: 'row',
    borderRadius: scaleSize(30),
    backgroundColor: lightBlue,
    color: black,
  },
  messageTime: {
    color: 'grey',
    alignSelf: 'flex-end',
    marginTop: scaleSize(10),
  },
  keyboardContainer: {
    flex: 1,
    marginBottom: scaleSize(20),
  },
  messageBoxView: {
    backgroundColor: blueColor,
    padding: scaleSize(22),
    borderRadius: scaleSize(60),
    borderBottomRightRadius: scaleSize(0),
    borderTopRightRadius: scaleSize(30),
    marginLeft: scaleSize(60),
  },
  messageTimeRight: {
    alignSelf: 'flex-start',
  },
  messageBoxRightView: {
    marginLeft: scaleSize(0),
    marginRight: scaleSize(60),
    backgroundColor: lightBlue,
    borderBottomRightRadius: scaleSize(60),
    borderTopRightRadius: scaleSize(60),
    borderTopLeftRadius: scaleSize(30),
    borderBottomLeftRadius: 0,
  },
  messageRightText: {
    color: 'black',
  },
  giphyIconView: {
    justifyContent: 'center',
    paddingHorizontal: scaleSize(12),
    paddingRight: scaleFont(18),
  },
  MessageText: {
    fontSize: scaleFont(15),
    color: white,
  },
  imageRight: {
    width: 200,
    height: 200,
    marginLeft: 10,
  },
  imageLeft: {
    width: 200,
    height: 200,
    marginLeft: 110,
  },
  paddingText: {
    height: scaleSize(50),
  },
  scrollView: {
    backgroundColor: 'red',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mediaContainer: {
    // flex: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  userImage: {
    height: scaleSize(90),
    width: scaleSize(90),
    borderRadius: scaleSize(90),
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
  // container: {
  //   flex: 1,
  // },
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
  // listStyle: {
  //   marginTop: scaleSize(40),
  // },
  listText: {
    fontSize: scaleFont(16),
  },
  internalView: {
    backgroundColor: white,
    opacity: 1,
    height: scaleSize(325),
    width: '100%',
    // paddingHorizontal: scaleSize(12),
    borderRadius: 20,
    padding: scaleSize(45),
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
    height: scaleSize(35),
    width: scaleSize(35),
    // marginBottom: 10,
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
