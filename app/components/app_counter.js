import React from 'react';
import {
	View
} from 'react-native';
import Counter from 'react-native-counters';

import styles from '../screens/styles/common_styles';

class AppCounter extends React.Component {
	render() {
		const {
			...counterOptions
		} = this.props;

		return (
			<View style={styles.counterContainer}>
				<Counter {...counterOptions} />
			</View>
		)
	}
}

export { AppCounter }