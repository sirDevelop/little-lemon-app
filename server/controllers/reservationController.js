const asyncHandler = require('express-async-handler')
const Reservation = require('../models/reservationModel')
const { v4: uuidv4 } = require('uuid');

const createReservation = asyncHandler(async (req, res) => {
	try {
		const { name, phone, partySize, reservationDate, reservationTime } = req.body

		let availablePartySize = 48
		const date = new Date(parseInt(reservationTime, 10));

		const allOfDateRelatedData = await Reservation.find({ reservationTime: date })

		allOfDateRelatedData.map(val => {
			availablePartySize = availablePartySize - val.partySize
		})

		if (availablePartySize) {
			if (req.user)
				await Reservation.create({ name, phone, partySize, customer: req.user._id, reservationTime, reservationNumber: uuidv4() })
			else
				await Reservation.create({ name, phone, partySize, reservationTime, reservationNumber: uuidv4() })

			res.status(200).json({
				message: "Success"
			})
		} else {
			res.status(402).json({
				message: "Not enough available seats"
			})
		}
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})

const getTime = asyncHandler(async (req, res) => {
	try {
		const { reservationDate, partySize } = req.body

		if (reservationDate) {
			let times = []
			const maxPartySize = 48
			const start = new Date(`${reservationDate} 10:00:00`)
			const end = new Date(`${reservationDate} 19:00:00`)

			const allOfDateRelatedData = await Reservation.find({ $and: [{ reservationTime: { $gte: start } }, { reservationTime: { $lte: end } }] })

			let bookedGap = 0

			while (start <= end) {

				// Total Party Size
				let sumOfCurrentTime = 0
				allOfDateRelatedData.filter((val) => {
					return val.reservationTime.toString() === start.toString()
				}).map((val) => sumOfCurrentTime = sumOfCurrentTime + val.partySize)
				// Total Party Size

				times = [...times, {
					title: start.toLocaleString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
						timeZone:
							Intl.DateTimeFormat().resolvedOptions()
								.timeZone,
					}) + (sumOfCurrentTime > maxPartySize - partySize || bookedGap ? " Unavailable" : ""),
					value: start.getTime(),
					// available party size
					partySize: bookedGap ? 0 : maxPartySize - sumOfCurrentTime,
					disabled: bookedGap || sumOfCurrentTime > maxPartySize - partySize
				}]

				if (bookedGap) bookedGap--
				else if (sumOfCurrentTime > maxPartySize - partySize) bookedGap = 2

				start.setMinutes(
					start.getMinutes() + 30
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

const getPartySizes = asyncHandler(async (req, res) => {
	try {
		const { reservationTime } = req.body

		if (reservationTime) {
			let availablePartySize = 48
			const date = new Date(parseInt(reservationTime, 10));

			const allOfDateRelatedData = await Reservation.find({ reservationTime: date })

			allOfDateRelatedData.map(val =>
				availablePartySize = availablePartySize - val.partySize
			)

			res.status(200).json({
				availablePartySize
			})
		}
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})

const getReservationHistory = asyncHandler(async (req, res) => {
	try {
		if (req.user) {
			const reservations = await Reservation.find({ customer: req.user._id })
			res.status(200).json({ reservations })
		} else
			res.status(404).json({})
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong')
	}
})

module.exports = { getTime, createReservation, getPartySizes, getReservationHistory }