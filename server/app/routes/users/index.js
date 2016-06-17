var express = require('express');
var router = express.Router();
var User = require('../../../db/_db').model('user');

(function(obj) {

	// NEED TO CHANGE: '/'is for ADMINS ONLY
	// obj.param('userId', function(req, res, next, value) {

	// });

	// obj.get('/', function(req, res, next) {

	// });

	obj.post('/', function(req, res, next) {
		User.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				password: req.body.password
			}
		})
		.spread(function(user, created) {
			if (!created) {
				var err = new Error('User already exists!');
				throw err;
			}
			res.json(user);
		})
		.catch(next);

	});

})(router);

module.exports = router;