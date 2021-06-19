const mongoose = require('mongoose');
const { isEmail } = require('validator');

// User Schema Codes Here
// There are two types of users
// default users or normal users, and administrators.
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: [isEmail, 'invalid email']
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: 0
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;