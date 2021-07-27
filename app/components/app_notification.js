import React from 'react';
import {
	View,
	TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import { AppIcon } from './app_icon';
import { AppText } from './app_text';
import styles from '../screens/styles/notification_styles';
import colors from '../screens/styles/colors';
import constants from '../config/app_constants';
import { brokerRegistry } from '../brokers';

const broker = brokerRegistry.broker.getBroker(constants.NOTIFICATION_BROKER);

class AppNotification extends React.Component {
	state = {
		closeBtnSize: 20,
		iconSize: 30,
		visible: false,
		notificationContent: {
			content: null,
			type: ''
		}
	}
	subscribers = new Map();

	componentDidMount() {
		this.createDataSubscribers();
	}

	createDataSubscribers() {
		// const key = constants.NOTIFICATION_BROKER + '.' + constants.NOTIFICATION_VISIBLE_OBSERVABLE;
		// if (!this.subscribers.has(key)) {
		// 	this.subscribers.set(key, broker[constants.NOTIFICATION_VISIBLE_OBSERVABLE].subscribe(isVisible => {
		// 		this.setState({visible: isVisible});
		// 	}));
		// }

		const dKey = constants.NOTIFICATION_BROKER + '.' + constants.NOTIFICATION_CONTENT_OBSERVABLE;
		if (!this.subscribers.has(dKey)) {
			this.subscribers.set(dKey, broker[constants.NOTIFICATION_CONTENT_OBSERVABLE].subscribe(content => {
				if (content)
					this.setState({ notificationContent: content });
			}));
		}
	}

	componentWillUnmout() {
		this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
	}
	
	render() {
		const {
			onPress
		} = this.props;
		
		let style;
		switch (this.state.notificationContent?.type) {
			case constants.NOTIFICATION.SUCCESS:
				style = 'successNotification';
				break;
			case constants.NOTIFICATION.WARNING:
				style = 'warningNotification';
				break;
			case constants.NOTIFICATION.ERROR:
				style = 'errorNotification';
				break;
			case constants.NOTIFICATION.INFO:
				style = 'infoNotification';
		}

		console.log('render notification: ', this.state.notificationContent?.content);

		return (
			<>{ this.state.notificationContent?.content ?
				<View style={[styles.notificationContainer, styles[style]]}>
					<View style={styles.content}>
						{this.state.notificationContent?.content}
					</View>
					<TouchableWithoutFeedback onPress={onPress}>
						<View style={styles.closeBtn}>
							<AppIcon color={colors.black} name="close" size={this.state.closeBtnSize} />
						</View>
					</TouchableWithoutFeedback>
				</View>
			: null}
			</>
		)
	}
}

AppNotification.propTypes = {
	onPress: PropTypes.func
}

export { AppNotification }