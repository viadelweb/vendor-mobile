import { registerRootComponent } from 'expo';
import { initialization } from 'react-native-international';

import App from './App';

initialization([
	require('./app/config/i18n/en')
], 'en');

registerRootComponent(App);