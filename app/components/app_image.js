import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

class AppImage extends React.Component {
	render() {
		const {
			styles,
			uri
		} = this.props;

		return (
			<Image style={styles} source={{
				uri: uri
			}}/>
		)
	}
}

AppImage.propTypes = {
	styles: PropTypes.any,
	uri: PropTypes.string
}

export { AppImage }