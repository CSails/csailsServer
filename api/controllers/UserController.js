/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt-nodejs');

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
				return res.json({err:'用户名已被注册'})
			}

			req.session.user = user;

			//TODO:登陆成功逻辑

			return res.json({
				result: '注册成功',
				user:user
			})
		})
	},
	/*
	 
	 * 用户登陆
	 * */
	login: function(req, res) {
		User.findOne({
			username: req.param('username')
		}, function(err, user) {
			if(err) {
				return res.serverError();
			}

			if(!user) {
				//没有找到用户
				return res.json({
					err: '没有找到用户'
				})
			}
			
			//验证用户密码匹配
			var match = bcrypt.compareSync(req.param('password'),user.password);
			
			if(match){
				//账号密码匹配成功,保存登陆状态,返回登陆信息
				req.session.user = user;
				return res.json({
					result:'登陆成功',
					user:user
				})
			}else{
				//密码错误
				return res.json({
					err:'密码错误'
				})
			}

		})
	}

};