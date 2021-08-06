import React from 'react';
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem
} from '@react-navigation/drawer';
import {
	View
} from 'react-native';
import {
	AppScreen,
	AppText,
	AppIcon,
	AppButton
} from '../../components';
import { navigate } from '../../navigators/root';
import routes from '../constants/routes';

export default (props) => {
	// console.log('drawer props: ', props);

	return (
		<DrawerContentScrollView>
			<DrawerItemList {...props}/>
			<AppText>&nbsp;</AppText>
			<AppText style={{paddingLeft: 20, fontWeight: '400', fontSize: 18}}>Overlay Examples</AppText>
			<DrawerItem
				label="Show Error Overlay"
				onPress={() => {
					props.navigation.closeDrawer(); 
					navigate(routes.POPUP, {
						screen: routes.POPUP,
						params: {
							translationKey: 'test_translation_text',
							type: 'error'
						}
					})
				}}
			/>
			<DrawerItem
				label="Show Success Overlay"
				onPress={() => {
					props.navigation.closeDrawer(); 
					navigate(routes.POPUP, {
						screen: routes.POPUP,
						params: {
							translationKey: 'test_translation_text',
							type: 'success'
						}
					})
				}}
			/>
			<DrawerItem
				label="Show Warning Overlay"
				onPress={() => {
					props.navigation.closeDrawer(); 
					navigate(routes.POPUP, {
						screen: routes.POPUP,
						params: {
							translationKey: 'test_translation_text',
							type: 'warning'
						}
					})
				}}
			/>
			<DrawerItem
				label="Show Info Overlay"
				onPress={() => {
					props.navigation.closeDrawer(); 
					navigate(routes.POPUP, {
						screen: routes.POPUP,
						params: {
							translationKey: 'test_translation_text',
							type: 'info'
						}
					})
				}}
			/>

		</DrawerContentScrollView>
	)
}