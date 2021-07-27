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
        const selectedCategory = new BehaviorSubject(null);

        class CategoryBroker {
            constructor() {
                this.$$categories = categories.asObservable();
                this.$$selectedCategory = selectedCategory.asObservable();
            }

            setCategories(data) {
                categories.next(data.map(category => {                    
                    return new Category(category);
                }));
            }

            clearCategories() {
                this.categories.next([]);
            }

            setSelectedCategory(catId) {
                selectedCategory.next(catId);
            }

            clearSelectedCategory() {
                selectedCategory.next(null);
            }
        }

        this.broker = new CategoryBroker();
    }
}

export let categoryBroker = new CategoryBroker();