export default {
	APP_FORM_EFFECTS: 'AppFormEffects',
	APP_HOOK_EFFECTS: 'AppHookEffects',

	ATTRIBUTE_BROKER: 'AttributeBroker',
	ATTRIBUTE_SERVICE: 'AttributeService',
	ATTRIBUTE_OBSERVABLE: '$$attributes',
	ATTRIBUTES_LIST_OBSERVABLE: '$$attributesList',
	ATTRIBUTE_SERVICE_GET_METHOD: 'getAttributes',
	
	CATEGORY_BROKER: 'CategoryBroker',
	CATEGORIES_OBSERVABLE: '$$categories',
	CATEGORY_SELECTED_OBSERVABLE: '$$selectedCategory',
	CATEGORY_SERVICE: 'CategoryService',
	CATEGORY_SERVICE_GET_METHOD: 'getCategories',
	CATEGORY_LIST: 'categoryList',

	COMPANY_BROKER: 'CompanyBroker',
	COMPANY_OBSERVABLE: '$$company',
	COMPANY_SERVICE: 'CompanyService',
	COMPANY_SERVICE_GET_METHOD: 'getCompany',
	COMPANY_SERVICE_UPDATE_METHOD: 'updateCompany',

	PRODUCT_BROKER: 'ProductBroker',
	PRODUCTS_OBSERVABLE: '$$products',
	PRODUCTS_SELECTED_PRODUCT_OBSERVABLE: '$$selectedProduct',
	PRODUCT_SERVICE: 'ProductService',
	PRODUCT_SERVICE_GET_METHOD: 'getProducts',
	PRODUCT_LIST: 'productList',

	CART_BROKER: 'CartBroker',
	CART_SERVICE: 'CartService',
	CART_SERVICE_UPDATE_CART_METHOD: 'updateCart',
	CART_SERVICE_ORDER_CONFIRMED_METHOD: 'orderConfirmed',
	CART_SERVICE_CANCEL_ORDER_METHOD: 'cancelOrder',
	CART_ITEMS_OBSERVABLE: '$$cartItems',
	CART_TERMS_OBSERVABLE: '$$cartTerms',
	CART_PAYMENT_TERMS_OBSERVABLE: '$$cartPaymentTerms',
	CART_PRIVACY_TERMS_OBSERVABLE: '$$cartPrivacyTerms',
	CART_MESSAGES_TERMS_OBSERVABLE: '$$cartMessagesTerems',
	CART_ACTIVE_TAB_OBSERVABLE: '$$cartActiveTab',
	CART_UPDATED_OBSERVABLE: '$$cartUpdated',
	COMFIRMED_ORDER_OBSERVABLE: '$$confirmedOrder',
	ORDER_DETAILS_OBSERVABLE: '$$orderDetails',
	ACCEPTED_TERMS: 'acceptedTerms',
	ACCEPTED_PAYMENT: 'acceptedPayment',
	ACCEPTED_PRIVACY: 'acceptedPrivacy',
	ACCEPTED_MESSAGES: 'acceptedMessages',
	ACCEPTED_PROMO: 'acceptedPromo',
	
	USER_BROKER: 'UserBroker',
	USER_SERVICE: 'UserService',
	USER_SERVICE_CREATE_METHOD: 'createUser',
	USER_SERVICE_GET_METHOD: 'getUser',
	USER_SERVICE_ORDERS_GET_METHOD: 'getUserOrders',
	USER_OBSERVABLE: '$$currentUser',
	USER_MESSAGE_TERMS_OBSERVABLE: '$$userMessageTerms',
	USER_PROMO_TERMS_OBSERVABLE: '$$userPromoTerms',

	NOTIFICATION_BROKER: 'NotificationBroker',
	NOTIFICATION_VISIBLE_OBSERVABLE: '$$visible',
	NOTIFICATION_CONTENT_OBSERVABLE: '$$content',

	LOCATION_BROKER: 'LocationBroker',
	CURRENT_LOCATION_OBSERVABLE: '$$currentLocation',
	VENDER_SERVICE: 'VendorService',

	USER_ROLE: 'user',
	ADMIN_ROLE: 'admin',
	VENDOR_ROLE: 'admin',
	MAINT_ROLE: 'maint',
	INCLUDES_KEY: 'includesKey',
	ADDITIONAL_ITEMS_KEY: 'additionalItemsKey',
	NOTIFICATION: {
		INFO: 'info',
		WARNING: 'warning',
		ERROR: 'error',
		SUCCESS: 'success'
	},
	META: {
		MIN_ITEM_QUANTITY: 0,
		MAX_ITEM_QUANTITY: 30
	}
}