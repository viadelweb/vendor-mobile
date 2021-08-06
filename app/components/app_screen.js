import React from 'react';
import {
	ImageBackground,
	SafeAreaView,
	View
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../screens/styles/colors';
import constants from '../config/app_constants';
import { brokerRegistry } from '../brokers';
// import { AppNotification } from './app_notification';

const notificationBroker = brokerRegistry.broker.getBroker(constants.NOTIFICATION_BROKER);

const styles = {
	container: {
		flex: 1,
	},
	view: {
		flex: 1,
	}
};

class AppScreen extends React.Component {
	renderHero() {
		const {
			heroBlurRadius,
			heroStyles,
			heroUri
		} = this.props;

		if (!heroUri)
			return null;

		return (
			<View style={styles.container}>
				<ImageBackground 
					blurRadius={heroBlurRadius}
					style={heroStyles}
					source={{
						uri: heroUri
					}}>
					{this.renderView()}
				</ImageBackground>
			</View>
		)
	}

	renderView() {
		const {
			heroVisible,
			children,
			style,
			customBackground
		} = this.props;
		const userStyles = {
			screen: {
				...style
			}
		};
		let bgColor = !heroVisible ? {backgroundColor: colors.white} :  {};
		bgColor = !customBackground ? bgColor : customBackground;

		return (
			<SafeAreaView style={[styles.container, bgColor]}>
				<View style={[styles.view, userStyles.screen]}>
					{children}
				</View>
				{/* <AppNotification onPress={() => notificationBroker.close()} /> */}
			</SafeAreaView>
		)
	}

	render() {
		const {
			heroVisible,
		} = this.props;

		return (
			<>{heroVisible ? this.renderHero() : this.renderView()}</>
		)
	}
}

AppScreen.defaultProps = {
	heroVisible: false
}

AppScreen.propTypes = {
	customBackground: PropTypes.any,
	style: PropTypes.any,
	heroVisible: PropTypes.bool,
	heroStyles: PropTypes.any,
	heroUri: PropTypes.string,
	heroBlurRadius: PropTypes.number
};

export { AppScreen }