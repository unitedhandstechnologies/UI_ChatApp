import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {strings} from 'locales/i18n';
import {navigate, screenNames, push} from 'navigation';
import {colors} from 'theme';
import {useDebounceCallback} from 'hooks';
import {Wrapper, Typography, InitialNameAvatar, Loader} from 'components';
import Style from './style';
import {getSyncContacts} from './apis';

const Contacts = ({navigation}) => {
  const [contactsList, setContactsList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const allSyncContacts = useCallback((text = '', isLoading = true) => {
    setLoading(isLoading);
    getSyncContacts({search: text})
      .then(({data}) => {
        setPagination(data.pagination);
        setContactsList(data.result);
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
    const getContact = async () => {
      allSyncContacts();
    };
    const activeScreenListener = navigation.addListener('focus', () => {
      setSearchText('');
      getContact();
    });
    return () => {
      activeScreenListener();
    };
  }, [allSyncContacts, navigation]);
  const onSearchChange = useDebounceCallback(text => {
    allSyncContacts(text);
  });
  const onRefresh = useCallback(async () => {
    if (isRefreshing) {
      return;
    }

    allSyncContacts();
  }, [allSyncContacts, isRefreshing]);
  const openChatPopup = useCallback(item => {
    return navigate(screenNames.ChatScreen, {threadInfo: item?.threadInfo});
  }, []);
  const ListItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => openChatPopup(item)}
          style={Style.listUpperView}>
          <View style={Style.listItem}>
            {item?.profile ? (
              <Image source={{uri: item?.profile}} style={Style.userImage} />
            ) : (
              <InitialNameAvatar text={item?.name} />
            )}
            <View style={Style.textsView}>
              <View style={Style.nameView}>
                <Typography style={Style.userName} text={item?.name} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [openChatPopup],
  );
  return (
    <Wrapper subContainerStyle={Style.container}>
      <View style={Style.headerContainer}>
        <Typography style={Style.chatText} text={strings('contacts.contact')} />
        <TouchableOpacity
          onPress={() => push(screenNames.Map)}
          activeOpacity={1}>
          <Typography style={Style.mapIcon} text={'Open Map'} />
        </TouchableOpacity>
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
          onChangeText={val => {
            setSearchText(val);
            onSearchChange(val);
          }}
          value={searchText}
        />
      </View>
      {loading && (
        <View style={Style.loading}>
          <Loader loading={loading} />
        </View>
      )}
      <FlatList
        renderItem={({item, index}) => {
          return <ListItem key={index} item={item} />;
        }}
        data={contactsList}
        removeClippedSubviews
        initialNumToRender={50}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={100}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      {!contactsList?.length && !loading && (
        <View style={Style.noContact}>
          <Typography
            style={Style.noContactText}
            text={strings('contacts.noContact')}
          />
        </View>
      )}
    </Wrapper>
  );
};

export default Contacts;
