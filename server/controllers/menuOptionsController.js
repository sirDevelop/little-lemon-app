const asyncHandler = require('express-async-handler')
const MenuOptions = require('../models/menuOptionsModel')
const Order = require('../models/orderModel')
const Reservation = require('../models/reservationModel')
const jwt = require('jsonwebtoken')
const csrf = require('csrf')()
const User = require('../models/userModel')
const Token = require('../models/tokenModel')

const getMenuOptions = asyncHandler(async (req, res) => {
	try {
		const getAllMenuOptions = await MenuOptions.find();

		// await MenuOptions.create({title: "Gourmet Grilled Hotdog Extravaganza", imageURL: "./images/hotdog1.jpg", price: "5.99", description: "Indulge in the ultimate hotdog experience with our Gourmet Grilled Hotdog Extravaganza! Crafted with passion and a dash of creativity, our mouthwatering creation promises to tantalize your taste buds. Served with a side of perfectly seasoned fries, our Gourmet Grilled Hotdog Extravaganza is not just a meal—it's a symphony of flavors that will make your taste buds sing!", available: true})
		// await MenuOptions.create({title: "Artisanal Bread Basket Delight", imageURL: "./images/bread1.jpg", price: "2.99", description: "Embark on a journey of flavor with our Artisanal Bread Basket, a selection curated to elevate your dining experience. Baked with passion and precision, each variety is a testament to the craftsmanship of our skilled bakers. Accompanied by a selection of whipped herb butter, extra virgin olive oil, and aged balsamic vinegar, our Artisanal Bread Basket is the perfect prelude to a memorable dining experience—where every bite tells a story of craftsmanship and dedication.", available: true})
		// await MenuOptions.create({title: "Succulent Grilled Catch of the Day", imageURL: "./images/fish.jpg", price: "11.99", description: "Dive into a world of exquisite flavors with our Succulent Grilled Catch of the Day—an unparalleled seafood experience that captures the essence of freshness and expert grilling techniques. Immerse yourself in the seaside symphony of flavors, where the grill meets the ocean, and every bite is a celebration of the sea's bounty. Our Succulent Grilled Catch of the Day is not just a meal—it's a culinary journey you won't soon forget.", available: true})
		// await MenuOptions.create({title: "Truffle Infused Forest Mushroom Linguine", imageURL: "./images/pasta1.jpg", price: "12.99", description: "Embark on a gastronomic journey with our Truffle Infused Forest Mushroom Linguine—a pasta creation that marries the earthy richness of forest mushrooms with the luxurious aroma of truffle, creating a symphony of flavors that will enchant your palate. Indulge in the magic of the woods with each forkful of our Truffle Infused Forest Mushroom Linguine—a pasta symphony that transports you to a world where culinary artistry meets nature's bounty.", available: true})
		// await MenuOptions.create({title: "Mediterranean Harvest Salad Bliss", imageURL: "./images/salad1.jpg", price: "10.99", description: "Immerse yourself in the vibrant flavors of the Mediterranean with our Harvest Salad Bliss—a refreshing and nutrient-packed masterpiece that celebrates the abundance of sun-kissed ingredients. Whether you're a devoted salad enthusiast or seeking a refreshing prelude to your meal, our Mediterranean Harvest Salad Bliss is a delightful journey through the bountiful landscapes of the Mediterranean, served on a plate.", available: true})

		// await MenuOptions.create({title: "Gourmet Bliss Burger", imageURL: "./images/burger.png", price: "10.99", description: "Indulge in the extraordinary with our Gourmet Truffle Bliss Burger, a culinary masterpiece that transcends the ordinary burger experience. This exquisite creation promises an unforgettable journey for your taste buds. Nestled between two lightly toasted, house-made brioche buns, this burger boasts a perfectly grilled chicken patty—a symphony of flavors and tenderness that elevates the dining experience. The patty is seasoned to perfection and seared to a mouthwatering caramelized crust, ensuring every bite is a celebration of premium quality. Atop the succulent patty, a medley of delights awaits. Crisp arugula and vine-ripened tomatoes add freshness and vibrancy, creating a colorful canvas that beckons you to savor each layer. A decadent truffle-infused aioli is generously spread, imparting an earthy richness that elevates the burger to gourmet heights.To add a touch of sophistication, a slice of creamy, melted brie cheese blankets the patty, creating a luscious, velvety texture that harmonizes with the umami notes of the decadent chicken. As you sink your teeth into this culinary symphony, the flavors meld into a crescendo of indulgence—a burger experience like no other.The Gourmet Truffle Bliss Burger isn't just a meal; it's an invitation to savor the extraordinary. Elevate your dining experience and treat yourself to a burger that transcends expectations, leaving a lingering taste of gourmet bliss.", available: true})
		// await MenuOptions.create({title: "Delight Cookie Sandwich", imageURL: "./images/dessert-sandwich.png", price: "3.99", description: "Embark on a journey of sweet euphoria with our Heavenly Hazelnut Delight Cookie Sandwich. This extraordinary creation is a symphony of flavors and textures that will transport your taste buds to dessert paradise. Nestled between two soft, chewy hazelnut-infused cookies, this sandwich is a celebration of decadence. The cookies, baked to perfection, offer a delicate balance of nuttiness and sweetness, providing a satisfying foundation for the indulgence that awaits. At the heart of this delight, a generous layer of velvety Nutella hazelnut spread awaits. Its creamy richness melds seamlessly with the cookies, creating a heavenly fusion of chocolate and hazelnut bliss. Each bite is a sensorial experience that combines the lusciousness of Nutella with the comforting warmth of freshly baked cookies. For an added layer of indulgence, the cookie sandwich is generously sprinkled with finely chopped toasted hazelnuts. These nutty morsels not only provide a delightful crunch but also enhance the overall depth of flavor, adding an extra dimension to this delectable treat. Whether you savor it slowly, letting the flavors linger on your palate, or devour it in blissful abandon, the Heavenly Hazelnut Delight Cookie Sandwich is a testament to the artistry of dessert. Elevate your sweet tooth experience and treat yourself to this symphony of hazelnut-infused perfection—because indulgence should always be this heavenly.", available: true})
		// await MenuOptions.create({title: "Ice Cream Swirl", imageURL: "./images/ice-cream.png", price: "2.99", description: "Dive into the refreshing embrace of our Sun-Kissed Citrus Swirl Delight Cone, a tantalizing fusion of citrusy splendor and creamy indulgence that captures the essence of a summer day in every bite. The star of this frozen fantasy is a velvety soft-serve ice cream, expertly swirled into a crisp, golden cone. Immerse yourself in the vibrant burst of citrus flavor as our artisanal citrus sorbet, crafted from sun-ripened oranges and zesty lemons, dances on your taste buds. As you journey through each lick, the contrasting textures of the smooth, citrus-infused ice cream and the satisfying crunch of the cone create a delightful symphony of sensations. The cone itself is a work of art, freshly baked and dipped in a thin layer of premium white chocolate that forms a delectable shell, preserving the integrity of every bite. For an extra layer of indulgence, our Sun-Kissed Citrus Swirl Delight Cone is crowned with a sprinkle of candied citrus zest, adding a sweet and tangy crunch that elevates this frozen treat to new heights. It's a refreshing escape, a burst of sunshine in every swirl. Savor the joy of summer all year round with this harmonious blend of citrusy zest and creamy delight. The Sun-Kissed Citrus Swirl Delight Cone is not just an ice cream cone; it's a symphony of flavors that transports you to a sun-drenched orchard with every blissful bite.", available: true})
		// await MenuOptions.create({title: "Tropical Paradise Bowl", imageURL: "./images/fruit-bowl.png", price: "4.99", description: "Embark on a journey to paradise with our Tropical Paradise Bowl, a vibrant and refreshing celebration of nature's bounty served in a bowl of pure delight. This colorful masterpiece features a medley of the freshest and juiciest fruits nature has to offer. Succulent mango slices, ripe pineapple chunks, and luscious berries entwine in a tantalizing display, creating a feast for the eyes and a symphony of flavors that dance on your palate. Nestled within this tropical oasis, you'll discover the velvety richness of creamy coconut yogurt, a perfect complement to the sweet and tangy notes of the fruits. Each spoonful is a harmonious blend of textures and tastes, transporting you to a sun-kissed beach where the breeze carries the fragrance of exotic fruits.", available: true})
		// await MenuOptions.create({title: "Fluffy Morning Bliss", imageURL: "./images/pancake1.png", price: "6.99", description: "Introducing our Fluffy Morning Bliss, a delectable stack of pancakes that promises to elevate your breakfast experience to new heights. These golden delights boast a perfect balance of airy fluffiness and a lightly crisp exterior, creating a comforting texture with every bite. Drizzled generously with Grade A maple syrup, the pancakes absorb the sweet, caramelized richness, providing a symphony of flavors. Crowned with a medley of plump, ripe berries, a dusting of powdered sugar, and a dollop of freshly whipped cream, this stack becomes a visual and flavorful masterpiece. Whether enjoyed as a decadent breakfast treat or the centerpiece of a delightful brunch, Fluffy Morning Bliss is a celebration of the simple joy derived from a perfect stack of pancakes, inviting you to savor each delightful forkful.", available: true})

		// await MenuOptions.create({title: "Strawberry Cream Pastry", imageURL: "./images/strawberry-pastry.png", price: "4.99", description: "Indulge in our Strawberry Cream Pastry, a delightful creation that captures the essence of sweet simplicity. This exquisite pastry features layers of flaky, buttery puff pastry enveloping a luscious strawberry compote. The strawberries, bursting with natural sweetness, offer a succulent contrast to the delicate crispness of the pastry. A light dusting of powdered sugar crowns this delectable treat, providing a finishing touch to the symphony of textures and flavors. Whether enjoyed with a morning coffee or as a sweet conclusion to your meal, the Strawberry Cream Pastry is a perfect balance of fruity indulgence and pastry perfection, inviting you to savor every blissful bite.", available: true})
		// await MenuOptions.create({title: "Rosemary Infused Roast Pork", imageURL: "./images/pork.png", price: "11.99", description: "Savor the rich, savory goodness of our Rosemary Infused Roast Pork, a culinary masterpiece that promises to delight the palate. Succulent pork, seasoned to perfection with a blend of aromatic rosemary and savory herbs, is slow-roasted to achieve a perfect balance of tenderness and caramelized exterior. The result is a mouthwatering symphony of flavors, where each slice unveils the herb-infused richness of the pork. Paired with a medley of roasted vegetables and served with a side of velvety garlic mashed potatoes, our Rosemary Infused Roast Pork is a hearty and satisfying dish that brings warmth and comfort to your dining experience, making it an ideal choice for those seeking a deliciously classic and comforting meal.", available: true})
		// await MenuOptions.create({title: "Prime Herb-Crusted Roast Beef", imageURL: "./images/roast-beef.png", price: "12.99", description: "Introducing our Prime Herb-Crusted Roast Beef, a culinary marvel that celebrates the robust flavors of premium beef. Slow-roasted to perfection, our succulent roast beef boasts a herb-infused crust that elevates each slice with aromatic depth. The exterior's tantalizing crunch gives way to a melt-in-your-mouth tenderness within, creating a symphony of textures. Served with a side of rich red wine jus and accompanied by garlic-infused mashed potatoes and sautéed seasonal vegetables, our Prime Herb-Crusted Roast Beef is a savory sensation that promises a sophisticated and hearty dining experience for beef enthusiasts.", available: true})
		// await MenuOptions.create({title: "Grilled Citrus Glaze Salmon", imageURL: "./images/salmon.png", price: "14.99", description: "Savor the ocean's bounty with our Grilled Citrus Glazed Salmon, a culinary masterpiece that brings together the richness of perfectly grilled salmon and the zesty brightness of citrus glaze. Each fillet is expertly seasoned and grilled to perfection, imparting a smoky char that enhances the natural flavors of the fish. The citrus glaze, a symphony of lemon, orange, and a hint of honey, provides a tantalizing balance of sweetness and acidity, elevating the salmon to a delightful gastronomic experience. Accompanied by a medley of seasonal roasted vegetables and a bed of fluffy quinoa, our Grilled Citrus Glazed Salmon is a delectable harmony of textures and tastes, offering a sophisticated and wholesome dining experience for seafood enthusiasts.", available: true})

		// await MenuOptions.create({title: "Strawberry Fields Muffin", imageURL: "./images/strawberry-muffin.png", price: "10.99", description: "Indulge in the sweet embrace of our Strawberry Fields Muffin, a delectable creation that captures the essence of summer in every bite. This moist and tender muffin is generously studded with plump, succulent strawberries, offering bursts of natural sweetness with each mouthful. The delicate crumb texture and buttery undertones provide a perfect canvas for the vibrant strawberry flavor to shine. Topped with a light dusting of powdered sugar, each Strawberry Fields Muffin is a delightful balance of fruity goodness and bakery perfection, making it an irresistible treat for breakfast, brunch, or a delightful anytime snack.", available: true})
		// await MenuOptions.create({title: "Heavenly Tiramisu", imageURL: "./images/tiramisu.png", price: "5.99", description: "Introducing our Heavenly Tiramisu, a classic Italian dessert that embodies the epitome of indulgence. Layers of delicate ladyfingers are meticulously soaked in rich espresso and expertly layered with a velvety mascarpone cream, creating a symphony of textures and flavors. Dustings of premium cocoa powder dance atop the luscious mascarpone, adding a subtle bitterness that beautifully balances the sweetness. Each spoonful unveils a harmonious marriage of coffee-infused richness and the ethereal lightness of mascarpone, making our Heavenly Tiramisu an exquisite finale to any meal or a standalone decadent delight for those seeking a taste of authentic Italian bliss.", available: true})

		res.status(200).json({
			getAllMenuOptions
		})
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong ' + error)
	}
})

const orderOnline = asyncHandler(async (req, res) => {
	try {
		const { cart, name, phone } = req.body

		// similar thing for reservation
		if (req.user)
			await Order.create({ cart: JSON.stringify(cart), phoneNumber: phone, name, customer: req.user._id })
		else
			await Order.create({ cart: JSON.stringify(cart), phoneNumber: phone, name })

		res.status(200).json({ name })
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
const orderHistory = asyncHandler(async (req, res) => {
	try {
		if (req.user) {
			const orders = await Order.find({ customer: req.user._id })
			res.status(200).json({ orders })
		} else
			res.status(404).json({})
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error)
	}
})

module.exports = { orderHistory, orderOnline, getMenuOptions, getMenuById }