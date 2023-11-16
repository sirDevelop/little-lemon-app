const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'Please fill the name field'],
	},
	lastname: {
		type: String,
		required: [true, 'Please fill the name field'],
	},
	email: {
		type: String,
		required: [true, 'Please fill the email field']
	},
	avatar: {
		type: String,
	},
	background: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Please fill the password field']
	}
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)