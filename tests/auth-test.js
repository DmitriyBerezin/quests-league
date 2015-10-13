var assert = require('assert'),
	service = require('../services/auth-local'),

	user = {
		name: 'test_user',
		email: 'test_email',
		password: 'test_psw',
		phone: 'test_phone'
	};

function signUpTest(done) {
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

	it('[SignIn] Should get a local user', function(done) {
		service.getUser(user.email, user.password, function(err, u) {
			assert.equal(err, null);
			assert.notEqual(u, null);
			assert.equal(user.email, u.email);
			assert.equal(user.name, u.name);
			assert.equal(user.phone, u.phone);
			done();
		});
	});
});