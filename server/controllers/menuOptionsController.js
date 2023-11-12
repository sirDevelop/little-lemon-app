const asyncHandler = require('express-async-handler')
const MenuOptions = require('../models/menuOptionsModel')

const getMenuOptions = asyncHandler(async (req, res) => {
	try {
		const getAllMenuOptions = await MenuOptions.find();
		// console.log("getAllMenuOptions", getAllMenuOptions)
		//online we will display unavailable if not available

		// await MenuOptions.create({title: "Gourmet Grilled Hotdog Extravaganza", imageURL: "./images/hotdog1.jpg", price: "5.99", description: "Indulge in the ultimate hotdog experience with our Gourmet Grilled Hotdog Extravaganza! Crafted with passion and a dash of creativity, our mouthwatering creation promises to tantalize your taste buds. Served with a side of perfectly seasoned fries, our Gourmet Grilled Hotdog Extravaganza is not just a meal—it's a symphony of flavors that will make your taste buds sing!", available: true})
		// await MenuOptions.create({title: "Artisanal Bread Basket Delight", imageURL: "./images/bread1.jpg", price: "2.99", description: "Embark on a journey of flavor with our Artisanal Bread Basket, a selection curated to elevate your dining experience. Baked with passion and precision, each variety is a testament to the craftsmanship of our skilled bakers. Accompanied by a selection of whipped herb butter, extra virgin olive oil, and aged balsamic vinegar, our Artisanal Bread Basket is the perfect prelude to a memorable dining experience—where every bite tells a story of craftsmanship and dedication.", available: true})
		// await MenuOptions.create({title: "Succulent Grilled Catch of the Day", imageURL: "./images/fish.jpg", price: "11.99", description: "Dive into a world of exquisite flavors with our Succulent Grilled Catch of the Day—an unparalleled seafood experience that captures the essence of freshness and expert grilling techniques. Immerse yourself in the seaside symphony of flavors, where the grill meets the ocean, and every bite is a celebration of the sea's bounty. Our Succulent Grilled Catch of the Day is not just a meal—it's a culinary journey you won't soon forget.", available: true})
		// await MenuOptions.create({title: "Truffle Infused Forest Mushroom Linguine", imageURL: "./images/pasta1.jpg", price: "12.99", description: "Embark on a gastronomic journey with our Truffle Infused Forest Mushroom Linguine—a pasta creation that marries the earthy richness of forest mushrooms with the luxurious aroma of truffle, creating a symphony of flavors that will enchant your palate. Indulge in the magic of the woods with each forkful of our Truffle Infused Forest Mushroom Linguine—a pasta symphony that transports you to a world where culinary artistry meets nature's bounty.", available: true})
		// await MenuOptions.create({title: "Mediterranean Harvest Salad Bliss", imageURL: "./images/salad1.jpg", price: "10.99", description: "Immerse yourself in the vibrant flavors of the Mediterranean with our Harvest Salad Bliss—a refreshing and nutrient-packed masterpiece that celebrates the abundance of sun-kissed ingredients. Whether you're a devoted salad enthusiast or seeking a refreshing prelude to your meal, our Mediterranean Harvest Salad Bliss is a delightful journey through the bountiful landscapes of the Mediterranean, served on a plate.", available: true})

		res.status(200).json({
			getAllMenuOptions
		})
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
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})

// const orderOnline = asyncHandler(async (req, res) => {
// 	try {
// 		const { menuid, customerId, name, quantity, phoneNumber } = req.body
//         await OrderOnline.create({menuId, customerId, name, quantity, phoneNumber})

// 		// const getAllMenuOptions = await MenuOptions.findOne({ _id: id })
// 		// console.log("getAllMenuOptions", getAllMenuOptions)
// 		// const title = getAllMenuOptions[0].title
// 		//create orders in mongoDatabase, and write the order there with order schema and etc...
// 		//send email to client

// 		res.status(200).json({
// 		})
// 	} catch (error) {
// 		res.status(422)
// 		throw new Error('Something went wrong' + error)
// 	}
// })

const orderOnline = asyncHandler(async (req, res) => {
	try {
		const { cart, name, phone } = req.body
		await OrderOnline.create({ cart: JSON.stringify(cart), phoneNumber: phone, name })


		// const getAllMenuOptions = await MenuOptions.findOne({ _id: id })
		// console.log("getAllMenuOptions", getAllMenuOptions)
		// const title = getAllMenuOptions[0].title
		//create orders in mongoDatabase, and write the order there with order schema and etc...
		//send email to client

		res.status(200).json({

		})
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})

const getMenuById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.body
		const Menu = await MenuOptions.findOne({ _id: id })
		res.status(200).json({ Menu })
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})


module.exports = { orderOnline, getMenuOptions, getMenuById }