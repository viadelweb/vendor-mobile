import Type from './type';
import Attribute from './attribute';
import Category from './category';

export default class Product {
	constructor(product) {
		this.id = product.id;
		this.categories = product.categories.map(cat => new Category(cat));
		this.company_id = product.company_id;
		this.types = product.types.map(type => new Type(type));
		this.title = product.title;
		this.description = product.description;
		this.uri = product.uri;
		this.price = product.price;
		this.attributes = product.attributes.map(attr => new Attribute(attr));
	}
}