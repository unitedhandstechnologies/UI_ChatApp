import React from 'react';
import RNRestart from 'react-native-restart';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'components';
import {strings} from 'locales/i18n';
import styles from './style';

export class ErrorBoundary extends React.Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return {error: true};
  }

  componentDidCatch(error, errorInfo) {
    // Add error report logger code here
  }

  handleBackToSignIn = () => {
    RNRestart.Restart();
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentView}>
          <Text style={styles.titleStyle}>
            {strings('errorScreen.somethingWrong')}
          </Text>
          <Text>{strings('errorScreen.appInProblem')}</Text>
          <Button
            onPress={this.handleBackToSignIn}
            text={strings('errorScreen.back')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default ErrorBoundary;
