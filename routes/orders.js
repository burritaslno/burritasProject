var express = require('express');
var router = express.Router();

Order = require('../models/order.js');
Product = require('../models/product.js');

// Displays all available orders.
router.get('/', function(req, res, next) {
	if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	} 
	else if(req.user.username != 'jpaz') {
		req.flash('error', 'No es un administrador');
		res.render('dashboard', {
			title: 'Dashboard',
			layout: 'dashboard_layout'
		});
	}
	else{
		Order.getOrders(function(err, orders){
		    if(err){
		      res.send(err);
		    }
		    else{
		      res.render('orders', {
		      title: 'Ordenes',
		      layout: 'dashboard_layout',
		      orders: orders 
		      });
		    }

	  	});
	}
});

// Create new order.
router.get('/add', function(req, res, next){
	if(!req.user){
		req.flash('error', 'No ha iniciado sesión!');
		res.render('login', {
			title: 'Iniciar Sesión'
		});
	}
	else{
		Product.getProducts(function(err, products){
			if(err){
				res.send(err);
			}
			else{
				res.render('addOrder', {
				title: 'Nueva Orden',
				products: products,
				layout: 'dashboard_layout'
		});
			}
		});
		
	}
});

router.post('/add', function(req, res, next){
	if(!req.user){
		req.flash('error', 'No ha iniciado sesión!');
		res.render('login', {
			title: 'Iniciar Sesión'
		});
	}
	else{
		var order = new Order();
		order.amount = req.body.amount;
		order.details = req.body.details;
		order.product_id = req.body.product;
		order.user_id = req.user._id;
		order.user = req.user.username;
		order.email = req.user.email;

		Order.addOrder(order, function(err, order){
			if(err){
				res.send(err);
			}
			else{
				req.flash('success', 'Product updated!');
				res.redirect('/orders');
			}
		});
	}
});

// Show information about an order.
router.get('/:id', function(req, res, next) {
 if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{
			title: 'Iniciar Sesión' 
		});
	} 
	else {
		Product.getProducts(function(err, products){
			if(err){
				res.send(err);
			}
			else{
				Order.getOrderById([req.params.id], function(err, order){
					if(err){
						res.send(err);
					}
					else{
						res.render('order', {
							title: 'Orden-' + order._id,
							order: order,
							products: products,
							layout:'dashboard_layout'
						});
					}
				});
			}
		});
	}
});

router.post('/update/:id', function(req, res, next){
	if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{
			title: 'Iniciar Sesión' 
		});
	}
	else if(req.user.username != 'jpaz')
	{
		req.flash('error', 'No tiene permisos de administrador!');
		res.redirect('/dashboard');
	}
	else{
		var order = new Order();
		var query = {_id: [req.params.id]};
		var update = {
			product_id: req.body.product, 
			amount: req.body.amount,
			details: req.body.details
		};

		Order.updateOrder(query, update, {}, function(err, order){
			if(err){
				res.send(err);
			}
			else{
				req.flash('success', 'Order has been updated succesfully!');
				res.redirect('/orders');
			}
		});
	}
});

router.delete('/delete/:id', function(req, res){
	var query = {_id: req.params.id};
	Order.remove(query, function(err){
	if(err)
				res.send(err);
			else
			{
				res.status(204).send();
			}
	})
});
module.exports = router;