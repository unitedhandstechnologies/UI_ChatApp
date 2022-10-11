import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import 'react-native-image-keyboard';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
