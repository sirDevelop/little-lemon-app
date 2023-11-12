const express = require('express')
const router = express.Router()
const { getTime, createReservation, getPartySizes } = require('../controllers/reservationController')
const { jwtCP, csrfP } = require('../middlewares/authMiddleware')

// localhost:9000/api/reservation/

router.post('/getTime', getTime)
router.post('/getPartySizes', getPartySizes)
router.post('/createReservation', createReservation)
// router.post('/check', check)
// router.post('/reserve', reserve)

module.exports = router