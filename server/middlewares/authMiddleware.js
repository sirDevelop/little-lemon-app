const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const csrf = require('csrf')()
const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const { v4: uuidv4 } = require('uuid');

// const jwtHP = asyncHandler(async (req, res, next) => {
// 	let token
// 	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
// 		res.status(401)
// 		throw new Error('Not authorized, no token')
// 	}
// 	try {
// 		token = req.headers.authorization.split(' ')[1]
// 		const decoded = jwt.verify(token, 'abc123')
// 		req.user = await User.findById(decoded.id).select('-password')

// 		next()
// 	} catch (error) {
// 		res.status(401)
// 		throw new Error('Not authorized')
// 	}
// })

const jwtCP = asyncHandler(async (req, res, next) => {
	let token
	if (!req.cookies.lt) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
	try {
		token = req.cookies.lt

		// this decrypts the token
		const decoded = jwt.verify(token, 'abc123')
		// select everything from the user object except the password
		req.user = await User.findById(decoded.id).select('-password')
		req.csrfSecret = await Token.findOne({ user: req.user.id, active: true, lt: token }).select()
		
		// will continue even after middleware is finished running
		next()
	} catch (error) {
		res.status(401)
		throw new Error('Not authorized')
	}
})

const csrfP = asyncHandler(async (req, res, next) => {
	if (!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')) {
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

const jwtOrderOnline = asyncHandler(async (req, res, next) => {
	let token
	try {
		if (req.cookies.lt) {
			token = req.cookies.lt
			const decoded = jwt.verify(token, 'abc123')
			req.user = await User.findById(decoded.id).select('-password')
			req.csrfSecret = await Token.findOne({ user: req.user.id, active: true, lt: token }).select()
		}
		next()
	} catch (error) {
		res.status(401)
		throw new Error('Not authorized')
	}
})
const csrfOrderOnlineP = asyncHandler(async (req, res, next) => {
	try {
		if (req.user && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			const token = req.headers.authorization.split(' ')[1]
			if (csrf.verify(req.csrfSecret.cs, token)) {
				next()
			} else {
				res.status(401)
				throw new Error('Bad credentials')
			}
		}else{
			next()
		}
	} catch (error) {
		res.status(401)
		throw new Error(`Something went wrong when verifying the token ${error}`)
	}
})

module.exports = { /* jwtHP ,*/ jwtCP, csrfP, jwtOrderOnline, csrfOrderOnlineP }