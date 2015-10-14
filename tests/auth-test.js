// Set up test environment
process.env.NODE_ENV = 'test';

var assert = require('assert'),
	service = require('../services/auth-local'),

	testUser = {
		name: 'test_user',
		email: 'test_email',
		password: 'test_psw',
		phone: 'test_phone',
		newPassword: 'new_psw'
	},
	passwordHash,
	verifyToken,
	resetToken;

function signUpTest(done) {
	service.createUser(testUser.name, testUser.email, testUser.password,
		testUser.phone, done);
}

function changePasswordTest(oldPassword, done) {
	service.changePassword(testUser.id, passwordHash, oldPassword,
		testUser.newPassword, done);
}

describe('Local auth routine full circle tests', function() {
	describe('[SignUp] Create new local user routine', function() {
		it('Should create a new not verified local user', function(done) {
			signUpTest(function(err, user) {
				assert.equal(err, null);
				assert.notEqual(user, null);
				assert.equal(user.email, testUser.email);
				assert.equal(user.name, testUser.name);
				assert.equal(user.phone, testUser.phone);
				assert.notEqual(user.verified_flag, 1);

				testUser.id = user.id;
				passwordHash = user.password;

				done();
			});
		});

		it('Should\'t create a local user with the same email', function(done) {
			signUpTest(function(err) {
				assert.equal(err.errno, 1062);

				done();
			});
		});
	});

	describe('[SignIn] Get a local user', function() {
		it('Should get a local user', function(done) {
			service.getUser(testUser.email, testUser.password, function(err, user) {
				assert.equal(err, null);
				assert.notEqual(user, null);
				assert.equal(user.id, testUser.id);
				assert.equal(user.email, testUser.email);
				assert.equal(user.name, testUser.name);
				assert.equal(user.phone, testUser.phone);

				done();
			});
		});
	});

	describe('[Verify] Verify user routine', function() {
		it('Should send email to user with verification link', function(done) {
			var protocol = 'http',
				hostname = 'test';
			service.verifyStart(testUser, protocol, hostname, function(err, token, info) {
				assert.equal(err, null);
				assert.notEqual(token, null);
				assert.notEqual(info, null);

				verifyToken = token;

				done();
			});
		});

		it('Should not verify user by wrong token', function(done) {
			service.verifyEnd(testUser.id, 'wrong_token', function(err, user) {
				assert.notEqual(err, null);
				assert.equal(err.status, 400);

				done();
			});
		});

		it('Should mark user as verified', function(done) {
			service.verifyEnd(testUser.id, verifyToken, function(err, user) {
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

	describe('[Password] Change password routine', function() {
		it('Should verify current password', function(done) {
			changePasswordTest('wrong_psw', function(err) {
				assert.notEqual(err, null);
				assert.equal(err.status, 400);

				done();
			});
		});

		it('Should change user password', function(done) {
			changePasswordTest(testUser.password, function(err, password) {
				assert.equal(err, null);

				done();
			});
		});

		it('Should authenticate user using new password', function(done) {
			service.getUser(testUser.email, testUser.newPassword, function(err, user) {
				assert.equal(err, null);
				assert.notEqual(user, null);
				assert.equal(user.id, testUser.id);
				assert.equal(user.email, testUser.email);
				assert.equal(user.name, testUser.name);
				assert.equal(user.phone, testUser.phone);

				done();
			});
		});
	});

	describe('[Password] Reset password routine', function() {
		it('Should send mail with token', function(done) {
			var protocol = 'http',
				hostname = 'test';

			service.forgotPasswordMail(testUser.email, protocol, hostname,
				function(err, token, info) {
					assert.equal(err, null);
					assert.notEqual(token, null);
					assert.notEqual(info, null);

					resetToken = token;

					done();
				}
			);
		});

		it('Should not reset password by wrong token', function(done) {
			service.resetPassword('wrong_token', testUser.password, function(err) {
				assert.notEqual(err, null);
				assert.equal(err.status, 500);

				done();
			});
		});

		it('Should reset password', function(done) {
			service.resetPassword(resetToken, testUser.password, function(err) {
				assert.equal(err, null);

				done();
			});
		});

		it('Should authenticate user using reseted password', function(done) {
			service.getUser(testUser.email, testUser.password, function(err, user) {
				assert.equal(err, null);
				assert.notEqual(user, null);
				assert.equal(user.id, testUser.id);
				assert.equal(user.email, testUser.email);
				assert.equal(user.name, testUser.name);
				assert.equal(user.phone, testUser.phone);

				done();
			});
		});
	});


	after(function(done) {
		service.removeUser(testUser.id, function(err) {
			assert.equal(err, null);

			done();
		});
	});
});