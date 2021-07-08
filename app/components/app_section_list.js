import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	SectionList,
	ScrollView
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { AppText } from './app_text';
import { brokerRegistry } from '../brokers';
import constants from '../config/app_constants';
import styles from '../screens/styles/details_screen_styles';
import colors from '../screens/styles/colors';

const attrBroker = brokerRegistry.broker.getBroker(constants.ATTRIBUTE_BROKER);

class AppSectionList extends React.Component {
	state = {
		data: {},
	};
	subscribers = new Map();

	componentDidMount() {
		this.createDataSubscribers();
	}

	createDataSubscribers() {
		const key = constants.ATTRIBUTE_BROKER + '.' + constants.ATTRIBUTES_LIST_OBSERVABLE;
		this.subscribers.set(key, attrBroker[constants.ATTRIBUTES_LIST_OBSERVABLE].subscribe(list => {
			this.setState({data: list});			
		}));
	}

	componentWillUnmount() {
		this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
    }

	renderSwitch(item) {
		const {
			onChange
		} = this.props;

		return (
			<View>
				<ToggleSwitch 
					isOn={item.active}
					onColor={colors.primary}
					offColor={colors.alertDangerBackgroundColor}
					label={null}
					size={'small'}
					onToggle={active => onChange(active, item)}
				/>				
			</View>
		)
	}

	renderExtraItemCheckbox(item) {
		const {
			onPress
		} = this.props;

		return (
			<View>
				<BouncyCheckbox
					size={25}
					fillColor={colors.primary}
					unfillColor={colors.white}
					iconStyle={{ borderColor: colors.primary }}
					onPress={(isChecked) => onPress(isChecked, item)}
				/>
			</View>
		)
	}

	renderRowItem({item}) {
		return (
			<View style={styles.attributeListItem}>
				<AppText style={styles.attributeListItemText}>{item.name}</AppText>
				<View style={styles.attributeListItemSwitch}>{this.renderSwitch(item)}</View>
				<View style={styles.attributeListItemCheck}>{this.renderExtraItemCheckbox(item)}</View>
			</View>
		)
	}

	renderHeader({section: { title }}) {
		const { extraText } = this.props;

		return (
			<View style={styles.attributeListSectionHeader}>
				<AppText style={styles.attributeListSectionHeaderText}>
					{title}
				</AppText>
				<AppText>{extraText}</AppText>
			</View>
		)
	}

	extractKey(item, index) {
		return 'prdocut-' + item.id;
	}

	rednerSectionList() {
		if (!this.state.data[0])
			return null;
		
		const {
			includesText,
			alternateAttrText
		} = this.props;

		const data = [{
			title: includesText,
			data: {...this.state.data[0]}.items
		}, {
			title: alternateAttrText,
			data: {...this.state.data[1]}.items
		}];


		return (
			<SectionList
				sections={data}
				renderSectionHeader={this.renderHeader.bind(this)}
				keyExtractor={this.extractKey}
				renderItem={this.renderRowItem.bind(this)}
			/>
		)

	}
		
	render() {
		return (
			<>{this.rednerSectionList()}</>
		)
	}
}

AppSectionList.propTypes = {
	data: PropTypes.array,
	onChange: PropTypes.func,
	onPress: PropTypes.func,
	includesText: PropTypes.string,
	alternateAttrText: PropTypes.string,
	extraText: PropTypes.string
}

export { AppSectionList }