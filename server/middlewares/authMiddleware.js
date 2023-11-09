const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const csrf = require('csrf')()
const User = require('../models/userModel')
const Token = require('../models/tokenModel')

const jwtHP = asyncHandler(async (req, res, next) => {
	let token
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
	try {
		token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.verify(token, 'abc123')
		req.user = await User.findById(decoded.id).select('-password')

		next()
	} catch (error) {
		res.status(401)
		throw new Error('Not authorized')
	}
})

const jwtCP = asyncHandler(async (req, res, next) => {
	let token
	if (!req.cookies.lt) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
	try {
		token = req.cookies.lt
		const decoded = jwt.verify(token, 'abc123')
		req.user = await User.findById(decoded.id).select('-password')
		req.csrfSecret = await Token.findOne({ user: req.user.id, active: true, lt: token }).select()
		next()
	} catch (error) {
		res.status(401)
		throw new Error('Not authorized')
	}
})

const csrfP = asyncHandler(async (req, res, next) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
		res.status(401)
		throw new Error('Bad credentials')
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (csrf.verify(req.csrfSecret.cs, token)) {
			next()
		} else {
			res.status(401)
			throw new Error('Bad credentials')
		}
	} catch (error) {
		res.status(401)
		throw new Error(`Something went wrong`)
	}
})

module.exports = { jwtHP, jwtCP, csrfP }