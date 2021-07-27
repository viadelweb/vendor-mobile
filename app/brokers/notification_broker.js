import {
    BehaviorSubject,
} from 'rxjs';

import constants from '../config/app_constants';

class NotificationBroker {
    constructor() {
        this.broker = null;
    }

    createClass() {
        if (this.broker)
            return;
                
        const defaultConent = {content: null, type: constants.NOTIFICATION.INFO};

        const visible = new BehaviorSubject(false);
        const content = new BehaviorSubject();

        const _clearContent = () => {
            content.next(defaultConent);
        }

        class NotificationBroker {
            constructor() {
                this.$$visible = visible.asObservable();
                this.$$content = content.asObservable();
            }

            setContent(notificationContent, type) {
                type = !type ? constants.NOTIFICATION.INFO : type;
                content.next({
                    content: notificationContent,
                    type: type
                });
            }
            
            /**
             * Display the notification
             * @param {Number} timeout if set autoclose the notification after provided time
             */
			showNotification(timeout) {
                visible.next(true);
                if (timeout && timeout > 0)
                    setTimeout(() => this.close(), timeout);
			}
            
            async close() {
                _clearContent();
                visible.next(false);
            }
        }

        this.broker = new NotificationBroker();
    }
}

export let notificationBroker = new NotificationBroker();