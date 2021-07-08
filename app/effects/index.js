import constants from '../config/app_constants';
import { effectsRegistry } from './effects_registry';
import { appFormEffects } from './app_form.effects';
import { appHookEffects } from './app_hook.effect';

effectsRegistry.createClass();
appFormEffects.createClass();
appHookEffects.createClass();

effectsRegistry.effects.registerEffects(new Map([
    [constants.APP_FORM_EFFECTS, appFormEffects.effect],
    [constants.APP_HOOK_EFFECTS, appHookEffects.effect]
]));

console.log('listEffects: ', effectsRegistry.effects.listEffects());

export { effectsRegistry }