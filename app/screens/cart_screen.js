import React from 'react';
import {
	TouchableWithoutFeedback,
	View
} from 'react-native';

import {
	AppScreen,
	AppText,
	AppIcon,
	AppReview,
	AppNotification
} from '../components';
import styles from './styles/cart_screen_styles';
import colors from './styles/colors';
import constants from '../config/app_constants';
import { brokerRegistry } from '../brokers';
import { effectsRegistry } from '../effects';

const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);
const notificationBroker = brokerRegistry.broker.getBroker(constants.NOTIFICATION_BROKER);
const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);

class CartScreen extends React.Component {
	state = {
		activeTab: 0,
		termsChecked: false,
		paymentTermsChecked: false,
		checkout: '',
		review: ''
	};
	subscribers = new Map();

	componentDidMount() {
		notificationBroker.hideNotification();
		this.createDataSubscribers();
	}

	componentWillUnmount() {
        this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
    }

	getTranslateText() {
		const { t } = appHookEffects.getEffectsByName(['t']);
		setTimeout(() => {
			if (t) {
				this.setState({
					checkout: t('checkout'),
					review: t('review')
				})
			}
		})
	}

	createDataSubscribers() {
		const cKey = constants.CART_BROKER + '.' + constants.CART_TERMS_OBSERVABLE;
		if (!this.subscribers.has(cKey)) {
			this.subscribers.set(cKey, cartBroker[constants.CART_TERMS_OBSERVABLE].subscribe(status => {
				this.setState({termsChecked: status});
			}))
		}

		const bKey = constants.CART_BROKER + '.' + constants.CART_PAYMENT_TERMS_OBSERVABLE;
		if (!this.subscribers.has(bKey)) {
			this.subscribers.set(bKey, cartBroker[constants.CART_PAYMENT_TERMS_OBSERVABLE].subscribe(status => {
				this.setState({paymentTermsChecked: status});
			}))
		}
	}

	setActiveTab(n) {
		console.log(this.state.termsChecked, this.state.paymentTermsChecked);
		if (!this.state.termsChecked || !this.state.paymentTermsChecked) {
			const { t } = appHookEffects.getEffectsByName(['t']);
			setTimeout(() => {
				if (t) {
					notificationBroker.setContent(<AppText>
						{t('terms_required')}
					</AppText>,
					constants.NOTIFICATION.ERROR
					);
					notificationBroker.showNotification();	
				}
			})
		}
		else
			this.setState({activeTab: n});
	}

	render() {
		const {
			route
		} = this.props;

		return (
			<AppScreen>
				<AppNotification onPress={() => notificationBroker.close()} />
				<View style={styles.tabContainer}>
					<TouchableWithoutFeedback onPress={() => this.setActiveTab(0)}>
						<View style={[
							styles.tabButton,
							this.state.activeTab === 0 ? {...styles.activeTab} : null
							]}>
							<AppText style={[
									styles.tabText,
							]}>Review</AppText>
							<AppIcon
								name="triangle"
								size={14}
								color={colors.white}
								styles={styles.tabCaret}
								visible={this.state.activeTab === 0}
							/>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => this.setActiveTab(1)}>
						<View style={[
							styles.tabButton,
							this.state.activeTab === 1 ? {...styles.activeTab} : null
							]}>
							<AppText style={[
									styles.tabText									
							]}>Checkout</AppText>
							<AppIcon
								name="triangle"
								size={12}
								color={colors.white}
								styles={styles.tabCaret}
								visible={this.state.activeTab === 1}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
				{this.state.activeTab === 0 && <AppReview onContinueToCheckout={() => this.setActiveTab(1)}/>}
			</AppScreen>
		)
	}
}

export { CartScreen }