import React from 'react';
import {
	ImageBackground,
	SafeAreaView,
	View
} from 'react-native';
import PropTypes from 'prop-types';

const styles = {
	container: {
		flex: 1,
	},
	view: {
		flex: 1,
		// paddingHorizontal: 15
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
			children,
			style
		} = this.props;

		const userStyles = {
			screen: {
				...style
			}
		};

		return (
			<SafeAreaView style={[styles.container]}>
				<View style={[styles.view, userStyles.screen]}>
					{children}
				</View>
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
	style: PropTypes.any,
	heroVisible: PropTypes.bool,
	heroStyles: PropTypes.any,
	heroUri: PropTypes.string,
	heroBlurRadius: PropTypes.number
};

export { AppScreen }