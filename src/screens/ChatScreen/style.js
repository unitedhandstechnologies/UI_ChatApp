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
  userName: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    marginLeft: scaleFont(16),
  },
  typing: {
    fontWeight: '30',
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
  userImage: {
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
});

export default styles;
