import {
    BehaviorSubject,
} from 'rxjs';

import { Product } from './models';

class ProductBroker {
    constructor() {
        this.broker = null;
    }

    createClass() {
        if (this.broker)
            return;

        const products = new BehaviorSubject([]);
        const selectedProduct = new BehaviorSubject(null);

        class ProductBroker {
            constructor() {
                this.$$products = products.asObservable();
                this.$$selectedProduct = selectedProduct.asObservable();
            }

            hasSelectedProduct() {
                return selectedProduct.value !== null
            }

            setProducts(data) {
                products.next(data.map(product => {                    
                    return new Product(product);
                }));
            }

            setSelectedProduct(product) {
                selectedProduct.next(product);
            }

            clearProducts() {
                products.next([]);
            }

            clearSelectedProduct() {
                selectedProduct.next(null);
            }
        }

        this.broker = new ProductBroker();
    }
}

export let productBroker = new ProductBroker();