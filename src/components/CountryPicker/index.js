import React, {memo, useState, useCallback, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import {uniqueId} from 'lodash';
import {strings} from 'locales/i18n';
import {colors} from 'theme';
import {Flags} from 'utils';
import Countries from '../../constants/countries';
import styles from './style';

const CountryPicker = ({children, onCountrySelect = () => {}, inputStyle}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchCountryText, setSearchCountryText] = useState('');
  const [countryList, setCountryList] = useState([]);
  const onMount = useCallback(() => {
    setCountryList(
      Countries.map((item, index) => {
        return {
          ...item,
          id: uniqueId(),
        };
      }),
    );
  }, []);
  useEffect(() => {
    onMount();
  }, [onMount]);
  const onSearchChange = useCallback(text => {
    setSearchCountryText(text);
    if (text.length === 0) {
      return setCountryList(Countries);
    }
    const newCountryList = Countries.filter(({name}) =>
      name.toLowerCase().includes(text.toLowerCase().trim()),
    );
    setCountryList(newCountryList);
  }, []);
  const FlatListItem = useCallback(
    ({id, name, dialCode, iso2}) => {
      const flagIcon = Flags.get(iso2);
      return (
        <TouchableOpacity
          key={id}
          style={styles.countrylistItem}
          onPress={() => {
            setIsOpen(false);
            onCountrySelect(dialCode, flagIcon, iso2);
          }}>
          <Image source={flagIcon} style={styles.flagIcons} />
          <Text style={styles.countryCodeText}>+{dialCode}</Text>
          <Text style={styles.countryName}>{name}</Text>
        </TouchableOpacity>
      );
    },
    [onCountrySelect],
  );
  return (
    <View>
      {isOpen && (
        <Modal
          animationType="slide"
          visible={isOpen}
          onRequestClose={() => {
            setIsOpen(!isOpen);
          }}>
          <SafeAreaView style={styles.centeredView}>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.crossView}>
              <Image
                style={styles.crossIcon}
                source={require('../../../assets/images/Cross-xxhdpi.png')}
              />
            </TouchableOpacity>
            <View style={styles.searchView}>
              <Image
                style={styles.searchIcon}
                source={require('../../../assets/images/Search.png')}
              />
              <TextInput
                placeholderTextColor={colors.black}
                style={styles.searchInput}
                value={searchCountryText}
                onChangeText={onSearchChange}
                placeholder={strings('login.searchCountry')}
              />
            </View>
            <FlatList
              data={countryList}
              renderItem={({item}) => FlatListItem(item)}
            />
          </SafeAreaView>
        </Modal>
      )}
      <Pressable
        style={[inputStyle ? inputStyle : styles.modalText]}
        onPress={() => setIsOpen(true)}>
        {inputStyle ? (
          children
        ) : (
          <Text style={{color: colors.black}}>{children}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default memo(CountryPicker);
