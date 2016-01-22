var express = require('express');
var router = express.Router();

Order = require('../models/order.js');

/* GET users. */
router.get('/', function(req, res, next) {
 if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	} else {
		res.send("<h1>Users route!</h1>");
	}
});

router.get('/orders', function(req, res, next) {
 if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	} else {
		Order.getOrders({user_id: req.user._id}, function(err, orders){
			if(err){
				res.send(err);
			}
			else{
				res.render('userOrders', {
				title: 'Sus ordenes',
				layout: 'dashboard_layout',
				orders: orders
		});
			}
		});
	}
});

module.exports = router;