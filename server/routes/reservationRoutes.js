const express = require('express')
const router = express.Router()
const { check } = require('../controllers/reservationController')
const { jwtCP, csrfP } = require('../middlewares/authMiddleware')

// localhost:9000/api/reservation/

router.post('/check', check)
// router.post('/check', check)
// router.post('/reserve', reserve)

module.exports = router