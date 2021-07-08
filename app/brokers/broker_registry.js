/**
 * BrokerRegistry
 * Stores a single instance of the data broker for usage
 * This way components can use the same instance.
 */
 class BrokerRegistry {
    constructor() {
        this.broker = null;
    }

    createClass() {
        if (this.broker)
            return;
        
        /**
         * @private
         * Stores all registered brokers
         */
        const registered = new Map();

        /**
         * @private
         * Private methods
         */

         /**
          * @class {BrokerRegistry}
          * Broker registry management class
          */
        class BrokerRegistry {
            getBroker(brokerName) {
                return registered.get(brokerName);
            }
        
            register(broker, name) {
                if (registered.has(name))
                    return;
                    
                if (Object.getOwnPropertyNames(broker).indexOf('prototype') > 0
                    && (broker['prototype'] || null))
                        broker = (new broker);
                registered.set(name, broker);
            }

            registerBrokers(map /** Map */) {
                map.forEach((value, key) => {
                    this.register(value, key);
                });
            }

            listBrokers() {
                const brokers = [];
                const keys = registered.keys();
                let key;
                while(key = keys.next().value)
                    brokers.push(key);
                return brokers;
            }

            hasBroker(brokerName) {
                return registered.has(brokerName);
            }
        }

        this.broker = new BrokerRegistry();
    }
}

export let brokerRegistry = new BrokerRegistry();
