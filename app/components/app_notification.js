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
import { notificationBroker } from '../brokers/notification_broker';

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
		const key = constants.NOTIFICATION_BROKER + '.' + constants.NOTIFICATION_VISIBLE_OBSERVABLE;
		if (!this.subscribers.has(key)) {
			this.subscribers.set(key, broker[constants.NOTIFICATION_VISIBLE_OBSERVABLE].subscribe(isVisible => {
				this.setState({visible: isVisible});
			}));
		}

		const dKey = constants.NOTIFICATION_BROKER + '.' + constants.NOTIFICATION_CONTENT_OBSERVABLE;
		if (!this.subscribers.has(dKey)) {
			this.subscribers.set(dKey, broker[constants.NOTIFICATION_CONTENT_OBSERVABLE].subscribe(content => {
				this.setState({
					notificationContent: content
				});
			}));
		}
	}

	componentWillUnmout() {
		notificationBroker.close();
		this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
	}

	mapType() {
		switch (this.state.notificationContent?.type) {
			case constants.NOTIFICATION.SUCCESS:
				return 'successNotification';
			case constants.NOTIFICATION.WARNING:
				return 'warningNotification';
			case constants.NOTIFICATION.ERROR:
				return 'errorNotification';
			case constants.NOTIFICATION.INFO:	
			defualt:
				return 'infoNotification';
		}
	}
	
	render() {
		const {
			onPress
		} = this.props;

		return (
			<>{ this.state.visible ?
				<View style={[styles.notificationContainer, styles[this.mapType()]]}>
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