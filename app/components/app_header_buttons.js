import React from 'react';
import {
	TouchableWithoutFeedback,
	View
} from 'react-native';
import PropTypes from 'prop-types';

import { AppIcon } from './app_icon';
import { AppText } from './app_text';
import colors from '../screens/styles/colors';

const contentContainerStyle = {
	display: 'flex',
	flexDirection: 'row'
}
const sharedTextStyle = {
	textShadowColor: colors.black,
	textShadowOffset: { width: 0, height: 1 },
	textShadowRadius: 4
}

class AppHeaderButtons extends React.Component {
	renderLeftIcon() {
		const {
			iconProps: { left }
		} = this.props;
		if (!left)
			return null;
		const { onPress } = left;
		const textStyle = {
			fontSize: left.size * 0.65,
			lineHeight: left.size,
			color: left.color,
			...sharedTextStyle
		}

		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={contentContainerStyle}>
					<AppIcon name={left.icon} size={left.size} color={left.color} styles={left.styles}/>
					<AppText style={textStyle}>{left.title}</AppText>
				</View>
			</TouchableWithoutFeedback>
		)
	}
	
	renderRightIcon() {
		const {
			iconProps: { right }
		} = this.props;
		if (!right)
		return null;
		const { onPress } = right;
		const textStyle = {
			fontSize: right.size * 0.65,
			lineHeight: right.size,
			color: right.color,
			...sharedTextStyle
		}
		
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={contentContainerStyle}>
					<AppText style={textStyle}>{right.title}</AppText>
					<AppIcon name={right.icon} size={right.size} color={right.color} styles={right.styles}/>
				</View>
			</TouchableWithoutFeedback>
		)
	}

	render() {
		const {
			styles
		} = this.props;

		return (
			<View style={styles}>
				{this.renderLeftIcon()}
				{this.renderRightIcon()}
			</View>
		)
	}
}

AppHeaderButtons.propTypes = {
	styles: PropTypes.object,
	iconProps: PropTypes.shape({
		left: PropTypes.shape({
			icon: PropTypes.string,
			color: PropTypes.string,
			size: PropTypes.number,
			onPress: PropTypes.func,
			styles: PropTypes.object,
			title: PropTypes.string
		}),
		right: PropTypes.shape({
			icon: PropTypes.string,
			color: PropTypes.string,
			size: PropTypes.number,
			onPress: PropTypes.func,
			styles: PropTypes.object,
			title: PropTypes.string
		})
	}),
}

export { AppHeaderButtons }