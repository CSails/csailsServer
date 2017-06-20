/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		username: {
			type: 'string'
		},
		password: {
			type: 'string'
		},
	},
	
	beforeCreate: function(values, cb) {

		// Hash password
		bcrypt.hash(values.password, 10, function(err, hash) {
			if(err) return cb(err);
			values.password = hash;
			
			cb();
		});
	}
};