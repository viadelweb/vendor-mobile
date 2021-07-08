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
	AppHeaderButtons,
	AppNotification
} from '../components';
import {default as styles} from './styles/main_screen_styles';
import { effectsRegistry } from '../effects';
import { brokerRegistry } from '../brokers';
import {
	AppHooks,
	AppServices
 } from '../utils/components';
import constants from '../config/app_constants';
import { navigate } from '../navigators/root';
import routes from '../navigators/constants/routes';
import colors from '../screens/styles/colors';

/**
 * TODO: replace constants with api service when available
 */
const HERO_IMAGE_URI = 'https://images.unsplash.com/photo-1555965708-54e82207ba97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const COMPANY_LOGO_IMAGE_URI = 'https://images.unsplash.com/photo-1543791187-df796fa11835?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
const MOCK_COMPANY_NAME = 'Company Name';
const MOCK_COMPANY_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';


class MainScreen extends React.Component {
	state = {
		estimatedVendorLocation: '',
		listRefreshing: false
	};

	componentDidMount() {
		this.getVendorLocation();
	}

	appListItemAddOnPress(item) {
		const broker = brokerRegistry.broker.getBroker(constants.PRODUCT_BROKER);
		broker.setSelectedProduct(item);
		navigate(routes.PRODUCT_DETAILS);
	}

	categoryItemOnPress(item) {
		console.log(item);
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

	getVendorLocation() {
		const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);
		const {
			t
		} = appHookEffects.getEffectsByName(['t']);
		console.log(t);
		/**
		 * TODO: Rquest vendor location, this should be loaded from the server
		 */
		setTimeout(() => {
			if (t)
				this.setState({estimatedVendorLocation: t('vendor_distance_text', { distance: '1.21', length: 'miles' })});
		},0);
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