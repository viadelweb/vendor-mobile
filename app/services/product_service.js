import constants from '../config/app_constants';
import { default as data } from '../mocks/data/products';
import { brokerRegistry } from '../brokers/broker_registry';

const productBroker = brokerRegistry.broker.getBroker(constants.PRODUCT_BROKER);

class ProductService {
	constructor() {
		this.service = null;
	}

	createClass() {
		if (this.service)
			return;

		class ProductService {
			getProducts() {
				console.log('loading products');
				/** Load mock data */
				productBroker.setProducts(data);
			}
		}

		this.service = new ProductService();
	}
}

export let productService = new ProductService();