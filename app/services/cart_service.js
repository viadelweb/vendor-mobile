import constants from '../config/app_constants';
import { default as data } from '../mocks/data/order';
import { brokerRegistry } from '../brokers/broker_registry';
import * as Linking from 'expo-linking';

const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);

class CartService {
	constructor() {
		this.service = null;
	}

	createClass() {
		if (this.service)
			return;


		const generateOrderUrl = (companyId, confirmationNumber) => {
			return Linking.createURL(`privateKey/company/${companyId}/orders/${confirmationNumber}`);
		}

		class CartService {
			addToCart(orderItem) {
				console.log('adding data to cart: ', orderItem);
				/**
				 * TODO: handle request and response with order details
				 * return false if unsuccessful and 
				 */				
				cartBroker.updateCart(data);
				return true
            }

			updateCartItem(order, item) {
				/** Update cart item, move recalc to server */
				const clone = {...order};
				clone.items = clone.items.map(i => {
					if (item.id === i.id)
						return item;
					return i;
				});
				cartBroker.updateCart(clone);
			}

			updateTerms(order, isChecked, type) {
				/** Update terms on db, update broker when complete */
				const clone = {...order};
				clone[type] = isChecked;
				cartBroker.updateCart(clone);
			}

			deleteItem(order, item) {
				/** Remove item form order, update broker */
				const clone = {...order};
				clone.items = clone.items.reduce((arr, i) => {
					if (item.id !== i.id)
						arr.push(i);
					return arr;
				}, []);
				cartBroker.updateCart(clone);
			}

			async orderConfirmed(order) {
				console.log('confirming order');
				// Do something on the database and create a random order id
				const clone = {...order};
				const confirmId = (Math.random()*1e16).toString(12).replace('.', '');
				clone.orderConfirmationNumber = confirmId;
				clone.confirmedOrderAt = Date.now();
				clone.orderConfirmationUrl = generateOrderUrl(clone.company.id, confirmId);
				cartBroker.clearCart();
				cartBroker.setOrderConfirmed(clone);
				return true;
			}

			cancelOrder(cart) {

			}
		}

		this.service = new CartService();
	}
}

export let cartService = new CartService();