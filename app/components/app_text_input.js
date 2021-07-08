import React from 'react';
import {
	View,
	TextInput
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../screens/styles/common_styles';

class AppTextInput extends React.Component {
	render() {
		const {
			...textInputOptions
		} = this.props;

		return (
			<View style={styles.textInputContainer}>
				<TextInput style={styles.textInput} {...textInputOptions}></TextInput>
			</View>
		)
	}
}

export { AppTextInput }