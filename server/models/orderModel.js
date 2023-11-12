const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	cart: {
		// will be object converted to a string with JSON.stringify
		type: String,
		required: [true, 'Please fill the available field'],
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		required: [true, 'Please fill the title field'],
	},
	phoneNumber: {
		type: Number,
		required: [true, 'Please fill the title field'],
	},
}, { timestamps: true })
module.exports = mongoose.model('order', orderSchema)