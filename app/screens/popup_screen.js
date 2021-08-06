import React from 'react';
import {
	Pressable,
	View
} from 'react-native';

import {
	AppScreen,
	AppText
} from '../components';
import constants from '../config/app_constants';
import { effectsRegistry } from '../effects';
import styles from './styles/popup_screen_styles';
import { goBack } from '../navigators/root';

const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);

class PopupScreen extends React.Component {
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.route?.params != prevProps.route?.params)
			this.getTranslateText();
	}

	getTranslateText() {
		const { t } = appHookEffects.getEffectsByName(['t']);
		const key = this.props.route.params?.translationKey;
		if (t && key)
			return  t(key);
	}

	renderAwaitingConfirmation() {
		return (<View>
			<AppText>Awaiting Confirmation</AppText>
		</View>)
	}

	render() {
		const { type } = this.props.route?.params;
		const styleType = type ? type : constants.NOTIFICATION.INFO;

		return (<>
			<AppScreen customBackground={styles.appScreenCustomBG} style={styles.appScreenCustomBG}>
				{type === constants.AWAITING_CONFIRMATION && this.renderAwaitingConfirmation()}
				{type !== constants.AWAITING_CONFIRMATION &&
					<Pressable style={styles.container} onPress={goBack}>
						<View style={[styles.alertInner, styles[styleType]]}>
							<AppText style={styles[`${styleType}Text`]}>
								{this.getTranslateText()}
							</AppText>							
						</View>
					</Pressable>
				}
			</AppScreen>
			</>
		)
	}
}

export { PopupScreen }