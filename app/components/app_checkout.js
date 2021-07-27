import React from 'react';
import {
	Keyboard,
	View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { AppScreen } from './app_screen';
import { AppText } from './app_text';
import { AppButton } from './app_button';
import { AppTextInput } from './app_text_input';
import { brokerRegistry } from '../brokers';
import { effectsRegistry } from '../effects';
import { serviceRegistry } from '../services';
import { navigate } from '../navigators/root';
import styles from '../screens/styles/cart_screen_styles';
import colors from '../screens/styles/colors';
import constants from '../config/app_constants';
import routes from  '../navigators/constants/routes';
import {
	formatPrice,
	validEmail,
	formatPhone
} from '../utils/functions';

const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);
const notificationBroker = brokerRegistry.broker.getBroker(constants.NOTIFICATION_BROKER);
const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);
const cartService = serviceRegistry.service.getService(constants.CART_SERVICE);

class AppCheckout extends React.Component {
	state = {
		orderDetails: null,
		checkoutTotal: '',
		checkoutInstructions: '',
		name: '',
		mobilePhone: '',
		email: '',
		messageTerms: '',
		promoTerms: '',
		inputName: '',
		inputPhone: '',
		inputEmail: '',
		confirmOrder: '',
		invalidEmail: true,
		invalidPhone: true,
		invalidName: true,
	}
	subscribers = new Map();

	componentDidMount() {
		this.getTranslateText();
		this.createDataSubscribers();
	}

	componentWillUnmount() {
		notificationBroker.close();
		this.subscribers.forEach((sub, k) => {
			sub.unsubscribe();
			sub.complete();
		});
	}

	getTranslateText() {
		const { t } = appHookEffects.getEffectsByName(['t']);
		setTimeout(() => {
			if (t) {
				this.setState({
					checkoutTotal: t('checkout_total'),
					checkoutInstructions: t('checkout_instructions'),
					name: t('name'),
					mobilePhone: t('mobile_phone'),
					email: t('email'),
					messageTerms: t('message_terms'),
					promoTerms: t('promo_terms'),
					confirmOrder: t('confirm_order')
				})
			}
		})
	}

	createDataSubscribers() {
		const cKey = constants.CART_BROKER + '.' + constants.ORDER_DETAILS_OBSERVABLE;
		if (!this.subscribers.has(cKey)) {
			this.subscribers.set(cKey, cartBroker[constants.ORDER_DETAILS_OBSERVABLE].subscribe(order => {
				if (order) {
					this.setState({orderDetails: order});
				}
			}))
		}
	}

	updateTerms(isChecked, type) {
		cartService.updateTerms(this.state.orderDetails, isChecked, type);
	}

	onChangeText(val, type) {
		if (type === 'inputEmail' && (!validEmail(val) || val === ''))
			this.setState({invalidEmail: true});
		else
			this.setState({invalidEmail: false});
		if (type === 'inputPhone') {
			if (val.length < 10)
				this.setState({invalidPhone: true});
			else {
				this.setState({invalidPhone: false});
				val = formatPhone(val);
			}
		}
		if (type === 'inputName' && val.length < 3)
			this.setState({invalidName: true});
		else
			this.setState({invalidName: false});
		this.setState({ [type]: val });
	}

	async confirmOrder() {
		notificationBroker.close();
		const {
			inputName,
			inputPhone,
			inputEmail
		} = this.state;
		const { t } = appHookEffects.getEffectsByName(['t']);
		const invalid = {
			name: inputName === '' || this.state.invalidName,
			mobilePhone: inputPhone === '' || this.state.invalidPhone,
			email: inputEmail === '' || this.state.invalidEmail
		}

		const textFieldErrorMessages = () => {
			const items = [];
			let i = 0
			for (const [key, val] of Object.entries(invalid)) {
				if (val) {
					switch (key) {
						case t('name'):
							this.setState({invalidName: true});
						case t('email'):
							this.setState({invalidEmail: true});
						case t('mobile_phone'):
							this.setState({invalidPhone: true});
						default:
							break;
					}
					items.push(<AppText key={i + '_er_cartconfirm'}>{this.state[key]} {t('field_is_invalid')}</AppText>);
					i++;
				}
			}
			return items;
		}
		if (!this.state.orderDetails[constants.ACCEPTED_MESSAGES]) {
			setTimeout(() => {
				if (t) {
					notificationBroker.setContent(<AppText>
						{t('messages_required')}	
					</AppText>,
					constants.NOTIFICATION.ERROR);
					notificationBroker.showNotification();
				}
				return
			});
		} else if (Object.values(invalid).join(':').indexOf(true) >= 0) {
			setTimeout(() => {
				if (t) {
					notificationBroker.setContent(
						<>{textFieldErrorMessages()}</>,
						constants.NOTIFICATION.ERROR);
					notificationBroker.showNotification();	
				}
				return
			});
		} else {
			notificationBroker.close();
			const complete = await cartService.orderConfirmed(this.state.orderDetails);
			if (complete) {
				navigate(routes.ORDER_CONFIRMATION);
			}
		}
	}

	render() {

		return (
				<AppScreen>
					{this.state.orderDetails &&
					<View style={styles.orderDetailsContainer}>
						<View style={styles.checkoutDetailsHeader}>
							<AppText style={styles.totalTitleText}>{this.state.checkoutTotal}</AppText>
							<AppText style={styles.totalText}>{formatPrice(this.state.orderDetails?.cartTotalPrice, this.state.orderDetails?.currencySymbol)}</AppText>
						</View>
						<View style={styles.inputTextFieldContainer}>
							<AppText style={styles.instructionText}>{this.state.checkoutInstructions}</AppText>
							<AppTextInput
								onChangeText={(val) => this.onChangeText(val, 'inputName')}
								value={this.state.inputName}
								placeholder={this.state.name + ' *'}
								placeholderTextColor={colors.lightRed}
								maxLength={40}
								onSubmitEditing={Keyboard.dismiss}
								style={this.state.invalidName && styles.invalidTextField}
							/>
							<AppTextInput
								onChangeText={(val) => this.onChangeText(val, 'inputPhone')}
								value={this.state.inputPhone}
								placeholder={this.state.mobilePhone + ' *'}
								placeholderTextColor={colors.lightRed}
								maxLength={10}
								onSubmitEditing={Keyboard.dismiss}
								style={this.state.invalidPhone && styles.invalidTextField}
							/>
							<AppTextInput
								onChangeText={(val) => this.onChangeText(val, 'inputEmail')}
								value={this.state.inputEmail}
								placeholder={this.state.email + ' *'}
								placeholderTextColor={colors.lightRed}
								maxLength={40}
								onSubmitEditing={Keyboard.dismiss}
								style={this.state.invalidEmail && styles.invalidTextField}
							/>
						</View>
						<View style={styles.terms}>
							<View style={styles.termsContent}>
								<BouncyCheckbox
									isChecked={this.state.orderDetails[constants.ACCEPTED_MESSAGES]}
									size={25}
									fillColor={colors.primary}
									unfillColor={colors.white}
									iconStyle={{ borderColor: colors.primary, borderRadius: 3 }}
									onPress={(isChecked) => this.updateTerms(isChecked, constants.ACCEPTED_MESSAGES)}
								/>
								<AppText style={styles.termsText}>{this.state.messageTerms}</AppText>
							</View>
							<View style={styles.termsContent}>
								<BouncyCheckbox
									isChecked={this.state.orderDetails[constants.ACCEPTED_PROMO]}
									size={25}
									fillColor={colors.primary}
									unfillColor={colors.white}
									iconStyle={{ borderColor: colors.primary, borderRadius: 3 }}
									onPress={(isChecked) => this.updateTerms(isChecked, constants.ACCEPTED_PROMO)}
								/>
								<AppText style={styles.termsText}>{this.state.promoTerms}</AppText>
							</View>
						</View>
						<View style={styles.btnContainer}>
							<AppButton styles={styles.btn} onPress={this.confirmOrder.bind(this)}>
								<AppText>{this.state.confirmOrder}</AppText>
							</AppButton>
						</View>
					</View>}
				</AppScreen>
		)
	}
}

export { AppCheckout }