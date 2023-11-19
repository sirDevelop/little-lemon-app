const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const csrf = require('csrf')()
const Token = require('../models/tokenModel')

const loginUser = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body
		if (!email && !password) {
			res.status(400)
			throw new Error('Please fill all fields')
		}
		if (req.cookies.lt) {
			await Token.findOneAndDelete({ lt: req.cookies.lt, active: true })
			res.clearCookie("lt")
		}
		let emailFromFrontEnd = email.toLowerCase()
		const user = await User.findOne({ $or: [{ email: emailFromFrontEnd }] })
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = generateToken(user._id)
			const csrfSecret = await csrf.secret()
			const csrfToken = csrf.create(csrfSecret)
			// await Token.updateMany({ user: user.id }, { active: false })

			await Token.create({ user: user.id, lt: token, cs: csrfSecret })

			res.cookie('lt', token, { path: '/', sameSite: 'Strict', maxAge: 99999999 })

			const { _id, firstname, lastname } = user

			res.status(200).json({
				id: _id,
				firstname,
				lastname,
				email,
				csrf: csrfToken,
				lt: token
			})
		} else {
			res.status(400)
			throw new Error('Invalid user data')
		}
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong' + error.message)
	}
})

const getUser = asyncHandler(async (req, res) => {
	try {
		const { _id, firstname, lastname, email } = await User.findById(req.user.id)
		res.status(200).json({
			id: _id,
			firstname,
			lastname,
			email
		})
	} catch (error) {
		res.status(422)
		throw new Error(`Something went wrong getting the user ${error}`)
	}
})

const logoutUser = asyncHandler(async (req, res) => {
	// unauthorized.... why??
	if (req.cookies.lt) {
		// delete the server side object which stores the cookie for that user from mongoDB once we are logged out
		await Token.findOneAndDelete({ lt: req.cookies.lt, active: true })
		res.clearCookie("lt")
		res.status(200).json({})
	}
})

const registerUser = asyncHandler(async (req, res) => {
	const { firstname, lastname, email, password } = req.body
	if (!firstname && !lastname && !email && !password) {
		res.status(400)
		throw new Error('Please fill all fields')
	}

	let lfname = firstname.toLowerCase(), llname = lastname.toLowerCase(), lemail = email.toLowerCase()

	const userExist = await User.findOne({ $or: [{ email }] })
	if (userExist) {
		res.status(401)
		throw new Error('User already exists')
	}

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	const user = await User.create({ firstname: lfname, lastname: llname, email: lemail, password: hashedPassword })

	const token = generateToken(user._id)
	const csrfSecret = await csrf.secret()
	const csrfToken = csrf.create(csrfSecret)
	// await Token.updateMany({ user: user.id }, { active: false })

	await Token.create({ user: user.id, lt: token, cs: csrfSecret })

	res.cookie('lt', token, { path: '/', sameSite: 'Strict', maxAge: 99999999 })

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			csrf: csrfToken
		})
	} else {
		res.status(402)
		throw new Error('Invalid user data')
	}
})

const editProfile = asyncHandler(async (req, res) => {
	try {
		const { editFormData, changePassword } = req.body
		if (!editFormData.firstName || !editFormData.lastName || !editFormData.email) {
			res.status(400)
			throw new Error('Please fill all fields')
		}
		const { firstName, lastName, email } = editFormData
		let lfname = firstName.toLowerCase(), llname = lastName.toLowerCase(), lemail = email.toLowerCase()

		const userExist = await User.findOne({ $and: [{ email }] })
		if (userExist && req.user.email !== email) {
			res.status(401).json({})
			throw new Error('User already exists')
		}

		let user

		if (editFormData.password && changePassword) {
			const { password } = editFormData
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt)
			user = await User.findOneAndUpdate({ id: req.user._id }, { firstname: lfname, lastname: llname, email: lemail, password: hashedPassword })
		} else {
			user = await User.findOneAndUpdate({ id: req.user._id }, { firstname: lfname, lastname: llname, email: lemail })
		}

		if (user) {
			res.status(201).json({
				_id: user._id,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				token: generateToken(user._id)
			})
		} else {
			res.status(402)
			throw new Error('Invalid user data')
		}
	} catch (error) {
		if(error.message !== "User already exists") {
			res.status(422)
			throw new Error(`Something went wrong ${error}`)
		}
	}
})

// this creates an encrypted token (jwt.sign). Token related to user ID
const generateToken = (id) => {
	return jwt.sign({ id }, 'abc123', {
		expiresIn: '30d'
	})
}

module.exports = { registerUser, loginUser, logoutUser, getUser, editProfile }