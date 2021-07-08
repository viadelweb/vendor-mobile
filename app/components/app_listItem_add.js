import React from 'react';
import {
	View,
	TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import { AppIcon } from './app_icon';
import styles from '../screens/styles/button_styles';
import colors from '../screens/styles/colors';

class AppListItemAdd extends React.Component {
	render() {
		const {
			onPress
		} = this.props;

		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={styles.listItemAdd}>
					<AppIcon
						name="plus"
						size={40}
						color={colors.black}
						styles={styles}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}


AppListItemAdd.propTypes = {
	onPress: PropTypes.func
}

export { AppListItemAdd }