var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user){
		res.render('login',{ title: 'Iniciar Sesión' });
	} else {
		res.render('dashboard', { title: 'Dashboard', layout: 'dashboard_layout' });
	}
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Create an Account' });
});

router.get('/dashboard', function(req, res, next) {
	if(!req.user){
		req.flash('error','No ha iniciado sesión!');
		res.render('login',{ title: 'Iniciar Sesión' });
	} else {
		res.render('dashboard', { title: 'Dashboard', layout: 'dashboard_layout' });
	}
});

router.post('/register', function(req, res, next){
	var name     	    = req.body.name;
	var email    		= req.body.email;
	var username 		= req.body.username;
	var password 		= req.body.password;
	var password2 		= req.body.password2;

	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email must be a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors: errors
		});
	} else {
		passport.authenticate('local-register',{
			successRedirect: '/dashboard',
			failureRedirect: '/',
			failureFlash: true
		})(req, res, next)
	}
});

router.post('/login', function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;

	passport.authenticate('local-login', {
		successRedirect:'/dashboard',
		failureRedirect: '/',
		failureFlash: true
	})(req, res, next);
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Ha cerrado sesión de manera exitosa!');
	res.redirect('/');
});

router.get('/about', function(req, res){
	res.render('about', {
		title: 'About',
		layout: 'dashboard_layout'
	});
});

module.exports = router;
