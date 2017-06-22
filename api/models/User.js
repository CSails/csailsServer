/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

	attributes: {
		username: {
			type: 'string',
			unique: true
			
		},
		password: {
			type: 'string'
		},
	},

	/*
	 *
	 创建用户
	 */

	signup: function(inputs, cb) {
       User.create({
       	username:inputs.username,
       	password:inputs.password
       }).exec(cb)
	},
      
    /*
     创建用户前哈希用户密码
     * */
	beforeCreate: function(values, cb) {

		// Hash password
		bcrypt.hash(values.password, null,null, function(err, hash) {
			if(err) return cb(err);
			values.password = hash;

			cb();
		});
	}
};