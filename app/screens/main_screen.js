import React from 'react';
import {
	View
} from 'react-native';

import { MainContext } from '../navigators/context/main.context';
import {
	AppImage,
	AppScreen,
	AppText,
	AppList,
	AppHeaderButtons
} from '../components';
import {default as styles} from './styles/main_screen_styles';
import { effectsRegistry } from '../effects';
import { brokerRegistry } from '../brokers';
import { serviceRegistry } from '../services';
import {
	AppHooks,
	AppServices
 } from '../utils/components';
import constants from '../config/app_constants';
import { navigate } from '../navigators/root';
import { location } from '../libraries';
import routes from '../navigators/constants/routes';
import colors from './styles/colors';

/**
 * TODO: replace constants with api service when available
 */
const HERO_IMAGE_URI = 'https://images.unsplash.com/photo-1555965708-54e82207ba97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const COMPANY_LOGO_IMAGE_URI = 'https://images.unsplash.com/photo-1543791187-df796fa11835?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
const MOCK_COMPANY_NAME = 'Company Name';
const MOCK_COMPANY_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);
const productBroker = brokerRegistry.broker.getBroker(constants.PRODUCT_BROKER);
const categoryBroker = brokerRegistry.broker.getBroker(constants.CATEGORY_BROKER);
const locationBroker = brokerRegistry.broker.getBroker(constants.LOCATION_BROKER);
const vendorService = serviceRegistry.service.getService(constants.VENDER_SERVICE);

class MainScreen extends React.Component {
	state = {
		estimatedVendorLocation: '',
		listRefreshing: false,
		selectedCategory: null
	};
	subscribers = new Map();

	async componentDidMount() {
		this.createDataSubscribers();
		const granted = await location.getPermission();
		if (granted) {
			const {latitude, longitude} = await location.getLocation();
			console.log(latitude, longitude);
			if (latitude && longitude)
			// udpate user location
			vendorService.updateUserLocation(latitude, longitude);
		} 
	}

	componentWillUnmount() {
    	this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
    }

	createDataSubscribers() {
		const key = constants.VENDER_SERVICE + '.' + constants.CURRENT_LOCATION_OBSERVABLE;
		if (!this.subscribers.has(key)) {
			this.subscribers.set(key, locationBroker[constants.CURRENT_LOCATION_OBSERVABLE].subscribe(location => {
				if (location) {
					const {
						t
					} = appHookEffects.getEffectsByName(['t']);
					/**
					 * FIXME: Estimated distance to vendor should be returned from the server
					 */
					setTimeout(() => {
						if (t)
							this.setState({
								estimatedVendorLocation: t(
									'vendor_distance_text',
									{
										distance: '1.21',
										length: 'miles' 
									}
								)
							});
					});
				}
			}))
		}
	}

	appListItemAddOnPress(item) {
		productBroker.setSelectedProduct(item);
		navigate(routes.PRODUCT_DETAILS);
	}

	categoryItemOnPress(item) {
		console.log(item);
		categoryBroker.setSelectedCategory({key: 'categories.id', filter: item.id});
	}

	renderItemListContainer() {
		return (
			<View style={styles.itemListContainer}>
				<AppList
					dataBroker={constants.PRODUCT_BROKER}
					observable={constants.PRODUCTS_OBSERVABLE}
					service={constants.PRODUCT_SERVICE}
					serviceMethod={constants.PRODUCT_SERVICE_GET_METHOD}
					serviceMethodArgs={null}
					type={constants.PRODUCT_LIST}
					refreshing={this.state.listRefreshing}
					onPress={this.appListItemAddOnPress}
					onRefresh={() => console.log('refreshing list')}
					filterBroker={constants.CATEGORY_BROKER}
					filterObservable={constants.CATEGORY_SELECTED_OBSERVABLE}
				/>
			</View>
		)
	}

	renderCategories() {
		return (
			<View style={styles.categoryListContainer}>
				<AppList
					dataBroker={constants.CATEGORY_BROKER}
					observable={constants.CATEGORIES_OBSERVABLE}
					service={constants.CATEGORY_SERVICE}
					serviceMethod={constants.CATEGORY_SERVICE_GET_METHOD}
					serviceMethodArgs={null}
					type={constants.CATEGORY_LIST}
					onPress={this.categoryItemOnPress}
					/>
			</View>
		)
	}

	renderAppServices(children) {
		return (
			<AppServices>
				{children}
			</AppServices>
		)
	}

	renderAppHooks(children) {
		return (
			<AppHooks>
				{children}
			</AppHooks>
		)
	}

	render() {
		const { route, navigation } = this.props;

		const headerButtonConfig = {
			left: {
				icon: 'menu',
				size: 35,
				color: colors.white,
				onPress: () => {
					navigation.openDrawer();
				},
				styles: styles.leftHeaderIcon
			},
			right: {
				icon: 'cart',
				size: 35,
				color: colors.white,
				onPress: () => {
					navigate(routes.CART)
				},
				styles: styles.rightHeaderIcon
			}
		}

		return (
			<>{this.renderAppHooks(
				this.renderAppServices(
				<AppScreen
					heroVisible={true}
					heroUri={HERO_IMAGE_URI}
					heroStyles={styles.heroImage}
					heroBlurRadius={8}>
						<AppHeaderButtons
							styles={styles.headerButtons}
							iconProps={headerButtonConfig}
						/>
					<View style={styles.logoContainer}>
						<AppImage styles={styles.heroLogoLeftCircle} uri={COMPANY_LOGO_IMAGE_URI}/>
						<View style={styles.heroTextContainr}>
							<AppText numberOfLines={1} style={styles.heroTextHeader}>
								{MOCK_COMPANY_NAME}
							</AppText>
							<AppText numberOfLines={2} style={styles.heroTextDescription}>
								{MOCK_COMPANY_DESCRIPTION}
							</AppText>
						</View>
					</View>
					<View style={styles.distanceTextContainer}>
						<AppText style={styles.distanceText}>
							{this.state.estimatedVendorLocation}
						</AppText>
					</View>
					{this.renderCategories()}
					{this.renderItemListContainer()}
				</AppScreen>
			))}</>
		)
	}
}

export { MainScreen }