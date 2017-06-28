/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

module.exports = {
	test:function(req,res){
		return res.view('test/welcome')
	}

};