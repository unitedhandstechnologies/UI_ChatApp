import {StyleSheet} from 'react-native';
import {colors, scaleSize, scaleFont} from 'theme';
const {lightText, grey, black, white, selectedPrimaryColor} = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  chatText: {
    fontSize: scaleFont(30),
    fontWeight: 'bold',
    marginTop: scaleSize(30),
    marginHorizontal: scaleSize(20),
    backgroundColor: white,
  },
  mapIcon: {
    fontSize: scaleFont(10),
    fontWeight: 'bold',
    marginTop: scaleSize(40),
    marginHorizontal: scaleSize(20),
    backgroundColor: white,
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
    height: scaleSize(65),
    width: scaleSize(65),
    borderRadius: scaleSize(65 / 2),
    backgroundColor: lightText,
  },
  userImageAvatar: {
    height: scaleSize(65),
    width: scaleSize(65),
    borderRadius: scaleSize(65 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textsView: {
    marginLeft: scaleSize(13),
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(15),
    marginHorizontal: scaleSize(20),
  },
  userMessage: {
    fontSize: scaleFont(14),
    marginTop: scaleFont(1),
    color: lightText,
    paddingRight: scaleSize(22),
    marginLeft: 4,
  },
  listUpperView: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: scaleSize(15),
    borderColor: lightText,
  },
  nameView: {
    flexDirection: 'row',
  },
  timeText: {
    color: lightText,
  },
  unreadMessage: {
    color: selectedPrimaryColor,
    fontWeight: '700',
  },
  unReadCount: {
    height: scaleSize(16),
    width: scaleSize(16),
    borderRadius: scaleSize(12),
    backgroundColor: selectedPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
  },
  unreadMessageText: {
    color: white,
    fontSize: scaleFont(10),
  },
  timeView: {
    alignItems: 'center',
    position: 'relative',
  },
  noChatText: {
    color: black,
    fontSize: scaleFont(15),
  },
  noChat: {
    flex: 1,
    alignItems: 'center',
  },
  deleteView: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 100,
    display: 'flex',
    padding: scaleSize(10),
  },
  deleteButton: {
    height: scaleFont(100),
  },
  swipeEnable: {
    backgroundColor: lightText,
    borderRightWidth: scaleSize(1),
  },
  notRegister: {
    fontSize: scaleFont(10),
    color: black,
    marginRight: scaleSize(8),
  },
  nameTextView: {
    flexDirection: 'row',
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileEnlarge: {
    backgroundColor: white,
    opacity: 1,
    height: scaleSize(380),
    width: '100%',
    // paddingHorizontal: scaleSize(12),
    borderRadius: 20,
    padding: scaleSize(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userPicture: {
    height: scaleSize(320),
    width: scaleSize(310),
    borderRadius: scaleSize(10),
  },
  UserImageView: {
    alignItems: 'center',
    marginTop: scaleSize(2),
  },
});

export default styles;
