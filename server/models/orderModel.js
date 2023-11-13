const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	cart: {
		// will be object converted to a string with JSON.stringify
		type: String,
		required: [true, 'Please fill the cartd field'],
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		required: [true, 'Please fill the name field'],
	},
	phoneNumber: {
		type: Number,
		required: [true, 'Please fill the phoneNumber field'],
	},
	date: {
		type: Date,
		default: Date.now,
		required: [true, 'Please fill the date field'],
	},
}, { timestamps: true })
module.exports = mongoose.model('order', orderSchema)