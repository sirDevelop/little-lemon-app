const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
	menuId: {
        type: String,
        required: [true, 'Please fill the available field'],
    },
	customerId: {
        type: String,
        required: [true, 'Please fill the available field'],
    },
    name: {
		type: String,
		required: [true, 'Please fill the title field'],
	},
    quantity: {
		type: Number,
		required: [true, 'Please fill the title field'],
	},
    phoneNumber: {
		type: Number,
		required: [true, 'Please fill the title field'],
	},
}, { timestamps: true })
module.exports = mongoose.model('order', orderSchema)