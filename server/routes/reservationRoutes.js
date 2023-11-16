const express = require('express')
const router = express.Router()
const { getTime, createReservation, getPartySizes, getReservationHistory } = require('../controllers/reservationController')
const { jwtCP, csrfP, jwtOrderOnline, csrfOrderOnlineP } = require('../middlewares/authMiddleware')

// localhost:9000/api/reservation/

router.post('/getTime', getTime)
router.post('/getPartySizes', getPartySizes)
router.post('/createReservation', [jwtOrderOnline, csrfOrderOnlineP], createReservation)
router.get('/reservationHistory', [jwtOrderOnline, csrfOrderOnlineP], getReservationHistory)

module.exports = router