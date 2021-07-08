import constants from '../config/app_constants';
import { default as data } from '../mocks/data/order';
import { brokerRegistry } from '../brokers/broker_registry';

const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);

class CartService {
	constructor() {
		this.service = null;
	}

	createClass() {
		if (this.service)
			return;

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
				/** Load mock data */
				const clone = {...order};
				clone.items = clone.items.map(i => {
					if (item.id === i.id)
						return item;
					return i;
				})
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
				console.log(clone.items);
				clone.items = clone.items.reduce((arr, i) => {
					if (item.id !== i.id)
						arr.push(i);
					return arr;
				}, []);
				cartBroker.updateCart(clone);
			}

			orderConfirmed(cart) {

			}

			cancelOrder(cart) {

			}
		}

		this.service = new CartService();
	}
}

export let cartService = new CartService();