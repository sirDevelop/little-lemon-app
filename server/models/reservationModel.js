// // https://mongoosejs.com/docs/schematypes.html
// const mongoose = require('mongoose')
// const userSchema = mongoose.Schema({
// 	guestId: {
// 		type: String,
// 		unique: true,
// 	},
// 	date: {
// 		type: String,
// 		required: [true, 'Please tell us the date of your booking'],
// 	},
// 	time: {
// 		type: String,
// 		required: [true, 'Please tell us the time slot of your booking'],
// 	},
// 	partySize: {
// 		type: String,
// 		required: [true, 'Please tell us your party size'],
// 	},
// 	phoneNumber: {
// 		type: Number,
// 		required: [true, 'Please tell us your phone number for contact']
// 	},
// 	name: {
// 		type: String,
// 		required: [true, 'Please fill the name field']
// 	},
// }, { timestamps: true })
// module.exports = mongoose.model('Reservation', userSchema)

const mongoose = require('mongoose')
const reservationSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please fill the name field'],
	},
	phone: {
		type: Number,
		required: [true, 'Please fill the name field'],
	},
	partySize: {
		type: Number,
		required: [true, 'Please fill the name field'],
	},
	guestId: {
		type: String,
		required: [true, 'Please fill the name field'],
		unique: true
	},
	reservationTime: {
		type: Date,
		required: [true, 'Please fill the name field'],
	}
}, { timestamps: true })
module.exports = mongoose.model('Reservation', reservationSchema)