import {
    BehaviorSubject,
} from 'rxjs';

import { Category } from './models';

class CategoryBroker {
    constructor() {
        this.broker = null;
    }

    createClass() {
        if (this.broker)
            return;

        const categories = new BehaviorSubject([]);

        class CategoryBroker {
            constructor() {
                this.$$categories = categories.asObservable();
            }

            setCategories(data) {
                categories.next(data.map(category => {                    
                    return new Category(category);
                }));
            }

            clearCategories() {
                this.categories.next([]);
            }
        }

        this.broker = new CategoryBroker();
    }
}

export let categoryBroker = new CategoryBroker();