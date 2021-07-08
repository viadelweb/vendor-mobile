class AppHookEffects {
	constructor() {
		this.effect = null;
	}

	createClass() {
		if (this.effect)
			return;
		
		/**
		 * @private
		 * Effects
		 */
		const map = new Map();

		class AppHookEffects {
			addEffect(name, effect) {
				map.set(name, effect);
			}

			getEffect(name) {
				return map.get(name);
			}

			getEffectsByName(names) {
                const effects = names.reduce((obj, name) => {
                    if (!map.has(name))
                        return obj;

                    obj[name] = this.getEffect(name);
                    return obj
                }, {});
                return effects;
            }

            listEffects() {
                const list = [];
                const keys = map.keys();
                let key;
                while(key = keys.next().value) {
                    list.push(key);
                }
                return list;
            }
		}

		this.effect = new AppHookEffects();
	}
}

export let appHookEffects = new AppHookEffects();