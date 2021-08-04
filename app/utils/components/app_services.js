import React, {useState, useEffect} from 'react';
import { serviceRegistry } from '../../services';
import constants from '../../config/app_constants';


/**
 * This HOC is used to preload dataBrokers and services.
 * Fetch data if needed prior to appload. We may want to offload this work
 * to a Graphql call when setting up the backend
 */
export default ({children}) => {
	const [isReady, setIsReady] = useState(false);
	useEffect(() => {
		const categoryService = serviceRegistry.service.getService(constants.CATEGORY_SERVICE);
		const productService = serviceRegistry.service.getService(constants.PRODUCT_SERVICE);
		const attributeService = serviceRegistry.service.getService(constants.ATTRIBUTE_SERVICE);
		const vendorService = serviceRegistry.service.getService(constants.VENDER_SERVICE);
		// loaders
		categoryService.getCategories();
		productService.getProducts();
		attributeService.getAttributes();

		// check that all hooks have been loaded
		setIsReady(true);
	}, []);
	return (
		<>{isReady && children}</>
	)
}