/**
 * @format
 */


if (__DEV__) require("./ReactotronConfig")


import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Main from '@src/main';

AppRegistry.registerComponent(appName, () => Main);
