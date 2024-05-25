/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/screens/Context/AuthContext';
AppRegistry.registerComponent(appName, () => App);
