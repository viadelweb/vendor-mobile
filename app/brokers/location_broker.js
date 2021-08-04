import {
    BehaviorSubject,
} from 'rxjs';

import constants from '../config/app_constants';

class LocationBroker {
    constructor() {
        this.broker = null;
    }

	
    createClass() {
		if (this.broker)
		return;
		
		const currentLocation = new BehaviorSubject(null);

        class LocationBroker {
            constructor() {
				this.$$currentLocation = currentLocation.asObservable();				
            }

            setLocation(latitude, longitude) {
				currentLocation.next({latitude: latitude, longitude: longitude});
            }
        }

        this.broker = new LocationBroker();
    }
}

export let locationBroker = new LocationBroker();