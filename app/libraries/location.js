import * as Location from 'expo-location';

/**
 * @class AppLocation
 * get the user location if permission have been granted
 * Usage:
 * const location = new AppLocation();
 * if (location.getPermission()) {
 *     const {latitude, longitude} = location.getLocation();
 * }
 */
class AppLocation {

    /**
     * @public
     * @returns {boolean}
     */
    async getPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted')
            return false;
        return true;
    }

    /**
     * @public
     * @returns {object}
     * {
     *   latitude {number}
     *   longitude {number}
     * }
     */
    async getLocation() {
        try {            
            let {coords: {
                latitude,
                longitude,
                altitude,
                accuracy,
                altitudeAccuracy,
                heading,
                speed
            }, timestamp} = await Location.getLastKnownPositionAsync();
            return {latitude, longitude};
        } catch (e) {
            console.log('Location not available: ', e);
            return {}
        }
    }

    /**
     * @public
     * @returns {object}
     * {
     *   latitude {number}
     *   longitude {number}
     * }
     */
    async getCurrentPosition() {
        try {
            let {coords: {
                latitude,
                longitude,
                altitude,
                accuracy,
                altitudeAccuracy,
                heading,
                speed
            }, timestamp} = await Location.getLastKnownPositionAsync();
            return {latitude, longitude};
        } catch (e) {
            console.log('Location not available: ', e);
            return {}
        }
    }
}

export let location  = new AppLocation();