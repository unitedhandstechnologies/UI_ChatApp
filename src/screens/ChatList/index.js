import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  Text,
} from 'react-native';
import io from 'socket.io-client';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Typography, Loader, InitialNameAvatar} from 'components';
import {strings} from 'locales/i18n';
import {colors} from 'theme';
import {push, screenNames} from 'navigation';
import {timeSince, getUserInfo} from 'utils';
import Style from './style';
import {getMessages, removeThread} from './apis';
import Config from 'react-native-config';
const row = [];
let prevOpenedRow;
const ChatList = ({navigation}) => {
  const socketRef = useRef();
  const chatListRef = useRef([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastChat, setLastChat] = useState([]);
  const getAllMessage = useCallback((isShowLoading = true) => {
    setLoading(isShowLoading);
    getMessages()
      .then(({data}) => {
        setLastChat(data);
        chatListRef.current = data;
      })
      .catch(error => {
        Alert.alert(
          strings('alert.warning'),
          error?.message ?? strings('alert.somethingWentWrong'),
        );
      })
      .finally(() => {
        setLoading(false);
        setIsRefreshing(false);
      });
  }, []);
  useEffect(() => {
    const activeScreenListener = navigation.addListener('focus', () => {
      setTextMessage('');
      getAllMessage(true);
    });
    return () => {
      activeScreenListener();
    };
  }, [getAllMessage, navigation]);
  useEffect(() => {
    socketRef.current = io(Config.SOCKET_IP);
    const activeScreenListener = navigation.addListener('focus', async () => {
      const info = await getUserInfo();
      if (socketRef.current) {
        socketRef.current.emit('ConncetedChat', info.id);
      }
    });
    if (socketRef.current) {
      socketRef.current.on('newMessage', () => {
        getAllMessage(false);
      });
    }
    return () => {
      socketRef.current.disconnect();
      activeScreenListener();
    };
  }, [getAllMessage, navigation]);
  const onChatItemClick = threadInfo => {
    push(screenNames.ChatScreen, {threadInfo});
  };
  const onSearchChange = useCallback(text => {
    setTextMessage(text);
    if (!text.length) {
      setLastChat(chatListRef.current);
      return;
    }
    const newChatList = chatListRef.current.filter(({friendInfo}) =>
      `${friendInfo?.name}`.toLowerCase().includes(text.toLowerCase().trim()),
    );
    setLastChat(newChatList);
  }, []);
  const deleteThread = (item, index) => {
    return Alert.alert(
      strings('settings.appName'),
      strings('chatScreen.sureDelete'),
      [
        {
          text: strings('settings.alertNo'),
          style: 'cancel',
        },
        {
          text: strings('settings.alertYes'),
          onPress: () => {
            setLoading(true);
            removeThread(item.threadId)
              .then(() => {
                const copyChat = JSON.parse(JSON.stringify(lastChat));
                copyChat.splice(index, 1);
                chatListRef.current = copyChat;
                setLastChat(copyChat);
              })
              .catch(error => {
                Alert.alert(
                  strings('alert.warning'),
                  error?.message ?? strings('alert.somethingWentWrong'),
                );
              })
              .finally(() => {
                setLoading(false);
              });
          },
        },
      ],
    );
  };
  const onRefresh = useCallback(async () => {
    if (isRefreshing) {
      return;
    }
    getAllMessage(false);
  }, [getAllMessage, isRefreshing]);
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  const renderRightActions = (item, index) => {
    return (
      <View style={Style.deleteView}>
        <Button
          onPress={() => deleteThread(item, index)}
          style={Style.deleteButton}
          color="red"
          title={strings('chatScreen.delete')}
        />
      </View>
    );
  };
  const ListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onChatItemClick(item)}
        activeOpacity={1}
        style={Style.listUpperView}>
        <Swipeable
          renderRightActions={() => renderRightActions(item, index)}
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}
          rightOpenValue={-100}>
          <View style={Style.listItem}>
            {item?.friendInfo?.profile ? (
              <Image
                source={{uri: item?.friendInfo?.profile}}
                style={Style.userImage}
              />
            ) : (
              <InitialNameAvatar
                containerStyle={Style.userImageAvatar}
                text={item?.friendInfo?.name || 'Ab'}
              />
            )}

            <View style={Style.textsView}>
              <View style={Style.nameView}>
                <View style={Style.nameTextView}>
                  <Typography
                    style={Style.userName}
                    text={item?.friendInfo?.name}
                    numberOfLines={1}
                  />
                  {item?.friendInfo?.isInvite === 1 && (
                    <Typography
                      style={Style.notRegister}
                      text={strings('chatScreen.notRegister')}
                    />
                  )}
                </View>

                <View style={Style.timeView}>
                  <Typography
                    style={[
                      Style.timeText,
                      item?.unReadMessage && Style.unreadMessage,
                    ]}
                    text={timeSince(item?.created * 1000, true)}
                  />
                  {item?.unReadMessage !== 0 && (
                    <View style={Style.unReadCount}>
                      <Typography
                        style={Style.unreadMessageText}
                        text={item?.unReadMessage}
                      />
                    </View>
                  )}
                </View>
              </View>
              <Typography
                numberOfLines={1}
                style={[
                  Style.userMessage,
                  item?.unReadMessage && Style.unreadMessage,
                ]}
                text={`${item?.unReadMessage ? '\u2B24' : ''} ${item?.message}`}
              />
            </View>
          </View>
        </Swipeable>
      </TouchableOpacity>
    );
  };
  return (
    <View style={Style.container}>
      <View style={Style.headerContainer}>
        <Typography style={Style.chatText} text={strings('chatScreen.chats')} />
        {/* <TouchableOpacity
          onPress={() => push(screenNames.Map)}
          activeOpacity={1}>
          <Typography style={Style.mapIcon} text={'Open Map'} />
        </TouchableOpacity> */}
      </View>
      <View style={Style.searchView}>
        <Image
          style={Style.searchIcon}
          source={require('../../../assets/images/Search.png')}
        />
        <TextInput
          placeholderTextColor={colors.placeholderColor}
          style={Style.searchInput}
          placeholder={strings('chatScreen.search')}
          onChangeText={onSearchChange}
          value={textMessage}
        />
      </View>
      <FlatList
        renderItem={({item, index}) => {
          return <ListItem item={item} index={index} />;
        }}
        data={lastChat}
        removeClippedSubviews
        initialNumToRender={100}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={100}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      {!lastChat?.length && !loading && (
        <View style={Style.noChat}>
          <Typography
            style={Style.noChatText}
            text={strings('chatScreen.noChat')}
          />
        </View>
      )}
      {loading && <Loader loading={loading} />}
    </View>
  );
};

export default ChatList;
