var assert = require('assert'),
	service = require('../services/auth-local');

function signUpTest(done) {
	var user = {
		name: 'test_user',
		email: 'test_email',
		password: 'test_psw',
		phone: 'test_phone'
	};

	service.createUser(user.name, user.email, user.password, user.phone, done);
}

describe('Local auth routine full circle tests', function() {
	before(function() {
		console.log('TODO: delete test local user');
	});

	it('[SignUp] Should create a new local user', function(done) {
		signUpTest(function(err) {
			assert.equal(err, null);
			done();
		});
	});

	it('[SignUp] Should\'t create a local user with the same email', function(done) {
		signUpTest(function(err) {
			assert.equal(err.errno, 1062);
			done();
		});
	});
});