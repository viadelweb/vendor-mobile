import constants from '../config/app_constants';
import { brokerRegistry } from '../brokers/broker_registry';

const locationBroker = brokerRegistry.broker.getBroker(constants.LOCATION_BROKER);

class VendorService {
	constructor() {
		this.service = null;
	}

	createClass() {
		if (this.service)
			return;

		class VendorService {
			updateUserLocation(latitude, longitude) {
				/**
				 * update user location on service and retrieve updated location tracking data
				 * send current vendor information back to calculate the correct distance
				 * udpate locationBroker
				 */
				locationBroker.setLocation(latitude, longitude);
			}
		}

		this.service = new VendorService();
	}
}

export let vendorService = new VendorService();