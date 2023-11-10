const express = require('express')
const router = express.Router()
const { getMenuOptions,orderOnline } = require('../controllers/menuOptionsController')
const { jwtCP, csrfP } = require('../middlewares/authMiddleware')

// localhost:9000/api/menuOptions/

router.get('/getMenuOptions', getMenuOptions)
router.post('/orderOnline', orderOnline)
// router.post('/check', check)
// router.post('/reserve', reserve)

module.exports = router