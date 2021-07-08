import React from 'react';
import {
	View,
	TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import { AppIcon } from './app_icon';
import styles from '../screens/styles/button_styles';
import colors from '../screens/styles/colors';

class AppListItemDelete extends React.Component {
	render() {
		const {
			onPress
		} = this.props;

		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={styles.listItemDelete}>
					<AppIcon
						name="trash-can"
						size={25}
						color={colors.black}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

AppListItemDelete.propTypes = {
    onPress: PropTypes.func
}

export { AppListItemDelete }
