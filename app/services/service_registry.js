/**
 * ServiceRegistry
 * Stores a single instance of the data service for usage
 * This way components can use the same instance.
 */
 class ServiceRegistry {
    constructor() {
        this.service = null;
    }

    createClass() {
        if (this.service)
            return;
        
        /**
         * @private
         * Stores all registered services
         */
        const registered = new Map();

        /**
         * @private
         * Private methods
         */

         /**
          * @class {ServiceRegistry}
          * Service registry management class
          */
        class ServiceRegistry {
            getService(serviceName) {
                return registered.get(serviceName);
            }
        
            register(service, name) {
                if (registered.has(name))
                    return;
                registered.set(name, service);
            }

            registerServices(map /** Map */) {
                map.forEach((value, key) => {
                    this.register(value, key);
                });
            }

            listServices() {
                const services = [];
                const keys = registered.keys();
                let key;
                while(key = keys.next().value)
                    services.push(key);
                return services;
            }

            hasService(serviceName) {
                return registered.has(serviceName);
            }
        }

        this.service = new ServiceRegistry();
    }
}

export let serviceRegistry = new ServiceRegistry();
