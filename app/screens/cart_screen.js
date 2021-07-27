import React from 'react';
import {
	Animated,
	Easing,
	Keyboard,
	TouchableWithoutFeedback,
	View
} from 'react-native';

import {
	AppScreen,
	AppText,
	AppIcon,
	AppReview,
	AppCheckout
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
		review: '',
		termsRequired: '',
		shift: new Animated.Value(0)
	};
	subscribers = new Map();

	componentDidMount() {
		this.getTranslateText();
		this.createDataSubscribers();

		this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow.bind(this));
		this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide.bind(this));
	}

	componentWillUnmount() {
        this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
    }

	getTranslateText() {
		const { t } = appHookEffects.getEffectsByName(['t']);
		setTimeout(() => {
			if (t) {
				this.setState({
					checkout: t('checkout'),
					review: t('review'),
					termsRequired: t('terms_required')
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

	setActiveTab(n, e) {
		if (!this.state.termsChecked || !this.state.paymentTermsChecked) {
			notificationBroker.setContent(
				<AppText>{this.state.termsRequired}</AppText>,
				constants.NOTIFICATION.ERROR
			);
			notificationBroker.showNotification(2000);
		}
		else
			this.setState({activeTab: n});
	}

	handleKeyboardDidShow(event) {		
		Animated.timing(
			this.state.shift,
			{
				toValue: -60,
				duration: 100,
				easing: Easing.linear,
				useNativeDriver: true,
			}
		).start();
	}
	
	handleKeyboardDidHide() {
		Animated.timing(
			this.state.shift,
			{
				toValue: 0,
				duration: 100,
				easing: Easing.linear,
				useNativeDriver: true,
			}
		).start();
	}

	render() {
		const {
			route
		} = this.props;

		return (
			<Animated.View style={[styles.container, { transform: [{translateY: this.state.shift}] }]}>
				<AppScreen>
					<View style={styles.tabContainer}>
						<TouchableWithoutFeedback onPress={(e) => {} /*this.setActiveTab(0, e)*/}>
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
						<TouchableWithoutFeedback onPress={(e) => {}/*this.setActiveTab(1, e)*/}>
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
					{this.state.activeTab === 0 && <AppReview onContinueToCheckout={(e) => this.setActiveTab(1, e)}/>}
					{this.state.activeTab === 1 && <AppCheckout />}
				</AppScreen>
			</Animated.View>
		)
	}
}

export { CartScreen }