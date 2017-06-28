/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

module.exports = {
	/*
	 * 用户注册
	 * */
	signup: function(req, res) {
		User.signup({
			username: req.param('username'),
			password: req.param('password')
		}, function(err, user) {
			if(err) {
				//账号唯一报错
				return res.json({
					err: '用户名已被注册'
				})
			}

			req.session.user = user;

			//TODO:登陆成功逻辑

			return res.json({
				result: '注册成功',
				user: user
			})
		})
	},
	/*
	 
	 * 用户登陆
	 * */
	login: function(req, res) {

		passport.authenticate('local', function(err, user, info) {
			if((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}
			req.logIn(user, function(err) {
				if(err) res.send(err);
				return res.send({
					message: info.message,
					user: user
				});
			});

		})(req, res);
	}

};