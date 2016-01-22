var mongoose = require('mongoose');

var orderScema = mongoose.Schema({
	amount: {
		type: String
	},
	details: {
		type: Number
	},
	product_id: {
		type: String
	},
	user_id: {
		type: String
	},
	user: {
		type: String
	},
	email: {
		type: String
	},
	details: {
		type: String
	},
	updated_at: {
		type: Date,
		default: new Date()
	}
});

var Order = module.exports = mongoose.model('Order', orderScema);

// Get all orders
module.exports.getOrders = function(query, callback, limit){
	Order.find(query, callback).limit(limit);
}

// Get order by id
module.exports.getOrderById = function(id, callback){
	Order.findById(id, callback);
}

// Create order
module.exports.addOrder = function(order, callback){
	Order.create(order, callback);
}

// Update Order
module.exports.updateOrder = function(query, update, options, callback){
	Order.findOneAndUpdate(query, update, options, callback);
}