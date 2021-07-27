export function formatPrice(price, symbol) {
	if (!price)
		return;

	const segments = price.toString().split('.');
	if (!segments[1]) {
		price = price + '.00';
	} else if (segments[1].toString().length === 1) {
		price = price + '0'
	}
	return symbol + price;
}

export function validEmail(email) {
	return (/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i).test(email);
}

export function formatPhone(phone) {
	if (phone.length === 10) 
		phone = phone.replace(/\D+/g, '')
					.replace(/(\d{3})(\d{3})(\d{4})/, '+1 ($1) $2-$3');
	return phone;
}

/**
 * Find the property at the provided path with the object
 * @param {Object} item 
 * @param {Array<String>} parts nested property path
 * @returns filtered set of results
 */
function _dig(item, parts) {
	if (parts.length === 1 && item[parts[0]]) {
		return item[parts[0]];
	}
	else {
		if (Array.isArray(item[parts[0]])) {
			return item[parts[0]].reduce((arr, i) => {
				arr.push(_dig(i, parts.slice(1)));
				return arr;
			}, []);
		}
		else
			return _dig(item[parts[0]], parts.slice(1));
	}
}

/**
 * Given an array of objects, return the object that match the given filter
 * @param {Array<Object>} items Array of objects to search
 * @param {Object{key:<String>, filter:<any>}} filter Accepts string in dot syntax for nested properties "a.b.c" or "a" for non-nested. 
 * @returns 
 */
export function filterBy(items, {key, filter}) {
	if (!filter || !key || items.length === 0)
		return items;

	if (key.indexOf('.') >= 0) {
		const parts = key.split('.');
		return items.reduce((arr, item) => {
			let nodes = _dig(item, parts);
			if (nodes.indexOf(filter) >= 0)
				arr.push(item);
			return arr;
		}, []);
	} else {
		return items.filter(i => {
			if (filter === i[key]) {
				return i;
			}
		});
	}
}