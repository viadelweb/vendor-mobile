import constants from '../config/app_constants';
import { serviceRegistry } from './service_registry';
import { categoryService } from './category_service';
import { productService } from './product_service';
import { cartService } from './cart_service';
import { attributeService } from './attribute_service';

serviceRegistry.createClass();
categoryService.createClass();
productService.createClass();
cartService.createClass();
attributeService.createClass();

serviceRegistry.service.registerServices(new Map([
	[constants.CATEGORY_SERVICE, categoryService.service],
	[constants.PRODUCT_SERVICE, productService.service],
	[constants.CART_SERVICE, cartService.service],
	[constants.ATTRIBUTE_SERVICE, attributeService.service]
]));

console.log('listServices: ', serviceRegistry.service.listServices());

export { serviceRegistry }