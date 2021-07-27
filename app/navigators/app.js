import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import routes from './constants/routes';
import {
	CartScreen,
	MainScreen,
	ProductDetailsScreen,
	OrderConfirmationScreen
} from '../screens';
import AppDrawerContentComponent from './components/app_drawer_content_component';
import { effectsRegistry } from '../effects';
import constants from '../config/app_constants';

const Root = createStackNavigator();
const Main = createStackNavigator();
const Modal = createStackNavigator();
const Drawer = createDrawerNavigator();
const OrderConfirmation = createStackNavigator();
const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);

export default class AppNavigator extends React.Component {
	state = {
		reviewCart: '',
		backButton: ''
	}

	componentDidMount() {
		this.getTranslateText();
	}

	getTranslateText() {
		const { t } = appHookEffects.getEffectsByName(['t']);
		setTimeout(() => {
			if (t) {
				this.setState({
					reviewCart: t('review_cart'),
					backButton: t('back_button_text')
				})
			}
		})
	}

	render() {
		const DrawerNavigator = () => <Drawer.Navigator
				drawerType="front"
				drawerStyle={{width: '75%'}}
				initialRouteName={routes.MAIN}
				drawerContent={(props) => <AppDrawerContentComponent {...props} />}>
			<Drawer.Screen
				name={routes.MAIN}
				component={MainStackNavigator} 
				options={{
					drawerLabel: 'Home'
				}}/>
		</Drawer.Navigator>

		const MainStackNavigator = () => <Main.Navigator>
			<Main.Screen
				name={routes.MAIN}
				component={MainScreen}
				options={{
					headerBackTitleVisible: false,
					headerShown: false
				}}
			/>
			<Main.Screen
				name={routes.CART}
				component={CartScreen}
				options={{
					headerBackTitleVisible: true,
					headerShown: true,
					headerBackTitle: this.state.backButton,
					headerTitle: this.state.reviewCart,
				}}
			/>
			<OrderConfirmation.Screen
				name={routes.ORDER_CONFIRMATION}
				component={OrderConfirmationScreen}
				options={{
					headerBackTitleVisible: false,
					headerShown: false
				}}
			/>
		</Main.Navigator>

		const ModalStackNavigator = () => <Modal.Navigator mode="modal">
			<Modal.Screen
				name={routes.PRODUCT_DETAILS}
				component={ProductDetailsScreen}
				options={{
					headerBackTitleVisible: false,
					headerShown: false,
					cardStyle: 'modal',
				}}
			/>
		</Modal.Navigator>

		return (
			<Root.Navigator
				mode="modal"
				screenOptions={{
					headerBackTitleVisible: false,
					headerShown: false
				}}>
				<Root.Screen name={routes.MENU_DRAWER} component={DrawerNavigator} />
				<Root.Screen name={routes.PRODUCT_DETAILS} component={ModalStackNavigator}/>
			</Root.Navigator>
		)
	}
}

export { AppNavigator }
