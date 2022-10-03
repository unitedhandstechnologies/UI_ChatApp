import React from 'react';
import {View, Image, SafeAreaView, ScrollView} from 'react-native';
import {strings} from 'locales/i18n';
import {reset, screenNames} from 'navigation';
import {Typography} from 'components';
import Button from 'components/Common/Button';
import styles from './style';

const Welcome = () => {
  const handlePress = () => {
    reset(screenNames.Signup);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../../assets/images/Image1.png')}
        />
        <View style={styles.textView}>
          <Typography style={styles.title} text={strings('welcome.title')} />
          <Typography
            style={styles.subtitle}
            text={strings('welcome.subTitle')}
          />
          <View style={styles.buttonView}>
            <Button
              onPress={handlePress}
              titleStyle={styles.buttonText}
              buttonContainerStyle={styles.button}
              title={strings('welcome.getStart')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
