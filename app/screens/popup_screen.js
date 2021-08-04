import React from 'react';
import {
	View
} from 'react-native';

import {
	AppScreen,
	AppText,
	AppButton
} from '../components';
import { effectsRegistry } from '../effects';
import colors from './styles/colors';

class PopupScreen extends React.Component {
	render() {
		return (
			<AppScreen>
				<AppText>Hello World</AppText>
			</AppScreen>
		)
	}
}

export { PopupScreen }