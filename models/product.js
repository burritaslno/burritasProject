var mongoose = require('mongoose');

var productScema = mongoose.Schema({
	name: {
		type: String
	},
	price: {
		type: Number
	},
	details: {
		type: String
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

var Product = module.exports = mongoose.model('Product', productScema);

// Get all products
module.exports.getProducts = function(query, callback, limit){
	Product.find(query, callback).limit(limit);
}

// Get product by id
module.exports.getProductById = function(id, callback){
	Product.findById(id, callback);
}

// Create product
module.exports.addProduct = function(product, callback){
	Product.create(product, callback);
}

// Update Product
module.exports.updateProduct = function(query, update, options, callback){
	Product.findOneAndUpdate(query, update, options, callback);
}