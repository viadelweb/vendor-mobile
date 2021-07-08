import constants from '../config/app_constants';
import { brokerRegistry } from './broker_registry';
import { categoryBroker } from './category_broker';
import { productBroker } from './product_broker';
import { attributeBroker } from './attribute_broker';
import { cartBroker } from './cart_broker';
import { notificationBroker } from './notification_broker';

brokerRegistry.createClass();
categoryBroker.createClass();
productBroker.createClass();
attributeBroker.createClass();
cartBroker.createClass();
notificationBroker.createClass();

brokerRegistry.broker.registerBrokers(new Map([
	[constants.CATEGORY_BROKER, categoryBroker.broker],
	[constants.PRODUCT_BROKER, productBroker.broker],
	[constants.ATTRIBUTE_BROKER, attributeBroker.broker],
	[constants.CART_BROKER, cartBroker.broker],
	[constants.NOTIFICATION_BROKER, notificationBroker.broker],
]));

console.log('listBrokers: ', brokerRegistry.broker.listBrokers());

export { brokerRegistry }