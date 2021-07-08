/**
 * HooksRegistry
 * Stores a single instance of a hook for usage withing components
 * Unlike traditional react hooks these can be used within
 * your class context
 */
class EffectsRegistry {
    constructor() {
        this.effects = null;
    }

    createClass() {
        if (this.effects)
            return;
        
        /**
         * @private
         * Stores all registered effects
         */
        const registered = new Map();

        /**
         * @private
         * Private methods
         */

         /**
          * @class {EffectsRegistry}
          * Effects registry management class
          */
        class EffectsRegistry {
            getEffect(effectName) {
                return registered.get(effectName);
            }
        
            register(effect, name) {
                if (registered.has(name))
                    return;

                if (Object.getOwnPropertyNames(effect).indexOf('prototype') > 0
                    && (effect['prototype'] || null))
                        effect = (new effect);
                registered.set(name, effect);
            }

            registerEffects(map /** Map */) {
                map.forEach((value, key) => {
                    this.register(value, key);
                });
            }

            listEffects() {
                const effects = [];
                const keys = registered.keys();
                let key;
                while(key = keys.next().value)
                    effects.push(key);
                return effects;                
            }

            hasEffect(effectName) {
                return registered.has(effectName);
            }
        }

        this.effects = new EffectsRegistry();
    }
}

export let effectsRegistry = new EffectsRegistry();
