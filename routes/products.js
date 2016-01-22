var express = require('express');
var router = express.Router();

Product = require('../models/product.js');

// Displays all available products.
router.get('/', function(req, res, next) {
	if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	} 
	else {
		Product.getProducts(function(err, products){
		    if(err){
		      res.send(err);
		    }
		    else{
		      res.render('products', {
		      title: 'All Products',
		      layout: 'dashboard_layout',
		      products: products 
		      });
		    }

	  	});
	}
});

// Route to make a burrita order.
router.get('/burritas', function(req, res, next) {
 if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{
			title: 'Iniciar Sesión'
		});
	} 
	else {
		res.render('burritas',{
			title: 'Orden de Burritas',
			layout: 'dashboard_layout',
			user: req.user
		});
	}
});

// Route to make a pancake order.
router.get('/pancakes', function(req, res, next) {
 if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{
			title: 'Iniciar Sesión' 
		});
	} 
	else {
		res.send("<h1>Panqueques</h1>");
	}
});

// Route to add a new product.
router.get('/add', function(req, res, next){
	if(!req.user)
	{
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	}
	else{
		res.render('addProduct', {
			title: 'Add New Product',
			layout: 'dashboard_layout'
		});
	}
});

// Creates a new product.
router.post('/add', function(req, res, next){
	if(!req.user)
	{
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	}
	else{
		var product = new Product();
		product.name = req.body.name;
		product.price = req.body.price;
		product.details = req.body.details;

		Product.addProduct(product, function(err, product){
			if(err){
				res.send(err);
			}
			else{
				req.flash('success', 'Product Saved');
				res.redirect('/products');
			}
		});
	}
});

// Update a product.
router.post('/update/:id', function(req, res, next){
	if(!req.user)
	{
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	}
	else{
		var query = {_id: [req.params.id]};
		var product = new Product();
		var update = {name: req.body.name, price: req.body.price, details: req.body.details};

		Product.updateProduct(query, update, {}, function(err, product){
	    	if(err){
	    		res.send(err);
	    	}
	    	else{
	    		req.flash('success', 'Product updated!');
	    		res.redirect('/products');
	    	}
    	});
	}
});

// Displays information about a product and let's you update it.
router.get('/:id', function(req, res, next) {
 if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{
			title: 'Iniciar Sesión' 
		});
	} 
	else {
		Product.getProductById([req.params.id], function(err, product){
			if(err){
				res.send(err);
			}
			else{
				res.render('product', {
					title: 'All Products',
					layout: 'dashboard_layout',
					product:product
				});
			}
		});
	}
});

router.delete('/delete/:id', function(req, res){
	var query = {_id: req.params.id};
	Product.remove(query, function(err){
	if(err)
				res.send(err);
			else
			{
				res.status(204).send();
			}
	})
});

module.exports = router;