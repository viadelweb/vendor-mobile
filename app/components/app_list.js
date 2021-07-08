import React from 'react';
import {
	TouchableHighlight,
	FlatList,
	View
} from 'react-native';
import PropTypes from 'prop-types';

import { AppImage } from './app_image';
import { AppText } from './app_text';
import { AppListItem } from './app_listItem';
import { AppListSeparator } from './app_list_seperator';
import { AppListItemAdd } from './app_listItem_add';
import { brokerRegistry } from '../brokers';
import { serviceRegistry } from '../services';
import styles from '../screens/styles/main_screen_styles';
import constants from '../config/app_constants';
import colors from '../screens/styles/colors';

class AppList extends React.Component {
	state = {
		items: [],
		reloading: false
	};
	subscribers = new Map();

	componentDidMount() {
		const {
			service,
			serviceMethod,
			serviceMethodArgs
		} = this.props;

		const registeredService = serviceRegistry.service.getService(service);
		registeredService[serviceMethod].apply(null, serviceMethodArgs);
		this.createDataSubscriber();
	}

	createDataSubscriber() {
		const {
			dataBroker,
			observable
		} = this.props;
		const key = dataBroker + '.' + observable;
		if (this.subscribers.has(key))
			return;

		const broker = brokerRegistry.broker.getBroker(dataBroker);
		this.subscribers.set(key, broker[observable].subscribe(items => {
			this.setState({items: items});			
		}));
	}

	componentWillUnmount() {   
        this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
    }

	renderCategoryList() {
		const {
			onPress,
		} = this.props;

		return (
			<FlatList
				data={this.state.items}
				keyExtractor={item => item.id.toString()}
				renderItem={({item}) =>
					<TouchableHighlight underlayColor={colors.light} onPress={() => onPress(item)}>
						<View>
							<AppImage uri={item.uri} styles={styles.categoryImage}/>
							<AppText style={styles.categoryText} numberOfLines={2}>{item.title}</AppText>
						</View>
					</TouchableHighlight>
				}
				horizontal={true}
			></FlatList>
		)
	}

	renderProductList() {
		const {
			onRefresh,
			onPress,
			refreshing,
		} = this.props;

		return(
			<FlatList
				data={this.state.items}
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => <AppListSeparator />}
				renderItem={({item}) => 
					<TouchableHighlight underlayColor={colors.light} onPress={() => onPress(item)}>
						<AppListItem 
							title={item.title}
							description={item.description}
							uri={item.uri}
							price={item.price}
							swipeLeftActions={() => <AppListItemAdd onPress={() => onPress(item)}/>}
						/>
					</TouchableHighlight>
				}
				refreshing={refreshing}
				onRefresh={() => onRefresh()}
			>
			</FlatList>
		)
	}

	render() {
		const {
			type
		} = this.props;

		switch(type) {
			case constants.CATEGORY_LIST:
				return this.renderCategoryList();
			case constants.PRODUCT_LIST:
				return this.renderProductList();
		}
	}
}

AppList.propTypes = {
	dataBroker: PropTypes.string,
	observable: PropTypes.string,
	refreshing: PropTypes.bool,
	service: PropTypes.string,
	serviceMethod: PropTypes.string,
	serviceMethodArgs: PropTypes.string,
	type: PropTypes.oneOf([
		constants.CATEGORY_LIST,
		constants.PRODUCT_LIST
	]),
	onPress: PropTypes.func,
	onRefresh: PropTypes.func,
	selectedItemSetter: PropTypes.string,
}

export { AppList }