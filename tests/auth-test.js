// Set up test environment
process.env.NODE_ENV = 'test';

var assert = require('assert'),
	service = require('../services/auth-local'),

	testUser = {
		name: 'test_user',
		email: 'test_email',
		password: 'test_psw',
		phone: 'test_phone'
	},
	testToken;

function signUpTest(done) {
	service.createUser(testUser.name, testUser.email, testUser.password,
		testUser.phone, done);
}

describe('Local auth routine full circle tests', function() {
	before(function() {
		console.log('TODO: delete test local user');
	});

	it('[SignUp] Should create a new not verified local user', function(done) {
		signUpTest(function(err, user) {
			assert.equal(err, null);
			assert.notEqual(user, null);
			assert.equal(user.email, testUser.email);
			assert.equal(user.name, testUser.name);
			assert.equal(user.phone, testUser.phone);
			assert.notEqual(user.verified_flag, 1);

			testUser.id = user.id;

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

	it('[Verify] Should send email to user with verification link', function(done) {
		var protocol = 'http',
			hostname = 'test';
		service.verifyStart(testUser, protocol, hostname, function(err, token, info) {
			assert.equal(err, null);
			assert.notEqual(token, null);
			assert.notEqual(info, null);

			testToken = token;

			done();
		});
	});

	it('[Verify] Should mark user as verified', function(done) {
		service.verifyEnd(testUser.id, testToken, function(err, user) {
			assert.equal(err, null);
			assert.notEqual(user, null);
			assert.equal(user.id, testUser.id);
			assert.equal(user.email, testUser.email);
			assert.equal(user.name, testUser.name);
			assert.equal(user.phone, testUser.phone);
			assert.equal(user.verified_flag, 1);

			done();
		});
	});
});