import constants from '../config/app_constants';
import { default as data } from '../mocks/data/categories';
import { brokerRegistry } from '../brokers/broker_registry';

const categoryBroker = brokerRegistry.broker.getBroker(constants.CATEGORY_BROKER);

class CategoryService {
	constructor() {
		this.service = null;
	}

	createClass() {
		if (this.service)
			return;

		class CategoryService {
			getCategories() {
				console.log('loading categories');
				/** Load mock data */
				categoryBroker.setCategories(data);
			}
		}

		this.service = new CategoryService();
	}
}

export let categoryService = new CategoryService();