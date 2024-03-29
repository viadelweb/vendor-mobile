import {
    BehaviorSubject,
} from 'rxjs';

import constants from '../config/app_constants';

class CartBroker {
    constructor() {
        this.broker = null;
    }

    createClass() {
        if (this.broker)
            return;

		// Store meta data for the cart such as items out of stock,
		// and the tax rate if any according to company settings
		const meta = new Map();	

        const cartItems = new BehaviorSubject([]);
		const cartTerms = new BehaviorSubject(false);
		const cartPaymentTerms = new BehaviorSubject(false);
        const cartPrivacyTerms = new BehaviorSubject(false);
        const cartMessagesTerms = new BehaviorSubject(false);
		const cartActiveTab = new BehaviorSubject('review');
		const cartTotals = new BehaviorSubject({});
		const cartUpdated = new BehaviorSubject(false);
        const orderDetails = new BehaviorSubject(null);
        const confirmedOrder = new BehaviorSubject(null);

        class CartBroker {
            constructor() {
                this.$$cartItems = cartItems.asObservable();
                this.$$cartTerms = cartTerms.asObservable();
                this.$$cartPaymentTerms = cartPaymentTerms.asObservable();
                this.$$cartPrivacyTerms = cartPrivacyTerms.asObservable();
                this.$$cartMessagesTerms = cartMessagesTerms.asObservable();
                this.$$cartActiveTab = cartActiveTab.asObservable();
				this.$$cartUpdated = cartUpdated.asObservable();
                this.$$orderDetails = orderDetails.asObservable();
                this.$$confirmedOrder = confirmedOrder.asObservable();
            }

            updateCart(currentOrder) {
                if (orderDetails) {
                    cartUpdated.next(true);
                    orderDetails.next(currentOrder);
                    cartPaymentTerms.next(currentOrder[constants.ACCEPTED_PAYMENT]);
                    cartTerms.next(currentOrder[constants.ACCEPTED_TERMS]);
                    cartPrivacyTerms.next(currentOrder[constants.ACCEPTED_PRIVACY]);
                    cartMessagesTerms.next(currentOrder[constants.ACCEPTED_MESSAGES]);
                }
            }

			updateMeta(key, value, role) {
				if (role === constants.ADMIN_ROLE || role === constants.MAINT_ROLE)
					meta.set(key, value);
			}

            setOrderConfirmed(order) {
                confirmedOrder.next(order);
            }

            clearCart() {
                cartItems.next([]);
                cartTerms.next(false);
                cartPaymentTerms.next(false);
                cartPrivacyTerms.next(false);
                cartMessagesTerms.next(false);
                cartActiveTab.next('review');
                cartTotals.next({});
                cartUpdated.next(false);
                orderDetails.next(null);
            }
        }

        this.broker = new CartBroker();
    }
}

export let cartBroker = new CartBroker();