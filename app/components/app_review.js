import React from 'react';
import {
	View,
	FlatList,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import PropTypes from 'prop-types';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { AppScreen } from './app_screen';
import { AppText } from './app_text';
import { AppButton } from './app_button';
import { AppListItemDelete } from './app_listItem_delete';
import { brokerRegistry } from '../brokers';
import { effectsRegistry } from '../effects';
import { serviceRegistry } from '../services';
import styles from '../screens/styles/cart_screen_styles';
import colors from '../screens/styles/colors';
import constants from '../config/app_constants';

const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);
const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);
const cartService = serviceRegistry.service.getService(constants.CART_SERVICE);

class AppReview extends React.Component {
	state = {
		noOrderText: '',
		cartTextQty: '',
		cartTextItem: '',
		cartTextPrice: '',
		orderDetails: null,
		removed: '',
		extra: '',
		specialInstructions: '',
		temsAndConditions: '',
		payInPerson: '',
		subtotal: '',
		taxes: '',
		total: '',
		continue: ''
	}
	subscribers = new Map();

	componentDidMount() {
		this.getTranslateText();
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
					noOrderText: t('no_order_display_text'),
					cartTextQty: t('qty'),
					cartTextItem: t('item'),
					cartTextPrice: t('price'),					
					removed: t('removed'),
					extra: t('extra'),
					specialInstructions: t('special_instructions'),
					temsAndConditions: t('terms'),
					payInPerson: t('vender_pay_in_person'),
					subtotal: t('subtotal'),
					taxes: t('taxes'),
					total: t('total'),
					continue: t('continue')
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

	updateItemQty(item) {
		const notANumber = (val) => {
			return Alert.alert(
				"Error",
				`${val} is not a valid number`,
				[{
					text: 'Cancel',
					style: 'cancel'
				}]
			)
		}

		const callback = (val) => {
			val = parseInt(val, 10);
			if (typeof val !== 'number'
				|| val < constants.MIN_ITEM_QUANTITY
				|| val > constants.META.MAX_ITEM_QUANTITY)
				return notANumber(val);
			const clone = {...item};
			clone.selectedQuantity = val;
			cartService.updateCartItem(this.state.orderDetails, clone);
		}

		Alert.prompt(
			'Update Item Quantity',
			'',
			callback,
			'plain-text',
			item.selectedQuantity.toString(),
			'number-pad'
		)
	}

	hasTaxRate() {
		return parseFloat(this.state.orderDetails?.taxRate.replace('%', ''), 10) > 0
	}

	hasRemovedAttributes(item) {
		return item.attributes.some(attr => !attr.active);
	}

	hasExtraAttributes(item) {
		return item.attributes.some(attr => attr.extra);
	}

	hasSpecialInstructions(item) {
		return item.specialInstructions !== null && item.specialInstructions !== '';
	}

	getRemovedAttribtues(item) {
		return item.attributes.reduce((arr, attr) => {
			if (!attr.active)
				arr.push(attr.name);
			return arr;
		}, []).join(', d');
	}

	getExtraAttributes(item) {
		return item.attributes.reduce((arr, attr) => {
			if (attr.extra)
				arr.push(attr.name);
			return arr;
		}, []).join(', ');
	}

	normalizePrice(price) {
		if (!price)
			return;
		return parseFloat(price.toString().replace(/[^0.-9]/g, ''), 10);
	}

	formatPrice(price) {
		if (!price)
			return;

		const segments = price.toString().split('.');
		if (!segments[1]) {
			price = price + '.00';
		} else if (segments[1].toString().length === 1) {
			price = price + '0'
		}
		return this.state.orderDetails?.currencySymbol + price;
	}

	calcItemSubtotal(item) {
		return this.formatPrice(this.normalizePrice(item.price) * item.selectedQuantity);
	}

	updateTerms(isChecked, type) {
		cartService.updateTerms(this.state.orderDetails, isChecked, type);
	}

	deleteItem(item) {
		cartService.deleteItem(this.state.orderDetails, item);
	}

	renderCartItem() {
		return (
			<FlatList
				data={this.state.orderDetails?.items}
				keyExtractor={item => item.id.toString()}
				renderItem={({item}) => 
					<Swipeable renderRightActions={() => <AppListItemDelete onPress={() => this.deleteItem(item)}/>}>
						<View style={styles.cartItemRow}>
							<TouchableWithoutFeedback onPress={() => this.updateItemQty(item)}>
								<View style={styles.cartItemQtyWrapper}>
									<AppText style={styles.cartItemQtyText}>{item.selectedQuantity}</AppText>
								</View>
							</TouchableWithoutFeedback>
							<View style={styles.cartItemItemWrapper}>
								<AppText style={styles.cartItemItemTitle} numberOfLines={1}>{item.title}</AppText>
								{this.hasRemovedAttributes(item) && <AppText style={styles.cartItemNoteHeader} numberOfLines={2}>
									{this.state.removed}:
									<AppText>&nbsp;</AppText>
									<AppText style={styles.cartItemNote}>{this.getRemovedAttribtues(item)}</AppText>
								</AppText>}
								{this.hasExtraAttributes(item) && <AppText style={styles.cartItemNoteHeader} numberOfLines={2}>
									{this.state.extra}:
									<AppText>&nbsp;</AppText>
									<AppText style={styles.cartItemNote}>{this.getExtraAttributes(item)}</AppText>
								</AppText>}
								{this.hasSpecialInstructions(item) && <AppText style={styles.cartItemNoteHeader} numberOfLines={3}>
									{this.state.specialInstructions}:
									<AppText>&nbsp;</AppText>
									<AppText style={styles.cartItemNote}>{item.specialInstructions}</AppText>
								</AppText>}
							</View>
							<AppText style={styles.cartItemPrice}>{this.calcItemSubtotal(item)}</AppText>
						</View>
					</Swipeable>
				}
			></FlatList>
		)
	}

	render() {
		const {
			onContinueToCheckout
		} = this.props;

		return (
			<AppScreen>
				{!this.state.orderDetails && <AppText style={styles.noOrderText}>{this.state.noOrderText}</AppText>}
				{this.state.orderDetails &&
					<View style={styles.orderDetailsContainer}>
						<View style={styles.detailsHeader}>
							<AppText style={styles.qty}>{this.state.cartTextQty}</AppText>
							<AppText style={styles.item}>{this.state.cartTextItem}</AppText>
							<AppText style={styles.price}>{this.state.cartTextPrice}</AppText>
						</View>
						<View style={styles.cartItems}>
							{this.renderCartItem()}
						</View>
						<View style={styles.cartTotals}>
							<View style={styles.cartTotalRow}>
								<AppText style={styles.cartTotalTitle} >{this.state.subtotal}
									<AppText>&nbsp;</AppText>
								</AppText>
								<AppText style={styles.cartTotalPrice}>
									{this.formatPrice(this.normalizePrice(this.state.orderDetails?.cartSubTotalPrice))}
								</AppText>
							</View>
							{this.hasTaxRate() && <View style={styles.cartTotalRow}>
								<AppText style={styles.cartTotalTitle} >{this.state.taxes}
									<AppText>&nbsp;</AppText>
								</AppText>
								<AppText style={styles.cartTotalPrice}>
									{this.formatPrice(this.normalizePrice(this.state.orderDetails?.taxPrice))}
								</AppText>
							</View>}
							<View style={styles.cartTotalRow}>
								<AppText style={styles.cartTotalTitle} >{this.state.total}
									<AppText>&nbsp;</AppText>
								</AppText>
								<AppText style={styles.cartTotalPrice}>
									{this.formatPrice(this.normalizePrice(this.state.orderDetails?.cartTotalPrice))}
								</AppText>
							</View>
						</View>
						<View style={styles.terms}>
							<View style={styles.termsContent}>
								<BouncyCheckbox
									isChecked={this.state.orderDetails[constants.ACCEPTED_TERMS]}
									size={25}
									fillColor={colors.primary}
									unfillColor={colors.white}
									iconStyle={{ borderColor: colors.primary, borderRadius: 3 }}
									onPress={(isChecked) => this.updateTerms(isChecked, constants.ACCEPTED_TERMS)}
								/>
								<AppText style={styles.termsText}>{this.state.temsAndConditions}</AppText>
							</View>
							<View style={styles.termsContent}>
								<BouncyCheckbox
									isChecked={this.state.orderDetails[constants.ACCEPTED_PAYMENT]}
									size={25}
									fillColor={colors.primary}
									unfillColor={colors.white}
									iconStyle={{ borderColor: colors.primary, borderRadius: 3 }}
									onPress={(isChecked) => this.updateTerms(isChecked, constants.ACCEPTED_PAYMENT)}
								/>
								<AppText style={styles.termsText}>{this.state.payInPerson}</AppText>
							</View>
						</View>
						<View style={styles.btnContainer}>
							<AppButton styles={styles.btn} onPress={onContinueToCheckout}>
								<AppText>{this.state.continue}</AppText>
							</AppButton>
						</View>
					</View>
				}
			</AppScreen>
		)
	}
}

AppReview.propTypes = {
	onContinueToCheckout: PropTypes.func
}

export { AppReview }