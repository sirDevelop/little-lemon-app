const asyncHandler = require('express-async-handler')
const Reservation = require('../models/reservationModel')
const getTime = asyncHandler(async (req, res) => {
	try {
		const { reservationDate, partySize } = req.body

		if (reservationDate) {
			let times = []
			const maxPartySize = 48
			const start = new Date(`${reservationDate} 10:00:00`)
			const end = new Date(`${reservationDate} 19:00:00`)

			// await Reservation.create({ name: "test", phone: 123456789, partySize: 3, guestId: 1, reservationTime: new Date(reservationDate + " 10:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 3, guestId: 2, reservationTime: new Date(reservationDate + " 10:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 3, guestId: 3, reservationTime: new Date(reservationDate + " 10:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 2, guestId: 4, reservationTime: new Date(reservationDate + " 12:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 3, guestId: 5, reservationTime: new Date(reservationDate + " 12:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 6, reservationTime: new Date(reservationDate + " 10:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 7, reservationTime: new Date(reservationDate + " 10:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 8, reservationTime: new Date(reservationDate + " 10:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 9, reservationTime: new Date(reservationDate + " 12:00:00") })
			// await Reservation.create({ name: "test", phone: 123456789, partySize: 1, guestId: 10, reservationTime: new Date(reservationDate + " 12:00:00") })

			const allOfDateRelatedData = await Reservation.find({ $and: [{ reservationTime: { $gte: start } }, { reservationTime: { $lte: end } }] })

			while (start <= end) {

				// Total Party Size
				let sumOfCurrentTime = 0
				allOfDateRelatedData.filter((val) => {
					return val.reservationTime.toString() === start.toString()
				}).map((val) => sumOfCurrentTime = sumOfCurrentTime + val.partySize)
				// Total Party Size

				times = [...times,
				{
					title: start.toLocaleString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
						timeZone:
							Intl.DateTimeFormat().resolvedOptions()
								.timeZone,
					}) + (sumOfCurrentTime > maxPartySize - partySize ? " Unavailable" : ""),
					defaultTitle: start.toLocaleString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
						timeZone:
							Intl.DateTimeFormat().resolvedOptions()
								.timeZone,
					}),
					value: start.getTime(),
					// available party size
					partySize: maxPartySize - sumOfCurrentTime,
					disabled: sumOfCurrentTime > maxPartySize - partySize
				}
				]
				start.setMinutes(
					start.getMinutes() + 60
				)
			}

			res.status(200).json({
				times
			})
		}
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})
module.exports = { getTime }