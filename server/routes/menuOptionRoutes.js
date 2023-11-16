const express = require('express')
const router = express.Router()
const { getMenuOptions, orderOnline, getMenuById, orderHistory } = require('../controllers/menuOptionsController')
const { jwtCP, csrfP, jwtOrderOnline, csrfOrderOnlineP } = require('../middlewares/authMiddleware')

// localhost:9000/api/menuOptions/

router.get('/getMenuOptions', getMenuOptions)
router.post('/getMenuById', getMenuById)

// runs the middleware first then because of next(), it runs orderOnline
router.post('/orderOnline',[jwtOrderOnline, csrfOrderOnlineP], orderOnline)
router.get('/orderHistory', [jwtOrderOnline, csrfOrderOnlineP], orderHistory)
// router.post('/check', check)
// router.post('/reserve', reserve)

module.exports = router