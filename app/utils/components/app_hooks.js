import React, {useState, useEffect} from 'react';
import { useIntl } from 'react-native-international';

import { effectsRegistry } from '../../effects';

/**
 * This HOC can be used to load third party hooks into the effects registry.
 * Hooks are not allowed to be called from within class components, so
 * the registry stores a reference to the initialized functions so they can
 * be used from within the class components
 */
export default ({children}) => {
	const [isReady, setIsReady] = useState(false);
	const {
		t,
		locale,
		getLanguages,
		changeLocale
	} = useIntl();

	useEffect(() => {
		//load hooks
		const appHookEffects = effectsRegistry.effects.getEffect('AppHookEffects');
		const appHooks = [
			appHookEffects.addEffect('t', t),
			appHookEffects.addEffect('locale', locale),
			appHookEffects.addEffect('getLanguage', getLanguages),
			appHookEffects.addEffect('changeLocale', changeLocale),
		];

		console.log('listEffects', appHookEffects.listEffects());

		// check that all hooks have been loaded
		if (appHookEffects.listEffects().length === appHooks.length)
			setIsReady(true);
	}, []);

	return (
		<>{isReady && children}</>
	)
}