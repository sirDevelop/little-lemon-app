const mongoose = require('mongoose')
const menuOptionsSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please fill the title field'],
	},
	imageURL: {
		type: String,
		required: [true, 'Please fill the imageURL field'],
	},
	price: {
		type: Number,
		required: [true, 'Please fill the price field'],
	},
	description: {
		type: String,
		required: [true, 'Please fill the description field']
	},
    available: {
        type: Boolean,
		default: true,
        required: [true, 'Please fill the available field'],
    }
}, { timestamps: true })
module.exports = mongoose.model('MenuOptions', menuOptionsSchema)