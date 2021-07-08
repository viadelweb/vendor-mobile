import React from 'react';
import {
	View
} from 'react-native';
import PropTypes from 'prop-types';

import { AppText } from './app_text';
import { AppSectionList } from './app_section_list';
import { brokerRegistry } from '../brokers';
import { effectsRegistry } from '../effects';
import constants from '../config/app_constants';
import styles from '../screens/styles/details_screen_styles';

const attrBroker = brokerRegistry.broker.getBroker(constants.ATTRIBUTE_BROKER);

class AppAttributeList extends React.Component {
	state = {
		additionalAvailableAttributes: [],
		allAttributes: [],
		includesText: '',
		alternateAttrText: '',
		extraText: ''
	};
	subscribers = new Map();
	
	componentDidMount() {
		this.getTranslatedText();
	}
	
	getTranslatedText() {
		const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);
		const { t } = appHookEffects.getEffectsByName(['t']);
		setTimeout(() => {
			if (t) {
				this.setState({
					includesText: t('includes'),
					alternateAttrText: t('add_additional_ingredients'),
					extraText: t('extra_text')
				});
				this.createDataSubscribers();
			}
		})
	}
	
	createDataSubscribers() {
		const {
			selectedItemAttributes
		} = this.props;
		const attrKey = constants.ATTRIBUTE_BROKER + '.' + constants.ATTRIBUTE_OBSERVABLE;

		if (!this.subscribers.has(attrKey)) {
			this.subscribers.set(attrKey, attrBroker[constants.ATTRIBUTE_OBSERVABLE]
				.subscribe(items => {
					this.setState({allAttributes: items});
					if (selectedItemAttributes)
						this.findAvailableAttributes();
				}));
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.selectedItemAttributes !== prevProps.selectedItemAttributes)
			this.findAvailableAttributes();
	}

	findAvailableAttributes() {
		const {
			selectedItemAttributes
		} = this.props;
		const availableAttrs = this.state.allAttributes
			.filter(a => !(selectedItemAttributes.some(b => b.id === a.id)));
		attrBroker.setAttributesList([{
			title: this.state.includesText,
			items: selectedItemAttributes
		}, {
			title: this.state.alternateAttrText,
			items: availableAttrs
		}]);
	}

	componentWillUnmount() {
		this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
    }

	toggleSwitch(active, item) {
		attrBroker.changeActiveState(active, item);
	}

	toggleCheckbox(active, item) {
		attrBroker.changeExtraState(active, item);
	}

	render() {
		const {
			onChange
		} = this.props;

		return (
			<AppSectionList 
				onChange={this.toggleSwitch}
				onPress={this.toggleCheckbox}
				includesText={this.state.includesText}
				alternateAttrText={this.state.alternateAttrText}
				extraText={this.state.extraText}
			/>
		)
	}
}

AppAttributeList.propTypes = {
	selectedItemAttributes: PropTypes.array,
	onChange: PropTypes.func,
}

export { AppAttributeList }