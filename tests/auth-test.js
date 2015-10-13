var assert = require('assert'),
	service = require('../services/auth-local'),

	testUser = {
		name: 'test_user',
		email: 'test_email',
		password: 'test_psw',
		phone: 'test_phone'
	};

function signUpTest(done) {
	service.createUser(testUser.name, testUser.email, testUser.password,
		testUser.phone, done);
}

describe('Local auth routine full circle tests', function() {
	before(function() {
		console.log('TODO: delete test local user');
	});

	it('[SignUp] Should create a new local user', function(done) {
		signUpTest(function(err, user) {
			assert.equal(err, null);
			assert.notEqual(user, null);
			assert.equal(user.email, testUser.email);
			assert.equal(user.name, testUser.name);
			assert.equal(user.phone, testUser.phone);
			assert.notEqual(user.verified_flag, 1);
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
		service.getUser(testUser.email, testUser.password, function(err, user) {
			assert.equal(err, null);
			assert.notEqual(user, null);
			assert.equal(user.email, testUser.email);
			assert.equal(user.name, testUser.name);
			assert.equal(user.phone, testUser.phone);
			done();
		});
	});
});