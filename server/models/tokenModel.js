const mongoose = require('mongoose')
const tokenSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true, ref: 'User'
	},
	// server side token - login token
	lt: {
		type: String,
		required: [true, 'Please fill the field'],
		unique: true
	},
	// client side token
	cs: {
		type: String,
		required: [true, 'Please fill the field'],
		unique: true
	},
	active: {
		type: Boolean,
		default: true
	}
}, { timestamps: true })
module.exports = mongoose.model('Token', tokenSchema)