const express = require('express')
const router = express.Router()

// localhost:9000/api/users/register

router.get('/get', (req, res) => {
	res.status(200).json({reqBody: req.body})
	console.log(req.body)
})

router.get('/post', (req, res) => {
	res.status(200).json({reqBody: req.body})
	console.log(req.body)
})


module.exports = router