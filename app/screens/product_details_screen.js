import React from 'react';
import {
	View
} from 'react-native';

import {
	AppText,
	AppScreen,
	AppHeaderButtons,
	AppAttributeList,
	AppTextInput,
	AppCounter,
	AppButton,
	AppIcon,
	AppNotification
} from '../components';
import { effectsRegistry } from '../effects';
import { brokerRegistry } from '../brokers';
import { serviceRegistry } from '../services';
import { navigate } from '../navigators/root';
import constants from '../config/app_constants';
import styles from './styles/details_screen_styles';
import colors from './styles/colors';
import routes from '../navigators/constants/routes';

const broker = brokerRegistry.broker.getBroker(constants.PRODUCT_BROKER);
const attrBroker = brokerRegistry.broker.getBroker(constants.ATTRIBUTE_BROKER);
const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);
const cartService = serviceRegistry.service.getService(constants.CART_SERVICE);
const notificationBroker = brokerRegistry.broker.getBroker(constants.NOTIFICATION_BROKER);
const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);


class ProductDetailsScreen extends React.Component {
	state = {
		product: {},
		updateAttributeInstruction: '',
		backButtonText: '',
		specialInstructionText: '',
		quantityCounter: 1,
		quantityCounterStart: 1,
		quantityCounterMax: 25,
		quantityCounterMin: 1,
		selectedQuantityText: '',
		specialInstructionPlaceholderText: '',
		addToCartText: '',
		addToCartSuccess: '',
		addToCartFailed: '',
		updatedAttribues: {},
	};
	subscribers = new Map();
	
	componentDidMount() {		
		if (!broker.hasSelectedProduct())
			navigate(routes.MAIN);
		else {
			notificationBroker.hideNotification();
			this.getTranslateText();
			this.createDataSubscribers();
		}
	}

	createDataSubscribers() {		
		const key = constants.PRODUCT_BROKER + '.' + constants.PRODUCTS_SELECTED_PRODUCT_OBSERVABLE;
		if (!this.subscribers.has(key)) {
			this.subscribers.set(key, broker[constants.PRODUCTS_SELECTED_PRODUCT_OBSERVABLE].subscribe(item => {
				this.setState({product: item});
			}));
		}
		
		const aKey = constants.ATTRIBUTE_BROKER + '.' + constants.ATTRIBUTES_LIST_OBSERVABLE;
		if (!this.subscribers.has(aKey)) {
			this.subscribers.set(aKey, attrBroker[constants.ATTRIBUTES_LIST_OBSERVABLE].subscribe(data => {
				this.setState({updatedAttribues: data});
			}));
		}

		const cKey = constants.CART_BROKER + '.' + constants.CART_UPDATED_OBSERVABLE;
		if (!this.subscribers.has(cKey)) {
			this.subscribers.set(cKey, cartBroker[constants.CART_UPDATED_OBSERVABLE].subscribe(state => {
				console.log('=============================: state', state);
			}))
		}
	}

	componentWillUnmount() {
		console.log('product details unmounting');
		broker.clearSelectedProduct();
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
					updateAttributeInstruction: t('update_attribute_instructions'),
					backButtonText: t('back_button_text'),
					selectedQuantityText: t('selected_quantity_text'),
					specialInstructionPlaceholderText: t('special_instructions_placeholder'),
					addToCartText: t('add_to_cart')
				})
			}
		})
	}

	setSpecialInstructionText(text) {
		this.setState({specialInstructionText: text});
	}

	setItemQauntity(number, type) {
		let quantity = {...this.state}.quantityCounter;
		quantity = type === '+' ? quantity + 1 : quantity - 1;
		if (quantity <= this.state.quantityCounterMin)
			this.setState({quantityCounter: this.state.quantityCounterMin})
		else if (quantity >= this.state.quantityCounterMax)
			this.setState({quantityCounter: this.state.quantityCounterMax})
		else
			this.setState({quantityCounter: quantity});
	}

	backToProductListings() {
		setTimeout(() => {
			navigate(routes.MAIN);
		}, 2000);
	}

	addToCart() {
		if (cartService.addToCart({
			product: this.state.product,
			updatedAttributes: this.state.updatedAttribues,
			quantity: this.state.quantityCounter,
			instructions: this.state.specialInstructionText
		})) {
			const { t } = appHookEffects.getEffectsByName(['t']);
			setTimeout(() => {
				if (t) {
					notificationBroker.setContent(<AppText>							
							{t('add_to_cart_success', {
								number: this.state.quantityCounter,
								name: this.state.product.title
							})}
							</AppText>,
						constants.NOTIFICATION.SUCCESS);
					notificationBroker.showNotification();	
				}
				this.backToProductListings();
			})
		}
	}

	render() {
		const headerButtonConfig = {
			left: {
				icon: 'chevron-left',
				size: 35,
				color: colors.white,
				onPress: () => {
					notificationBroker.close();
					navigate(routes.MAIN);
				},
				styles: styles.leftHeaderIcon,
				title: this.state.backButtonText
			}
		};

		const addToCartIcon = {
			name: 'plus',
			size: 50,
			color: colors.white
		};

		return (
			<AppScreen
				heroVisible={true}
				heroUri={this.state.product?.uri}
				heroStyles={styles.heroImage}
				heroBlurRadius={0}
			>
				<AppNotification onPress={() => notificationBroker.close()} />

				<AppHeaderButtons
					styles={styles.headerButtons}
					iconProps={headerButtonConfig}/>	
				<View style={styles.addToCartButtonContainer}>
					<AppButton
						onPress={() => this.addToCart()}
						styles={styles.addToCartButton}>
						<AppIcon {...addToCartIcon} />
					</AppButton>
				</View>

				<View style={styles.contentContainer}>

					<AppText style={styles.detailsPageHeader}>{this.state.product?.title}</AppText>
					<AppText numberOfLines={3} style={styles.detailsDescription}>{this.state.product?.description}</AppText>
					<AppText numberOfLines={2} style={styles.attributeInstructions}>{this.state.updateAttributeInstruction}</AppText>
					
					<View style={styles.attrListContainer}>						
						<AppAttributeList
							selectedItemAttributes={this.state.product?.attributes}
							onChange={this.onAttributeUpdate}/>
					</View>
					<AppTextInput
						onChangeText={text => this.setSpecialInstructionText(text)}
						value={this.state.specialInstructionText}
						placeholder={this.state.specialInstructionPlaceholderText}
						maxLength={120}
					/>
					<AppCounter
						start={this.state.quantityCounterStart}
						min={this.state.quantityCounterMin}
						max={this.state.quantityCounterMax}
						onChange={this.setItemQauntity.bind(this)}
					/>
					<AppText style={styles.quantityUpdateText}>
						{this.state.selectedQuantityText} {this.state.quantityCounter}
					</AppText>

				</View>
			</AppScreen>
		)
	}
}

export { ProductDetailsScreen }