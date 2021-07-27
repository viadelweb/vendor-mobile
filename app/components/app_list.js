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
import { filterBy } from '../utils';
import styles from '../screens/styles/main_screen_styles';
import constants from '../config/app_constants';
import colors from '../screens/styles/colors';

class AppList extends React.Component {
	state = {
		filteredItems: [],
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
		this.createFilterSubscriber();
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
			this.setState({ items: items });			
		}));
	}

	createFilterSubscriber() {
		const {
			filterBroker,
			filterObservable
		} = this.props;
		if (!filterBroker || !filterObservable)
			return;
		const key = filterBroker + '.' + filterObservable;
		if (this.subscribers.has(key))
			return;

		const broker = brokerRegistry.broker.getBroker(filterBroker);
		this.subscribers.set(key, broker[filterObservable].subscribe(filter => {
			if (filter) {
				const items = filterBy([...this.state.items], filter);
				this.setState({filteredItems: items});
			}
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

		const all = [{
			id: -1,
			title: 'View All',
			uri: 'https://images.unsplash.com/photo-1557499305-bd68d0ad468d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
			description: null,
			parent: null
		}];

		return (
			<FlatList
				data={[...all, ...this.state.items]}
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
			refreshing
		} = this.props;

		const dataList = this.state.filteredItems.length > 0 ? this.state.filteredItems : this.state.items;

		return(
			<FlatList
				data={dataList}
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

		console.log('rendering: ', type);

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
	filterBroker: PropTypes.string,
	filterObservable: PropTypes.string
}

export { AppList }