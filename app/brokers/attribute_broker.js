import {
    BehaviorSubject,
} from 'rxjs';

import constants from '../config/app_constants';
import { Attribute } from './models';

class AttributeBroker {
    constructor() {
        this.broker = null;
    }

    createClass() {
        if (this.broker)
            return;

        const attributes = new BehaviorSubject([]);
        const attributesList = new BehaviorSubject({});

        class AttributeBroker {
            constructor() {
                this.$$attributes = attributes.asObservable();
                this.$$attributesList = attributesList.asObservable();
            }

            setAttributes(data) {
                attributes.next(data.map(attr => {                    
                    return new Attribute(attr);
                }));
            }

            setAttributesList(data) {
                const mappedData = {};
                data.forEach((collection, i) => {
                    mappedData[i] = {};
                    mappedData[i].items = collection.items.reduce((arr, item) => {
                            const node = {...item};
                            node.collection = collection.title,
                            node.extra = false;
                            node.active = collection.title.indexOf('Includes') >= 0;
                            arr.push(node);
                            return arr;
                        }, [])
                });

                attributesList.next(mappedData);
            }

            changeActiveState(active, attr) {                
                const data = {...attributesList.value};
                for (const i in data) {
                    data[i].items.map(item => {
                        if (attr.id === item.id) {
                            item.active = active;
                            return
                        }
                    })

                }
                attributesList.next(data);
            }

            changeExtraState(active, attr) {
                const data = {...attributesList.value};
                for (const i in data) {
                    data[i].items.map(item => {
                        if (attr.id === item.id) {
                            if (active && !item.active)
                                item.active = active                          
                            item.extra = active;
                            return
                        }
                    })

                }
                attributesList.next(data);
            }

        }

        this.broker = new AttributeBroker();
    }
}

export let attributeBroker = new AttributeBroker();