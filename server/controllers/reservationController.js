const asyncHandler = require('express-async-handler')
const Reservation = require('../models/reservationModel')
const check = asyncHandler(async (req, res) => {
	try {
		const { reservationDate } = req.body
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 1, reservationTime: new Date(reservationDate + " 10:00:00") })
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 2, reservationTime: new Date(reservationDate + " 10:00:00") })
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 3, reservationTime: new Date(reservationDate + " 10:00:00") })
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 5, guestId: 5, reservationTime: new Date(reservationDate + " 13:00:00") })
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 8, guestId: 6, reservationTime: new Date(reservationDate + " 14:00:00") })
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 22, guestId: 7, reservationTime: new Date(reservationDate + " 15:00:00") })
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 3, guestId: 8, reservationTime: new Date(reservationDate + " 16:00:00") })
		// await Reservation.create({ name: "test", phone: 123456789, partySize: 7, guestId: 9, reservationTime: new Date(reservationDate + " 17:00:00") })
		// const Reserved = await Reservation.find({ reservationDate })
		//date_time: 11/30 10 AM, availableSeat: 48
		
		//partySize from client side - 7

		// we want all time slots partySize >= 7

		//whole day will have 18 time slots
		
		//2
		
		//date_time: 11/30 10:00 AM, partySize: 46
		//date_time: 11/30 10:30 AM, partySize: 46
		//date_time: 11/30 11:00 AM, partySize: 46
		//date_time: 11/30 7:00 PM, partySize: 15
		
		const requestedPartySize = 1; //from the front end 7

		const partySize = 48
		const Reserved = await Reservation.find({"name" : "test"});
		const getTimeForCheck = (starter, ender, gap) => {
			// getTimeForCheck([H,M],[H,M],[H,M])
			// getTimeForCheck([10,0],[19,0], [0,30])
			let options = []
			const start = new Date(
				`${reservationDate} ${starter[0]}:${starter[1]}:00`
			)
			const end = new Date(`${reservationDate} ${ender[0]}:${ender[1]}:00`)
			while (start <= end) {
					options = [...options,
						{hours: start.getHours(), minutes: start.getMinutes(), partySize}
					]
					start.setHours(
						start.getHours() + gap[0],
						start.getMinutes() + gap[1]
					)
				}
			return options
		}
		
		let checkArray = getTimeForCheck([10,0],[19,0],[0,30])
		let available = [];
	
		Reserved.map((val,i) => {
			// all documents returned should have a time that we can show
			checkArray.filter((vals) => 
				{
					console.log("val.hours", vals.hours, " ------ val.reservationTime", new Date(val.reservationTime).getHours())
					return vals.hours === new Date(val.reservationTime).getHours()
				}
			).map((_, i) => {
				checkArray[i].partySize -= val.partySize
				available.push(checkArray[i])
			})
		})

		const partySizeRequestedFromFrontEnd = 5

		let reservationTimes = checkArray.filter((val) => val.partySize>partySizeRequestedFromFrontEnd)

		// console.log(checkArray)
		// const Reserved = await Reservation.find({name: "test"});
		
		// {createdAt:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}}
		// ({ $or: [{ $gte : new ISODate("2012-01-12T10:00AM") },{ $gte : new ISODate("2012-01-12T7:00PM") }] })

		//in mongo: document.find({date_time: ___}) - S
		
		// let PartySizeSum = 0
		// Reserved.map((val) => { PartySizeSum += val.partySize })
		// console.log(Reserved)
		res.status(200).json({
			reservationTimes
		})
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})
module.exports = { check }