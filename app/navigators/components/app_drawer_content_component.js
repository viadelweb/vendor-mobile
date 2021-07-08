import React from 'react';
import {
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer';
import {
	View
} from 'react-native';
import {
	AppScreen,
	AppText,
	AppIcon
} from '../../components';

export default (props) => {
	return (
		<DrawerContentScrollView>
			<AppText>Testing</AppText>

			<DrawerItemList {...props}/>
		</DrawerContentScrollView>
	)
}