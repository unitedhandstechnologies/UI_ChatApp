import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  BackHandler,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Platform,
  Alert,
  SafeAreaView,
  ToastAndroid,
  Linking,
  Modal,
  Text,
} from 'react-native';
import PushNotificationFCM from 'react-native-push-notification';
import io from 'socket.io-client';
import {useRoute} from '@react-navigation/native';
import PushNotification from 'utils/pushHelper';
import {TextInput} from 'react-native-gesture-handler';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {Typography, InitialNameAvatar, Loader} from 'components';
import {strings} from 'locales/i18n';
import {colors} from 'theme';
import {getUserInfo, timeSince, createLocalNotification} from 'utils';
import {getMessages, sendMessage, readAllMessage} from './apis';
import Style from './style';
import Clipboard from '@react-native-clipboard/clipboard';
import Config from 'react-native-config';
// import {TypingAnimation} from 'react-native-typing-animation';

import {
  GiphyContentType,
  GiphyDialog,
  GiphySDK,
  GiphyContent,
  GiphyGridView,
} from '@giphy/react-native-sdk';
// Configure API keys
GiphySDK.configure({apiKey: 'P62zDVOOjYRf3L4bxzl8HHZQKGLngkyg'});

GiphyDialog.configure({
  mediaTypeConfig: [GiphyContentType.Clips],
  showConfirmationScreen: true,
});

const ChatScreen = ({navigation}) => {
  const socketRef = useRef();
  const interval = useRef(null);
  const {params} = useRoute();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isTyping, setIsTyping] = useState(true);
  const [selectedMediaUri, setSelectedMediaUri] = useState(null);
  const [mediaGif, setMediaGif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const _onImageChange = useCallback(
    ({nativeEvent}) => {
      const {uri, linkUri} = nativeEvent;
      setSelectedMediaUri(linkUri ?? uri);
    },
    [setSelectedMediaUri],
  );

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  const getAllMessages = useCallback(
    async (isShowLoading = true) => {
      setLoading(isShowLoading);
      const {senderId, receiverId} = params?.threadInfo;
      const info = await getUserInfo();
      getMessages(senderId === info?.id ? receiverId : senderId)
        .then(({data}) => {
          if (data.length && !params?.threadInfo?.threadId) {
            params.threadInfo.threadId = data[0].threadId;
          }
          setChatList(data);
        })
        .catch(error => {
          if (error?.status !== 404) {
            Alert.alert(
              strings('alert.warning'),
              error?.message ?? strings('alert.somethingWentWrong'),
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [params],
  );
  useEffect(() => {
    const pushListener = new PushNotification();
    pushListener.setUpMessageListener(data => {
      const notificationInfo = JSON.parse(data?.data?.body);
      if (notificationInfo?.threadId !== params?.threadInfo?.threadId) {
        createLocalNotification(
          String(notificationInfo.threadId),
          notificationInfo.friendInfo.name,
          notificationInfo.message,
          1 / 60,
          'CHAT_PUSH',
          data?.data?.body,
        );
      }
    });
    socketRef.current = io(Config.SOCKET_IP);
    const clearNotification = async () => {
      try {
        PushNotificationFCM.removeAllDeliveredNotifications();
      } catch (err) {
        console.warn(err);
      }
    };
    const activeScreenListener = navigation.addListener('focus', async () => {
      socketRef.current.emit('ConnectedThread', params?.threadInfo?.threadId);
      clearNotification();
    });
    if (socketRef.current) {
      socketRef.current.on('typing', value => {
        setIsTyping(value);
      });
      socketRef.current.on('newMessage', chat => {
        if (
          chat?.threadId === params?.threadInfo?.threadId &&
          // eslint-disable-next-line radix
          parseInt(chat?.senderId) !== parseInt(userInfo?.id)
        ) {
          readAllMessage(chat?.id).catch({});
          setChatList(chatInfo => {
            const chatCopy = JSON.parse(JSON.stringify(chatInfo));
            chatCopy.unshift(chat);
            return chatCopy;
          });
        }
      });
    }

    return () => {
      socketRef.current.disconnect();
      activeScreenListener();
      pushListener.unsubscribeListener();
    };
  }, [navigation, params?.threadInfo?.threadId, userInfo]);
  useEffect(() => {
    const getInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    const activeScreenListener = navigation.addListener('focus', () => {
      getInfo();
      getAllMessages(false);
    });
    return () => {
      activeScreenListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onTextChange = useCallback(
    async value => {
      // eslint-disable-next-line no-console
      console.log(value, '---------------value-----------------');
      setMessage(value);
      if (socketRef.current) {
        if (interval.current !== null) {
          clearInterval(interval.current);
        }
        const {senderId, receiverId} = params?.threadInfo;
        const boardCastUser = senderId === userInfo?.id ? receiverId : senderId;
        socketRef.current.emit('typing', {
          typing: true,
          friendId: boardCastUser,
        });
        interval.current = setTimeout(() => {
          socketRef.current.emit('typing', {
            typing: false,
            friendId: boardCastUser,
          });
        }, 1000);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userInfo],
  );
  const copyMessage = useCallback(itemMessage => {
    Clipboard.setString(itemMessage);
    if (Platform.OS === 'ios') {
      return;
    }
    ToastAndroid.showWithGravityAndOffset(
      strings('chatScreen.messageCopyed'),
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }, []);
  const sendMessageToUser = () => {
    setMediaGif(false);
    if (!message) {
      return;
    }
    const chatCopy = JSON.parse(JSON.stringify(chatList));
    let newMessage = message;
    chatCopy.unshift({
      message: newMessage,
      created: Math.round(new Date() / 1000),
      modified: Math.round(new Date() / 1000),
      threadId: params?.threadInfo?.threadId ?? 0,
      senderId: userInfo?.id,
      messageType: 0,
    });
    setChatList(chatCopy);
    setMessage('');
    const {senderId, receiverId} = params?.threadInfo;
    sendMessage({
      message: newMessage,
      messageType: 0,
      friendId: senderId === userInfo?.id ? receiverId : senderId,
    })
      .then(({data}) => {
        if (data && !params?.threadInfo?.threadId) {
          params.threadInfo.threadId = data.threadId;
        }
        setTimeout(() => {
          setChatList(chatInfo => {
            const chatCopy1 = JSON.parse(JSON.stringify(chatInfo));
            chatCopy1[0].id = data.id;
            chatCopy1[0].created = data.created;
            return chatCopy1;
          });
        }, 100);
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
  };
  // const sendImage = useCallback(e => {
  //   setMedia(e.nativeEvent.media.url);
  //   if (socketRef.current) {
  //     if (interval.current !== null) {
  //       clearInterval(interval.current);
  //     }
  //     const {senderId, receiverId} = params?.threadInfo;
  //     const bordCastUser = senderId === userInfo?.id ? receiverId : senderId;
  //     socketRef.current.emit('typing', {
  //       typing: true,
  //       friendId: bordCastUser,
  //     });
  //     interval.current = setTimeout(() => {
  //       socketRef.current.emit('typing', {
  //         typing: false,
  //         friendId: bordCastUser,
  //       });
  //     }, 1000);
  //   }
  // }, []);
  const sendImageToUser = e => {
    setMediaGif(false);
    setSearchQuery('');
    // setMedia(e.nativeEvent.media.url);
    // let message1 = e.nativeEvent.media.url;
    const chatCopy = JSON.parse(JSON.stringify(chatList));

    let newMessage = e.nativeEvent.media.url;
    chatCopy.unshift({
      message: newMessage,
      created: Math.round(new Date() / 1000),
      modified: Math.round(new Date() / 1000),
      threadId: params?.threadInfo?.threadId ?? 0,
      senderId: userInfo?.id,
      messageType: 1,
    });
    setChatList(chatCopy);
    setMessage('');
    const {senderId, receiverId} = params?.threadInfo;
    sendMessage({
      message: newMessage,
      messageType: 1,
      friendId: senderId === userInfo?.id ? receiverId : senderId,
    })
      .then(({data}) => {
        if (data && !params?.threadInfo?.threadId) {
          params.threadInfo.threadId = data.threadId;
        }
        setTimeout(() => {
          setChatList(chatInfo => {
            const chatCopy1 = JSON.parse(JSON.stringify(chatInfo));
            chatCopy1[0].id = data.id;
            chatCopy1[0].created = data.created;
            return chatCopy1;
          });
        }, 100);
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
  };
  const handleBack = () => {
    return navigation.goBack();
  };
  const openUrl = useCallback(async messageItem => {
    const urlRE = new RegExp(
      '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+',
    );
    const isLink = messageItem.match(urlRE);
    if (isLink && isLink?.length) {
      try {
        const url = isLink[0];
        await Linking.openURL(url);
      } catch (err) {}
    }
  }, []);
  const MessageItem = useCallback(
    ({item, index}) => {
      const sender = item?.senderId === userInfo.id;
      return (
        <View style={Style.message} key={item?.id}>
          {item?.messageType === 0 && (
            <TouchableOpacity
              onPress={() => openUrl(item?.message)}
              onLongPress={() => copyMessage(item?.message)}
              style={[
                Style.messageBoxView,
                !sender && Style.messageBoxRightView,
              ]}>
              <Typography
                style={[Style.MessageText, !sender && Style.messageRightText]}
                text={item?.message ?? item?.text}
              />
            </TouchableOpacity>
          )}
          {item?.messageType === 1 && (
            <View style={Style.message}>
              <Image
                source={{
                  uri: item?.message,
                }}
                style={[Style.imageLeft, !sender && Style.imageRight]}
              />
            </View>
          )}

          <Typography
            style={[Style.messageTime, !sender && Style.messageTimeRight]}
            text={timeSince(item?.created * 1000, true)}
          />
        </View>
      );
    },
    [copyMessage, openUrl, userInfo.id],
  );
  const closeModel = useCallback(() => {
    setModalVisible(val => !val);
  }, []);
  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.headerView}>
        <TouchableOpacity
          style={Style.leftIcon}
          activeOpacity={1}
          onPress={handleBack}>
          <Image
            resizeMode="contain"
            style={Style.backIcon}
            source={require('../../../assets/images/backIcon.png')}
          />
        </TouchableOpacity>
        <View style={Style.nameView}>
          <Typography
            style={Style.userName1}
            text={params?.threadInfo?.friendInfo?.name}
          />
          {isTyping && (
            <Typography
              style={Style.typing}
              text={strings('chatScreen.typing')}
            />
            // <TypingAnimation
            //   dotColor="black"
            //   dotMargin={3}
            //   dotAmplitude={3}
            //   dotSpeed={0.15}
            //   dotRadius={2.5}
            //   dotX={12}
            //   dotY={6}
            // />
          )}
        </View>

        {params?.threadInfo?.friendInfo?.profile ? (
          <TouchableOpacity onPress={closeModel}>
            <Image
              source={{uri: params?.threadInfo?.friendInfo?.profile}}
              style={Style.userImage1}
            />
          </TouchableOpacity>
        ) : (
          <InitialNameAvatar
            onPress={closeModel}
            containerStyle={Style.userImageAvatar}
            text={params?.threadInfo?.friendInfo?.name || 'Ab'}
          />
        )}
      </View>
      {loading && <Loader loading={loading} />}
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={Style.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={chatList}
          style={Style.listStyle}
          inverted
          renderItem={({item, index}) => (
            <MessageItem key={item?.id} index={index} item={item} />
          )}
        />
        <View style={Style.mediaContainer}>
          {selectedMediaUri && (
            <Image source={{uri: selectedMediaUri}} style={Style.image} />
          )}
        </View>

        <View style={Style.inputView}>
          <TouchableOpacity
            onPress={() => setMediaGif(true)}
            style={Style.giphyIconView}>
            <Image
              resizeMode="contain"
              style={Style.sendMessage}
              source={require('../../../assets/images/Giphy.png')}
            />
          </TouchableOpacity>

          <TextInput
            placeholderTextColor={colors.placeholderColor}
            style={[
              Style.messageTextInput,
              message?.length && Style.paddingText,
            ]}
            placeholder={strings('chatScreen.message')}
            value={message}
            multiline
            onChangeText={onTextChange}
            onImageChange={_onImageChange}
          />

          <TouchableOpacity
            onPress={sendMessageToUser}
            style={Style.sendIconView}>
            <Image
              resizeMode="contain"
              style={Style.sendMessage}
              source={require('../../../assets/images/SendMessage.png')}
            />
          </TouchableOpacity>
        </View>
        {mediaGif && (
          <View>
            <TextInput
              autoFocus
              onChangeText={value => setSearchQuery(value)}
              placeholder="Search Giphy GIF"
              value={searchQuery}
            />
            <GiphyGridView
              content={GiphyContent.search({searchQuery: searchQuery})}
              cellPadding={3}
              style={{height: 300, marginTop: 24}}
              onMediaSelect={e => sendImageToUser(e)}
            />
          </View>
        )}
      </KeyboardAvoidingView>
      <Modal
        // animationType="slide"
        // transparent
        visible={modalVisible}
        style={Style.background}
        onRequestClose={closeModel}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModel}
          style={Style.centeredView}>
          <View style={Style.addMargin}>
            <View style={Style.internalView}>
              <TouchableOpacity onPress={closeModel} style={Style.iconView}>
                <Image
                  style={Style.crossIcon}
                  source={require('../../../assets/images/Cross-xxhdpi.png')}
                />
              </TouchableOpacity>
              <View style={Style.UserImageView}>
                {params?.threadInfo?.friendInfo?.profile ? (
                  <Image
                    source={{uri: params?.threadInfo?.friendInfo?.profile}}
                    style={Style.userImage}
                  />
                ) : (
                  <InitialNameAvatar
                    containerStyle={[
                      Style.userImageAvatar1,
                      Style.avatarLabelStyle,
                    ]}
                    text={params?.threadInfo?.friendInfo?.name || 'Ab'}
                  />
                )}
              </View>
              <Typography
                style={Style.modalUserName}
                text={params?.threadInfo?.friendInfo?.name}
              />
              <Typography
                style={Style.modalPhone}
                text={params?.threadInfo?.friendInfo?.phone}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatScreen;
