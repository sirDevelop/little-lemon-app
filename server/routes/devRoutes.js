const express = require('express')
const router = express.Router()
const fs = require('fs');

router.get("/test", (req,res) => {
	res.status(200).json({})
})

router.post('/create', (req, res) => {
	const { name } = req.body
	const routesCode = `const express = require('express')
const router = express.Router()
const { test } = require('../controllers/${name}Controller')
router.get('/test', test)
module.exports = router`
	const modelsCode = `const mongoose = require('mongoose')
const ${name}Schema = mongoose.Schema({
	stringSample: {
		type: String,
		default: 'default value',
		required: [true, 'Please fill the name field'],
	},
	numberSample: {
		type: Number
	}
}, { timestamps: true })
module.exports = mongoose.model('${name.charAt(0).toUpperCase() + name.slice(1)}', ${name}Schema)`
	const controllersCode = `const asyncHandler = require('express-async-handler')
const ${name.charAt(0).toUpperCase() + name.slice(1)} = require('../models/${name}Model')
const test = asyncHandler(async (req, res) => {
	try {
		res.status(200).json({})
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong')
	}
})
module.exports = { test }`
	fs.appendFile(`routes/${name}Routes.js`, routesCode, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
	fs.appendFile(`models/${name}Model.js`, modelsCode, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
	fs.appendFile(`controllers/${name}Controller.js`, controllersCode, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
	res.status(200).json({})
})

module.exports = router