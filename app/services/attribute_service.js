import constants from '../config/app_constants';
import { default as data } from '../mocks/data/attributes';
import { brokerRegistry } from '../brokers/broker_registry';

const attributeBroker = brokerRegistry.broker.getBroker(constants.ATTRIBUTE_BROKER);

class AttributeService {
	constructor() {
		this.service = null;
	}

	createClass() {
		if (this.service)
			return;

		class AttributeService {
			getAttributes() {
				console.log('loading attributes');
				/** Load mock data */
				attributeBroker.setAttributes(data);
			}
		}

		this.service = new AttributeService();
	}
}

export let attributeService = new AttributeService();